'use server';

import type { NextRequest } from 'next/server';
import { Buffer } from 'node:buffer';
import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { llmTokenUsage } from '@/db/schema';
import { getUserId } from '@/lib/auth';
import { consumeQuota } from '@/lib/quota';
import { uploadImageBase64AndGetUrl } from '@/lib/r2';
import { rateLimitVisitor } from '@/lib/upstash-rate-limit';
import { ApiResponseHelper } from '@/types/api';

// 说明：图片生成走 OpenAI 兼容接口（如有代理），V1 简化为生成 base64 并上传 R2，返回可访问 URL

export async function POST(request: NextRequest) {
  const limit = await rateLimitVisitor(request, { tokens: 10, window: '1 h' });
  if (limit) {
    return limit;
  }

  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json(ApiResponseHelper.error('errors.auth.unauthorized'), { status: 401 });
  }

  let body: { prompt?: string; size?: '256x256' | '512x512' | '1024x1024' } = {};
  try {
    body = await request.json();
  } catch {}
  if (!body.prompt) {
    return NextResponse.json(ApiResponseHelper.error('errors.ai.invalid_request'), { status: 400 });
  }

  const precheck = await consumeQuota({ userId, checkOnly: true, image: true });
  if (!precheck.success) {
    return NextResponse.json(ApiResponseHelper.error(precheck.error || 'errors.quota.exceeded'), { status: 402 });
  }

  const provider = request.headers.get('x-llm-provider') || 'mock';

  try {
    // 生成 SVG 占位图（演示用途）。如需真实生成，可替换为 images.generate 并回传 base64。
    const size = body.size || '512x512';
    const [w, h] = size.split('x').map(s => Number.parseInt(s || '512', 10));
    const escaped = (body.prompt || 'Hello').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#111827" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">${escaped}</text></svg>`;
    const imageBase64 = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

    const key = `images/${userId}/${Date.now()}.png`;
    const url = await uploadImageBase64AndGetUrl(imageBase64, key);

    try {
      await db.insert(llmTokenUsage).values({
        userId,
        provider,
        model: 'image-gen',
        totalTokens: 0,
        endpoint: 'image',
      });
    } catch (e) {
      console.error('record image usage failed', e);
    }

    const consume = await consumeQuota({ userId, checkOnly: false, image: true });
    if (!consume.success) {
      return NextResponse.json(ApiResponseHelper.error(consume.error || 'errors.quota.consumeFailed'), { status: 500 });
    }

    return NextResponse.json(ApiResponseHelper.success({ url }));
  } catch (error) {
    console.error('ai image error', error);
    return NextResponse.json(ApiResponseHelper.error('errors.ai.provider_error'), { status: 500 });
  }
}
