'use server';

import type { NextRequest } from 'next/server';
import type { BillingHistoryItem } from '@/types/subscription';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { billingHistory } from '@/db/schema';
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
    // 从数据库获取账单历史数据
    const historyItems = await db
      .select()
      .from(billingHistory)
      .where(eq(billingHistory.userId, userId))
      .orderBy(billingHistory.createdAt);

    if (!historyItems || historyItems.length === 0) {
      return NextResponse.json(ApiResponseHelper.success([])); // 返回空数组表示没有历史记录
    }

    // 转换为API响应格式
    const historyResponse: BillingHistoryItem[] = historyItems.map(item => ({
      id: item.id,
      userId,
      amount: Number(item.amount),
      currency: item.currency,
      status: item.status as any, // 数据库中的status字段应与BillingHistoryItem的status类型兼容
      description: item.description,
      paymentMethod: item.paymentMethod,
      createdAt: item.createdAt.toISOString(),
      invoiceUrl: item.invoiceUrl || undefined,
      receiptUrl: item.receiptUrl || undefined,
    }));

    return NextResponse.json(ApiResponseHelper.success(historyResponse));
  } catch (error) {
    console.error('获取账单历史数据错误:', error);
    return NextResponse.json(
      ApiResponseHelper.error('errors.payment.billing_history_failed'),
      { status: 500 },
    );
  }
}
