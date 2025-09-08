import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';
import { creemClient } from '@/lib/creem';
import { handleCheckoutCompleted, handleSubscriptionCanceled, handleSubscriptionExpired, handleSubscriptionPaid } from '@/lib/creem-handler';
import { ApiResponseHelper } from '@/types/api';

export const maxDuration = 60;

// Creem的Webhook处理
export async function POST(request: NextRequest) {
  // 获取请求头中的签名
  const signature = request.headers.get('creem-signature');

  if (!signature) {
    console.error('Missing webhook signature');
    return NextResponse.json(
      ApiResponseHelper.error('errors.payment.missing_signature'),
      { status: 400 },
    );
  }

  try {
    // 获取请求体
    const body = await request.text();
    const webhookSecret = process.env.CREEM_WEBHOOK_SECRET || '';

    // 验证签名
    const isValid = creemClient.verifyWebhookSignature(body, signature, webhookSecret);

    if (!isValid) {
      console.error('Webhook signature verification failed');
      return NextResponse.json(
        ApiResponseHelper.error('errors.payment.signature_invalid'),
        { status: 401 },
      );
    }

    // 解析事件数据
    const event = JSON.parse(body);

    // 根据事件类型处理不同的支付事件
    switch (event.eventType) {
      case 'checkout.completed':
        // 处理支付成功事件
        await handleCheckoutCompleted(event.object);
        break;
      case 'subscription.active':
        console.log('subscription.active', body);
        break;
      case 'subscription.paid':
        console.log('subscription.paid', body);
        await handleSubscriptionPaid(event.object);
        break;
      case 'subscription.canceled':
        await handleSubscriptionCanceled(event.object);
        break;
      case 'subscription.expired':
        await handleSubscriptionExpired(event.object);
        break;
      case 'refund.created':
        break;
      case 'subscription.update':
        break;
      case 'subscription.trialing':
        break;
      default:
        // 忽略其他事件类型
        console.log(`Unprocessed event type: ${event.type}`);
    }

    return NextResponse.json(ApiResponseHelper.success({ received: true }));
  } catch (error) {
    console.error('failed to handle webhook:', error);
    return NextResponse.json(
      ApiResponseHelper.error('errors.payment.webhook.error'),
      { status: 500 },
    );
  }
}
