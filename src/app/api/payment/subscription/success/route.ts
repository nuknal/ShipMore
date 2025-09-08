'use server';

import type { NextRequest } from 'next/server';

import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { subscriptions } from '@/db/schema';
import { creemClient } from '@/lib/creem';
import { handleCheckoutCompleted } from '@/lib/creem-handler';
import { ApiResponseHelper } from '@/types/api';

export async function GET(request: NextRequest) {
  // 从URL参数中获取request_id和其他参数
  const searchParams = request.nextUrl.searchParams;
  const requestId = searchParams.get('request_id');
  const checkoutId = searchParams.get('checkout_id');
  const orderId = searchParams.get('order_id');
  const customerId = searchParams.get('customer_id');
  const subscriptionId = searchParams.get('subscription_id');
  const productId = searchParams.get('product_id');
  const signature = searchParams.get('signature');

  if (!requestId || !signature) {
    return NextResponse.json(
      ApiResponseHelper.error('errors.payment.missing_params'),
      { status: 400 },
    );
  }

  // 验证请求有效性
  const params = {
    request_id: requestId,
    checkout_id: checkoutId,
    order_id: orderId,
    customer_id: customerId,
    subscription_id: subscriptionId,
    product_id: productId,
  };

  const isValid = creemClient.verifyRedirectSignature(params, signature);
  if (!isValid) {
    return NextResponse.json(
      ApiResponseHelper.error('errors.payment.signature_invalid'),
      { status: 401 },
    );
  }

  const session = await creemClient.getCheckoutSession(checkoutId as string);
  if (!session.subscription || typeof session.subscription === 'string' || !('id' in session.subscription)) {
    return NextResponse.json(
      ApiResponseHelper.error('errors.payment.subscription_missing'),
      { status: 400 },
    );
  }

  const existingSubscription = await db.select()
    .from(subscriptions)
    .where(eq(subscriptions.subscriptionId, session.subscription.id as string));

  if (!existingSubscription || existingSubscription.length === 0) {
    await handleCheckoutCompleted(session);
  }

  return NextResponse.json(ApiResponseHelper.success({
    message: 'errors.payment.checkout_success',
  }));
}
