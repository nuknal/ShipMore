import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { visitorLogs } from '@/db/schema';

// 内部API密钥 - 这个应该从环境变量中读取，或者使用其他安全的方式
// 为了简化演示，这里直接编码一个固定值，但应与visitor-logger.ts中的密钥一致
const INTERNAL_API_KEY = process.env.VISITOR_LOG_API_KEY || 'visitor-log-internal-api-key-vl4k3j2h1g';

export async function POST(request: NextRequest) {
  // 验证API密钥
  const apiKey = request.headers.get('X-API-KEY');
  if (!apiKey || apiKey !== INTERNAL_API_KEY) {
    console.warn('Unauthorized attempt to access visitor log API');
    // 返回403错误，但不透露太多信息
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const data = await request.json();
    const {
      userId,
      visitorId,
      ip,
      userAgent,
      referer,
      path,
      queryParams,
      deviceType,
      browser,
      method,
      os,
    } = data;

    await db.insert(visitorLogs).values({
      userId,
      visitorId,
      ip,
      userAgent,
      referer,
      path,
      queryParams,
      deviceType,
      browser,
      method,
      os,
      visitTime: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log visitor:', error);
    return NextResponse.json({ error: 'Failed to log visitor' }, { status: 500 });
  }
}
