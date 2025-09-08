import camelcaseKeys from 'camelcase-keys';
import { and, desc, eq, gte, sql } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import { billingHistory, checkoutSessions, customers, plans, subscriptions, usageData } from '@/db/schema';
// 处理支付成功事件
export async function handleCheckoutCompleted(session: any) {
  try {
    session = camelcaseKeys(session, { deep: true });
    const checkoutId = session.id;
    const requestId = session.requestId || session.request_id;
    const orderId = session.order?.id;
    const customerId = session.customer?.id;
    const subscriptionId = session.subscription?.id;
    const productId = session.product?.id;
    const metadata = session.metadata || {};
    const userId = metadata.userId;
    const userEmail = metadata.email;
    const userName = metadata.name;

    if (!userId) {
      console.error('failed to get user id from session:', checkoutId);
      return;
    }

    // 更新checkout_sessions表
    await db.update(checkoutSessions).set({
      status: session.status,
      updatedAt: new Date(),
      checkoutId,
      subscriptionId,
      orderId,
      customerId,
      productId,
    }).where(eq(checkoutSessions.requestId, requestId));

    // 更新customers表
    const existingCustomer = await db.select()
      .from(customers)
      .where(eq(customers.customerId, customerId));

    if (existingCustomer.length > 0) {
      await db.update(customers).set({
        customerEmail: userEmail,
        customerName: userName,
        updatedAt: new Date(),
        metadata,
        isActive: true,
      }).where(eq(customers.customerId, customerId));
    } else {
      await db.insert(customers).values({
        userId,
        provider: 'creem',
        customerId,
        customerEmail: userEmail,
        customerName: userName,
        country: session.customer.country,
        metadata,
        isActive: true,
      });
    }
  } catch (error) {
    console.error('failed to handle checkout completed:', error);
  }
}

export async function handleSubscriptionCanceled(subscription: any) {
  subscription = camelcaseKeys(subscription, { deep: true });
  try {
    await db.update(subscriptions)
      .set({
        status: 'canceled',
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.subscriptionId, subscription.id));
  } catch (error) {
    console.error('failed to handle subscription canceled:', error);
  }
}

export async function handleSubscriptionPaid(subscription: any) {
  subscription = camelcaseKeys(subscription, { deep: true });
  try {
    const subscriptionId = subscription.id;
    const productId = subscription.product?.id;
    const metadata = subscription.metadata || {};
    const userId = metadata.userId;

    await db.insert(billingHistory).values({
      userId,
      subscriptionId,
      amount: subscription.product.price,
      currency: subscription.product.currency,
      status: subscription.product.status,
      description: subscription.product.description,
      paymentMethod: subscription.collectionMethod,
      billingType: subscription.product.billingType,
      billingPeriod: subscription.product.billingPeriod,
    });

    let sub;
    // 如果是新的订阅
    const existingSubscription = await db.select()
      .from(subscriptions)
      .where(and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.subscriptionId, subscriptionId),
      ))
      .orderBy(desc(subscriptions.startDate))
      .limit(1);
    if (!existingSubscription || existingSubscription.length === 0) {
      sub = await db.insert(subscriptions).values({
        userId,
        planId: metadata.plan,
        subscriptionId,
        productId,
        status: subscription.status,
        startDate: new Date(),
        endDate: null,
        cancelAtPeriodEnd: false,
        trialEndDate: null,
        provider: 'creem',
        price: subscription.product.price,
        currency: subscription.product.currency,
        interval: '3 months',
      }).returning();
    } else {
      sub = await db.update(subscriptions)
        .set({
          status: subscription.status,
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.subscriptionId, subscription.id))
        .returning();

      if (sub.length === 0) {
        console.error('subscription not found:', subscription.id);
        return;
      }
    }

    await db.update(subscriptions)
      .set({
        status: 'canceled',
        updatedAt: new Date(),
      })
      .where(and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, 'active'),
        eq(subscriptions.planId, 'free'),
      ));

    await db.update(usageData)
      .set({
        currentPeriodEndDate: new Date(),
      })
      .where(and(
        eq(usageData.userId, userId),
        gte(usageData.currentPeriodEndDate, new Date()),
        sql`${usageData.subscriptionId} like 'free_%'`,
      ));

    const plan = await db.select()
      .from(plans)
      .where(eq(plans.productId, subscription.product.id));

    await db.insert(usageData).values({
      userId: sub[0]!.userId,
      subscriptionId: sub[0]!.subscriptionId,
      creditTotal: plan[0]!.credits,
      creditUsed: 0,
      textTotal: 0,
      textUsed: 0,
      imageTotal: 0,
      imageUsed: 0,
      currentPeriodStartDate: new Date(subscription.currentPeriodStartDate),
      currentPeriodEndDate: new Date(subscription.currentPeriodEndDate),
      resetDate: new Date(subscription.currentPeriodEndDate),
    });
  } catch (error) {
    console.error('failed to handle subscription paid:', error);
  }
}

export async function handleSubscriptionExpired(subscription: any) {
  subscription = camelcaseKeys(subscription, { deep: true });
  try {
    await db.update(subscriptions)
      .set({
        status: 'expired',
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.subscriptionId, subscription.id));
  } catch (error) {
    console.error('failed to handle subscription expired:', error);
  }
}
