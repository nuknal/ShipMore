import type { TurnstileServerValidationResponse } from '@marsidev/react-turnstile';
import { NextResponse } from 'next/server';
import { ApiResponseHelper } from '@/types/api';

const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const secret = process.env.TURNSTILE_SECRET_KEY!;

export async function POST(request: Request) {
  const { token } = (await request.json()) as { token: string };

  const res = await fetch(verifyEndpoint, {
    method: 'POST',
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });

  const data = (await res.json()) as TurnstileServerValidationResponse;

  if (!data.success) {
    return NextResponse.json(
      ApiResponseHelper.error('errors.turnstile.general_error'),
      { status: 400 },
    );
  }

  return NextResponse.json(
    ApiResponseHelper.success(data, 'Turnstile verification successful'),
    { status: 200 },
  );
}
