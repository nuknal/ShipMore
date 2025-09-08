'use server';

import type { NextRequest } from 'next/server';
import type { SubscriptionActionResult } from '@/types/subscription';
import { and, desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { subscriptions, usageData } from '@/db/schema';
import { getUserId } from '@/lib/auth';
import { creemClient } from '@/lib/creem';
import { freeSubscription } from '@/lib/quota';
import { ApiResponseHelper } from '@/types/api';

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);

  if (!userId) {
    return NextResponse.json(
      ApiResponseHelper.error('errors.auth.unauthorized'),
      { status: 401 },
    );
  }

  try {
    // 获取用户当前的订阅信息
    const userSubscriptions = await db
      .select()
      .from(subscriptions)
      .where(and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, 'active'),
      ))
      .orderBy(desc(subscriptions.createdAt));

    if (!userSubscriptions || userSubscriptions.length === 0) {
      return NextResponse.json(
        ApiResponseHelper.error('errors.payment.subscription_not_found'),
        { status: 404 },
      );
    }

    // 调用Creem API取消订阅
    const response = await creemClient.cancelSubscription(userSubscriptions[0]!.subscriptionId);
    if (response.status === 'canceled') {
      const curUsage = await db.select().from(usageData).where(eq(usageData.userId, userId)).orderBy(desc(usageData.createdAt)).limit(1);
      await freeSubscription(userId, curUsage[0]!.creditTotal - curUsage[0]!.creditUsed + 100);
    }

    const result: SubscriptionActionResult = {
      success: true,
      message: 'errors.payment.cancel_success',
    };

    return NextResponse.json(ApiResponseHelper.success(result));
  } catch (error) {
    console.error('取消订阅处理错误:', error);
    return NextResponse.json(
      ApiResponseHelper.error('errors.payment.cancel_failed'),
      { status: 500 },
    );
  }
}
