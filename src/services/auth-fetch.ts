'use client';

const AUTH_TOKEN_KEY = 'next-auth-token';
const LOCALE_KEY = 'NEXT_LOCALE';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]?.trim();
    if (cookie && cookie.startsWith(`${name}=`)) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

export function saveAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

export function clearAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export function getStoredToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
}

export async function fetchWithAuth(
  url: RequestInfo | URL,
  options: RequestInit = {},
): Promise<Response> {
  try {
    const token = getStoredToken();
    const headers = new Headers(options.headers || {});

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.warn('未找到认证令牌，请求可能会失败');
    }

    if (typeof window !== 'undefined') {
      const locale = getCookie(LOCALE_KEY) || 'en';
      headers.set('x-locale', locale);

      if (url.toString().includes('/api/landing/')) {
        try {
          const { getVisitorId } = await import('./visitor-id');
          const visitorId = await getVisitorId();
          headers.set('X-Visitor-ID', visitorId);
        } catch (error) {
          console.warn('add visitor ID failed:', error);
        }
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 处理 401 错误，可能是令牌过期或无效
    if (response.status === 401) {
      console.warn('认证失败 (401)，可能需要重新登录');

      // 清除无效的令牌
      clearAuthToken();
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        sessionStorage.setItem('redirectAfterLogin', currentPath);

        // 可以选择性地触发重定向
        // window.location.href = '/sign-in';
      }
    }

    return response;
  } catch (error) {
    console.error('fetch:', error);
    return Response.json({ error: error as string }, { status: 500 });
  }
}
