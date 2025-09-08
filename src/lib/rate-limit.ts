import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// 使用内存存储访客请求记录
// 在生产环境中，应该使用 Redis 或其他持久化存储
const visitorRequests: Record<string, { count: number; resetAt: number }> = {};

// 默认限制：每个访客每小时 10 次请求
const DEFAULT_LIMIT = 3;
const DEFAULT_WINDOW = 60 * 60 * 1000; // 1小时（毫秒）

type RateLimitOptions = {
  limit?: number; // 时间窗口内允许的最大请求数
  windowMs?: number; // 时间窗口大小（毫秒）
};

/**
 * 访客 ID 限流中间件
 * 根据请求头中的 X-Visitor-ID 进行限流
 */
export async function rateLimitVisitor(
  request: NextRequest,
  options: RateLimitOptions = {},
): Promise<NextResponse | null> {
  // 从请求头获取访客 ID
  const visitorId = request.headers.get('X-Visitor-ID');

  // 如果没有访客 ID，跳过限流
  if (!visitorId) {
    console.warn('请求没有访客 ID，跳过限流检查');
    return null;
  }

  const limit = options.limit || DEFAULT_LIMIT;
  const windowMs = options.windowMs || DEFAULT_WINDOW;

  // 获取当前时间
  const now = Date.now();

  // 如果是新访客或重置时间已过，初始化计数器
  if (!visitorRequests[visitorId] || visitorRequests[visitorId].resetAt <= now) {
    visitorRequests[visitorId] = {
      count: 1,
      resetAt: now + windowMs,
    };
    return null; // 允许请求通过
  }

  // 增加计数器
  visitorRequests[visitorId].count += 1;
  // 检查是否超过限制
  if (visitorRequests[visitorId].count > limit) {
    // 计算剩余时间（秒）
    const remainingSeconds = Math.ceil(
      (visitorRequests[visitorId].resetAt - now) / 1000,
    );

    // 返回 429 Too Many Requests 响应
    return NextResponse.json(
      {
        error: '请求过于频繁，请稍后再试',
        retryAfter: remainingSeconds,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(remainingSeconds),
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(visitorRequests[visitorId].resetAt / 1000)),
        },
      },
    );
  }

  // 允许请求通过，但添加限流信息到响应头
  return null;
}

/**
 * 清理过期的访客记录
 * 应该定期调用此函数以防止内存泄漏
 */
export function cleanupExpiredVisitors(): void {
  const now = Date.now();

  Object.keys(visitorRequests).forEach((visitorId) => {
    if (visitorRequests[visitorId]?.resetAt && visitorRequests[visitorId].resetAt <= now) {
      delete visitorRequests[visitorId];
    }
  });
}

// 每小时清理一次过期记录
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredVisitors, 60 * 60 * 1000);
}
