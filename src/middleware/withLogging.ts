import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function withLogging(request: NextRequest) {
  console.debug('withLogging:', request.method, request.url);
  console.debug('withLogging: headers', request.headers);
  console.debug('withLogging: cookies', request.cookies);
  console.debug('withLogging: nextUrl', request.nextUrl);
  return NextResponse.next({
    request,
  });
}
