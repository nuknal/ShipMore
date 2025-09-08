import { desc, eq, sql } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import { subscriptions, usageData } from '@/db/schema';

// TODO: Need to deal with the case that the user has multiple active subscriptions
export async function consumeQuota(
  { userId, checkOnly, text, image }:
  { userId: string; checkOnly: boolean; text?: boolean; image?: boolean },
) {
  let textCost = 0;
  let imageCost = 0;

  if (text) {
    textCost = 1;
  }

  if (image) {
    imageCost = 3;
  }
  try {
    const quota = await db.select().from(usageData).where(eq(usageData.userId, userId)).orderBy(desc(usageData.createdAt)).limit(1);
    if (quota.length === 0) {
      return {
        success: false,
        error: 'errors.quota.notFound',
      };
    }

    if (quota[0]!.currentPeriodEndDate && new Date() > quota[0]!.currentPeriodEndDate) {
      // update free subscription
      return {
        success: false,
        error: 'errors.quota.expired',
      };
    }

    if (quota[0]!.creditUsed + textCost + imageCost > quota[0]!.creditTotal) {
      return {
        success: false,
        error: 'errors.quota.exceeded',
      };
    }

    if (checkOnly) {
      return {
        success: true,
      };
    }

    await db.update(usageData)
      .set({
        creditUsed: sql`${usageData.creditUsed} + ${textCost} + ${imageCost}`,
        textUsed: sql`${usageData.textUsed} + ${textCost}`,
        imageUsed: sql`${usageData.imageUsed} + ${imageCost}`,
        updatedAt: new Date(),
      })
      .where(eq(usageData.id, quota[0]!.id));
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'errors.quota.consumeFailed',
    };
  }

  return {
    success: true,
  };
}

export async function freeSubscription(userId: string, credits?: number) {
  const subscriptionId = `free_${Date.now()}`;

  await db.insert(subscriptions).values({
    userId,
    subscriptionId,
    planId: 'free',
    productId: 'free',
    status: 'active',
    startDate: new Date(),
    price: 0,
    currency: 'USD',
    interval: 'month',
    provider: 'free',
  });

  await db.insert(usageData).values({
    userId,
    subscriptionId,
    creditTotal: credits || 100,
    textUsed: 0,
    imageUsed: 0,
    resetDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    currentPeriodStartDate: new Date(),
    currentPeriodEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  });
}
