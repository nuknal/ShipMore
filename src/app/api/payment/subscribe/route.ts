import type { NextRequest } from 'next/server';
import type { SubscriptionActionResult, SubscriptionPlan } from '@/types/subscription';
import { eq } from 'drizzle-orm';

import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { checkoutSessions, users } from '@/db/schema';
import { getUserId } from '@/lib/auth';
import { creemClient } from '@/lib/creem';
import { ApiResponseHelper } from '@/types/api';
import { getBaseUrl } from '@/utils/Helpers';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  const locale = request.headers.get('x-locale') || 'en';

  if (!userId) {
    return NextResponse.json(
      ApiResponseHelper.error('errors.auth.unauthorized'),
      { status: 401 },
    );
  }

  try {
    const data = await request.json();
    const { plan } = data as { plan: SubscriptionPlan };

    if (!plan || !['free', 'premium', 'ultimate'].includes(plan)) {
      return NextResponse.json(
        ApiResponseHelper.error('errors.payment.invalid_plan'),
        { status: 400 },
      );
    }

    // 如果选择的是免费计划，直接返回成功
    if (plan === 'free') {
      return NextResponse.json(ApiResponseHelper.success({
        success: true,
        message: 'errors.payment.free_plan_success',
      }));
    }

    // 获取用户信息
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!userResult || userResult.length === 0) {
      return NextResponse.json(
        ApiResponseHelper.error('errors.auth.user_not_found'),
        { status: 404 },
      );
    }

    const user = userResult[0]!;

    // 准备结账会话
    const baseUrl = getBaseUrl();
    const successUrl = `${baseUrl}/${locale}/subscription`;

    // 创建唯一的请求ID，用于跟踪此次支付
    const requestId = `req_${userId}_${Date.now()}`;

    // 添加用户元数据，以便在webhook中关联用户
    const metadata = {
      userId,
      email: user.email,
      name: user.name || 'Unknown User',
      plan,
    };

    // 直接创建结账会话，不需要先创建客户
    const session = await creemClient.createCheckoutSession(
      plan,
      successUrl,
      requestId,
      metadata,
      user.email as string,
    );

    // create checkout session in db
    await db.insert(checkoutSessions).values({
      userId,
      requestId,
      checkoutUrl: session.checkoutUrl,
      checkoutId: session.id,
      status: 'pending',
      productId: session.product as string,
    });

    const result: SubscriptionActionResult = {
      success: true,
      message: 'errors.payment.checkout_initiated',
      redirectUrl: session.checkoutUrl, // Creem返回的结账页面URL
    };

    return NextResponse.json(ApiResponseHelper.success(result));
  } catch (error) {
    console.error('订阅处理错误:', error);
    return NextResponse.json(
      ApiResponseHelper.error('errors.payment.subscribe_failed'),
      { status: 500 },
    );
  }
}
