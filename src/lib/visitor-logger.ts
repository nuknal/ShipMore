import type { NextRequest } from 'next/server';

// 生成简单的随机ID，避免使用crypto
function generateSimpleId(length = 36): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  // 添加时间戳前缀确保唯一性
  const timestamp = Date.now().toString(36);
  result = `${timestamp}-`;

  // 添加随机字符
  const remainingLength = length - result.length;
  for (let i = 0; i < remainingLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

// 内部API密钥 - 这个应该从环境变量中读取，或者使用其他安全的方式
// 为了简化演示，这里直接编码一个固定值
const INTERNAL_API_KEY = process.env.VISITOR_LOG_API_KEY || 'visitor-log-internal-api-key-vl4k3j2h1g';

export async function logVisit(
  request: NextRequest,
  userId?: string | null,
) {
  try {
    const path = request.nextUrl.pathname;
    // 忽略静态资源请求
    if (path.startsWith('/_next/') || path.includes('.')) {
      return;
    }

    // 将查询参数转换为对象
    const queryParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for')
      || request.headers.get('x-real-ip')
      || '';
    const referer = request.headers.get('referer') || '';
    const method = request.method;

    // 提取设备信息 (简单版本，可以后续精细化)
    const deviceType = userAgent.includes('Mobile') ? 'mobile' : 'desktop';
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);

    // 如果没有用户ID，生成访客ID
    let visitorId = request.headers.get('x-visitor-id') || undefined;
    if (!visitorId) {
      visitorId = userId || generateSimpleId();
    }

    // 通过API发送访客数据
    const logApiUrl = new URL('/api/logs/visitor', request.url).toString();

    // 使用fetch API发送请求
    fetch(logApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': INTERNAL_API_KEY,
      },
      body: JSON.stringify({
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
      }),
    }).catch((error) => {
      console.error('Failed to send visitor log data:', error);
    });
  } catch (error) {
    console.error('Failed to log visitor:', error);
  }
}

// 简单的浏览器检测函数
function getBrowser(userAgent: string): string {
  if (userAgent.includes('Chrome')) {
    return 'Chrome';
  }
  if (userAgent.includes('Firefox')) {
    return 'Firefox';
  }
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    return 'Safari';
  }
  if (userAgent.includes('Edge')) {
    return 'Edge';
  }
  if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) {
    return 'IE';
  }
  return 'Other';
}

// 简单的操作系统检测函数
function getOS(userAgent: string): string {
  if (userAgent.includes('Windows')) {
    return 'Windows';
  }
  if (userAgent.includes('Mac OS')) {
    return 'MacOS';
  }
  if (userAgent.includes('Linux')) {
    return 'Linux';
  }
  if (userAgent.includes('Android')) {
    return 'Android';
  }
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    return 'iOS';
  }
  return 'Other';
}
