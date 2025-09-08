'use server';

import type { NextRequest } from 'next/server';
import type { SubscriptionData } from '@/types/subscription';
import { eq } from 'drizzle-orm';

import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { subscriptions } from '@/db/schema';
import { getUserId } from '@/lib/auth';
import { ApiResponseHelper } from '@/types/api';

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json(
      ApiResponseHelper.error('errors.auth.unauthorized'),
      { status: 401 },
    );
  }

  try {
    // 从数据库获取用户的订阅信息
    const userSubscriptions = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(subscriptions.createdAt);

    if (!userSubscriptions || userSubscriptions.length === 0) {
      // 用户没有订阅，返回免费计划
      const freeSubscription: SubscriptionData = {
        id: '',
        userId,
        plan: 'free',
        status: 'active',
        startDate: new Date().toISOString(),
        endDate: null, // 免费计划没有结束日期
        cancelAtPeriodEnd: false,
        trialEndDate: null,
        provider: null,
        price: 0,
        currency: 'CNY',
        interval: 'month',
      };
      return NextResponse.json(ApiResponseHelper.success(freeSubscription));
    }

    // 获取最新的订阅
    const latestSubscription = userSubscriptions[userSubscriptions.length - 1]!;

    // 从数据库转换为API响应格式
    const subscriptionData: SubscriptionData = {
      id: latestSubscription.id.toString(),
      userId,
      plan: latestSubscription.planId as any, // 假设planId存储的是'free', 'premium', 'ultimate'
      status: latestSubscription.status as any,
      startDate: latestSubscription.startDate.toISOString(),
      endDate: latestSubscription.endDate ? latestSubscription.endDate.toISOString() : null,
      cancelAtPeriodEnd: latestSubscription.cancelAtPeriodEnd || false,
      trialEndDate: latestSubscription.trialEndDate ? latestSubscription.trialEndDate.toISOString() : null,
      provider: latestSubscription.provider || null,
      price: Number(latestSubscription.price),
      currency: latestSubscription.currency,
      interval: latestSubscription.interval as any,
    };

    return NextResponse.json(ApiResponseHelper.success(subscriptionData));
  } catch (error) {
    console.error('获取订阅信息错误:', error);
    return NextResponse.json(
      ApiResponseHelper.error('errors.payment.subscription.info'),
      { status: 500 },
    );
  }
}
