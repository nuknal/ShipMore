import type { NextFetchEvent, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import supportedLangs from './i18n/lang';
import { routing } from './i18n/routing';
import { logVisit } from './lib/visitor-logger';

// 从routing配置中获取默认locale
const { defaultLocale } = routing;
const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  return [
    '/user-profile',
    '/subscription',
    '/settings',
  ].some((prefix) => {
    return path === prefix
      || path.startsWith(`${prefix}/`)
      || path.startsWith(`/${routing.locales.join('|')}${prefix}`)
      || new RegExp(`^/(${routing.locales.join('|')})${prefix}(/.*)?$`).test(path);
  });
};

const isAuthPage = (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  return [
    '/sign-in',
    '/sign-up',
  ].some((prefix) => {
    return path === prefix
      || path.startsWith(`${prefix}/`)
      || path.startsWith(`/${routing.locales.join('|')}${prefix}`)
      || new RegExp(`^/(${routing.locales.join('|')})${prefix}(/.*)?$`).test(path);
  });
};

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

export default async function middleware(
  request: NextRequest,
  _event: NextFetchEvent,
) {
  const pathname = request.nextUrl.pathname;

  // 允许访客记录API路由直接通过
  if (pathname === '/api/logs/visitor') {
    return NextResponse.next();
  }

  // 获取用户信息（用于记录访客日志）
  const token = await getToken({ req: request }).catch(() => null);
  const userId = token?.id as string | undefined;

  // 异步记录访客信息
  logVisit(request, userId).catch((error) => {
    console.error('Failed to log visitor:', error);
  });

  // 允许直接访问 sitemap.xml 和 robots.txt，不经过i18n中间件处理
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
    return NextResponse.next();
  }

  // 对 API 路由的请求直接处理，不经过 intlMiddleware
  if (pathname.startsWith('/api/')) {
    if (pathname.startsWith('/api/auth/')
      || pathname.startsWith('/api/payment/webhook')
      || pathname.startsWith('/api/verify/turnstile')) {
      return NextResponse.next();
    }

    if (pathname.startsWith('/api/landing/')) {
      return NextResponse.next();
    }

    try {
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // 将 token 信息传递给 API 路由
      const response = NextResponse.next();

      if (token.email) {
        response.headers.set('x-user-id', token.id as string);
      }

      // 传递用户邮箱
      if (token.email) {
        response.headers.set('x-user-email', token.email as string);
      }

      // 传递用户名
      if (token.name) {
        response.headers.set('x-user-name', token.name as string);
      }

      // 传递 sub (用户唯一标识)
      if (token.sub) {
        response.headers.set('x-user-sub', token.sub);
      }

      return response;
    } catch (error) {
      console.error('Failed to protect API route:', error);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // 如果是认证页面，直接使用 intlMiddleware
  if (isAuthPage(request)) {
    return intlMiddleware(request);
  }

  // 如果是需要保护的路由，使用 withAuth 中间件
  if (isProtectedRoute(request)) {
    // 从请求URL路径中提取locale，如果没有则使用默认值
    const pathParts = request.nextUrl.pathname.split('/');

    // 直接检查是否是支持的locale
    let locale: string = defaultLocale;
    if (pathParts.length > 1) {
      const pathLocale = pathParts[1];
      if (pathLocale && supportedLangs.includes(pathLocale)) {
        locale = pathLocale;
      }
    }

    const signInUrl = new URL(`/${locale}/sign-in`, request.url);

    try {
      // 验证 JWT token
      const token = await getToken({ req: request });
      if (!token) {
        return NextResponse.redirect(signInUrl);
      }
      return intlMiddleware(request);
    } catch (error) {
      console.error('Failed to protect route:', error);
      return NextResponse.redirect(signInUrl);
    }
  }

  return intlMiddleware(request);
}
