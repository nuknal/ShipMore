'use server';

import type { NextRequest } from 'next/server';
import type { ChatRequest } from '@/llm';
import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { llmTokenUsage } from '@/db/schema';
import { getUserId } from '@/lib/auth';
import { consumeQuota } from '@/lib/quota';
import { rateLimitVisitor } from '@/lib/upstash-rate-limit';
import { chat as llmChat } from '@/llm';
import { ApiResponseHelper } from '@/types/api';

export async function POST(request: NextRequest) {
  // 限流（基于 X-Visitor-ID）
  const limit = await rateLimitVisitor(request, { tokens: 20, window: '1 h' });
  if (limit) {
    return limit;
  }

  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json(ApiResponseHelper.error('errors.auth.unauthorized'), { status: 401 });
  }

  let body: ChatRequest;
  try {
    body = await request.json();
    if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(ApiResponseHelper.error('errors.ai.invalid_request'), { status: 400 });
    }
  } catch (error) {
    console.error('ai chat error', error);
    return NextResponse.json(ApiResponseHelper.error('errors.ai.invalid_request'), { status: 400 });
  }

  // 配额预检（按调用：text=1）
  const precheck = await consumeQuota({ userId, checkOnly: true, text: true });
  if (!precheck.success) {
    return NextResponse.json(ApiResponseHelper.error(precheck.error || 'errors.quota.exceeded'), { status: 402 });
  }

  const provider = request.headers.get('x-llm-provider') || undefined;
  const apiKey = request.headers.get('x-llm-api-key') || undefined;
  const baseURL = request.headers.get('x-llm-base-url') || undefined;

  try {
    const result = await llmChat(body, { provider: provider as any, apiKey, baseURL });

    // 记录用量（粗粒度）
    try {
      await db.insert(llmTokenUsage).values({
        userId,
        provider: result.provider || provider || 'openai',
        model: result.model,
        promptTokens: result.usage?.promptTokens || 0,
        completionTokens: result.usage?.completionTokens || 0,
        totalTokens: result.usage?.totalTokens || 0,
        duration: result.usage?.durationMs ? Math.floor(result.usage.durationMs) : 0,
        endpoint: 'chat',
      });
    } catch (e) {
      console.error('record llm usage failed', e);
    }

    // 扣减配额
    const consume = await consumeQuota({ userId, checkOnly: false, text: true });
    if (!consume.success) {
      return NextResponse.json(ApiResponseHelper.error(consume.error || 'errors.quota.consumeFailed'), { status: 500 });
    }

    return NextResponse.json(ApiResponseHelper.success({ content: result.content, model: result.model, usage: result.usage }));
  } catch (error) {
    console.error('ai chat error', error);
    return NextResponse.json(ApiResponseHelper.error('errors.ai.provider_error'), { status: 500 });
  }
}
