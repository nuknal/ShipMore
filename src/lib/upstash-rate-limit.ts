import type { Duration } from '@upstash/ratelimit';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

type RateLimitOptions = {
  tokens?: number;
  window?: string;
};

export async function rateLimitVisitor(
  request: NextRequest,
  options: RateLimitOptions = {},
): Promise<NextResponse | null> {
  const tokens = options.tokens || 5;
  const window = (options.window || '1 d') as Duration;
  const ratelimit = new Ratelimit({
    redis: new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    }),
    limiter: Ratelimit.slidingWindow(tokens, window),
    analytics: true,
    prefix: 'knowone-landing-know-ratelimit',
  });

  // 从请求头获取访客 ID
  const visitorId = request.headers.get('X-Visitor-ID');

  // 如果没有访客 ID，跳过限流
  if (!visitorId) {
    console.warn('No visitor ID found, skipping rate limit check');
    return null;
  }

  const { success, reset, limit } = await ratelimit.limit(visitorId);
  if (!success) {
    const now = Date.now();
    const remainingSeconds = (reset - now) / 1000;
    // 返回 429 Too Many Requests 响应
    return NextResponse.json(
      {
        error: 'errors.landing.rate_limit_exceeded',
        retryAfter: reset,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(remainingSeconds),
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(reset / 1000)),
        },
      },
    );
  }

  return null;
}
