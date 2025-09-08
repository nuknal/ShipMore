'use server';

import type { NextRequest } from 'next/server';
import type { UsageData } from '@/types/subscription';
import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { usageData } from '@/db/schema';
import { getUserId } from '@/lib/auth';
import { ApiResponseHelper } from '@/types/api';

// 从数据库获取用户的使用情况数据
export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json(
      ApiResponseHelper.error('errors.auth.unauthorized'),
      { status: 401 },
    );
  }

  try {
    // 从数据库获取用户的使用情况
    const userUsage = await db
      .select()
      .from(usageData)
      .where(eq(usageData.userId, userId))
      .orderBy(desc(usageData.resetDate))
      .limit(1);

    if (!userUsage || userUsage.length === 0) {
      return NextResponse.json(
        ApiResponseHelper.error('errors.payment.usage_not_found'),
        { status: 404 },
      );
    }

    // 获取最新的使用记录
    const latestUsage = userUsage[userUsage.length - 1]!;

    // 计算使用百分比
    const total = (latestUsage.creditTotal ?? 1000);
    const textUsagePercentage = Math.round((latestUsage.textUsed / total) * 100);
    const imageUsagePercentage = Math.round((latestUsage.imageUsed / total) * 100);
    const creditUsagePercentage = Math.round((latestUsage.creditUsed / total) * 100);

    // 构建响应数据
    const usageResponse: UsageData = {
      userId,
      creditTotal: latestUsage.creditTotal,
      creditUsed: latestUsage.creditUsed,
      creditRemaining: latestUsage.creditTotal - latestUsage.creditUsed,
      creditUsagePercentage,
      textUsage: {
        used: latestUsage.textUsed,
        usagePercentage: textUsagePercentage,
      },
      imageUsage: {
        used: latestUsage.imageUsed,
        usagePercentage: imageUsagePercentage,
      },
      resetDate: latestUsage.resetDate ? latestUsage.resetDate.toISOString() : null,
    };

    return NextResponse.json(ApiResponseHelper.success(usageResponse));
  } catch (error) {
    console.error('获取使用情况数据错误:', error);
    return NextResponse.json(
      ApiResponseHelper.error('errors.payment.usage_failed'),
      { status: 500 },
    );
  }
}
