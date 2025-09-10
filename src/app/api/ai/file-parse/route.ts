'use server';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { llmTokenUsage } from '@/db/schema';
import { getUserId } from '@/lib/auth';
import { consumeQuota } from '@/lib/quota';
import { getSignedUrlForDownload } from '@/lib/r2';
import { rateLimitVisitor } from '@/lib/upstash-rate-limit';
import { chat as llmChat } from '@/llm';
import { ApiResponseHelper } from '@/types/api';

export async function POST(request: NextRequest) {
  const limit = await rateLimitVisitor(request, { tokens: 20, window: '1 h' });
  if (limit) {
    return limit;
  }

  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json(ApiResponseHelper.error('errors.auth.unauthorized'), { status: 401 });
  }

  let body: { fileKey?: string; task?: 'summarize' | 'extract_text'; model?: string } = {};
  try {
    body = await request.json();
  } catch {}
  if (!body.fileKey) {
    return NextResponse.json(ApiResponseHelper.error('errors.ai.invalid_request'), { status: 400 });
  }

  const precheck = await consumeQuota({ userId, checkOnly: true, text: true });
  if (!precheck.success) {
    return NextResponse.json(ApiResponseHelper.error(precheck.error || 'errors.quota.exceeded'), { status: 402 });
  }

  try {
    const signedUrl = await getSignedUrlForDownload(body.fileKey);
    const res = await fetch(signedUrl);
    if (!res.ok) {
      return NextResponse.json(ApiResponseHelper.error('errors.files.download_failed'), { status: 400 });
    }
    const raw = await res.text();
    const text = raw.slice(0, 12000); // 简单截断，避免超长

    if ((body.task || 'summarize') === 'extract_text') {
      const consume = await consumeQuota({ userId, checkOnly: false, text: true });
      if (!consume.success) {
        return NextResponse.json(ApiResponseHelper.error(consume.error || 'errors.quota.consumeFailed'), { status: 500 });
      }
      return NextResponse.json(ApiResponseHelper.success({ text }));
    }

    const provider = request.headers.get('x-llm-provider') || undefined;
    const apiKey = request.headers.get('x-llm-api-key') || undefined;
    const baseURL = request.headers.get('x-llm-base-url') || undefined;

    const result = await llmChat({
      model: body.model,
      messages: [
        { role: 'system', content: 'You are a concise assistant. Summarize key points in bullet points.' },
        { role: 'user', content: `Summarize the following content:\n\n${text}` },
      ],
    }, {
      provider: provider as any,
      apiKey,
      baseURL,
    });

    try {
      await db.insert(llmTokenUsage).values({
        userId,
        provider: result.provider || provider || 'openai',
        model: result.model,
        promptTokens: result.usage?.promptTokens || 0,
        completionTokens: result.usage?.completionTokens || 0,
        totalTokens: result.usage?.totalTokens || 0,
        duration: result.usage?.durationMs ? Math.floor(result.usage.durationMs) : 0,
        endpoint: 'file-parse',
      });
    } catch (e) {
      console.error('record llm usage failed', e);
    }

    const consume = await consumeQuota({ userId, checkOnly: false, text: true });
    if (!consume.success) {
      return NextResponse.json(ApiResponseHelper.error(consume.error || 'errors.quota.consumeFailed'), { status: 500 });
    }

    return NextResponse.json(ApiResponseHelper.success({ summary: result.content, usage: result.usage }));
  } catch (error) {
    console.error('file-parse error', error);
    return NextResponse.json(ApiResponseHelper.error('errors.ai.provider_error'), { status: 500 });
  }
}
