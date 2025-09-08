import type { CheckoutEntity, CustomerEntity, CustomerLinksEntity, SubscriptionEntity } from 'creem/models/components';
import type { SubscriptionPlan } from '@/types/subscription';
import crypto from 'node:crypto';
import axios from 'axios';
import { Creem } from 'creem';

const creem = new Creem({
  // serverIdx: 1, // 0 - production; 1 - test mode
  serverURL: process.env.CREEM_API_ENDPOINT || 'https://api.creem.io',
});

type RedirectParams = {
  request_id?: string | null;
  checkout_id?: string | null;
  order_id?: string | null;
  customer_id?: string | null;
  subscription_id?: string | null;
  product_id?: string | null;
};

// Creem API客户端
class CreemClient {
  private apiKey: string;
  private baseURL: string = process.env.CREEM_API_ENDPOINT || 'https://api.creem.io';
  private productIds: {
    free: string;
    premium: string;
    ultimate: string;
  };

  constructor() {
    // 从环境变量获取API密钥和产品ID
    this.apiKey = process.env.CREEM_API_KEY || '';
    this.productIds = {
      free: process.env.CREEM_FREE_PRODUCT_ID || '',
      premium: process.env.CREEM_PREMIUM_PRODUCT_ID || '',
      ultimate: process.env.CREEM_ULTIMATE_PRODUCT_ID || '',
    };

    if (!this.apiKey) {
      console.error('错误: 未设置CREEM_API_KEY环境变量');
    }
  }

  // 创建API请求头
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    };
  }

  // 获取产品ID
  private getProductId(plan: SubscriptionPlan): string {
    switch (plan) {
      case 'free':
        return this.productIds.free;
      case 'premium':
        return this.productIds.premium;
      case 'ultimate':
        return this.productIds.ultimate;
      default:
        throw new Error(`不支持的订阅计划: ${plan}`);
    }
  }

  // 获取客户信息
  async getCustomer(customerId: string, email: string): Promise<CustomerEntity> {
    const customer = await creem.retrieveCustomer({
      xApiKey: this.apiKey,
      customerId,
      email,
    });
    return customer;
  }

  // 创建结账会话
  async createCheckoutSession(
    plan: SubscriptionPlan,
    successUrl: string,
    requestId?: string,
    metadata?: Record<string, any>,
    email?: string,
  ): Promise<CheckoutEntity> {
    const productId = this.getProductId(plan);

    const checkoutSessionResponse = await creem.createCheckout({
      xApiKey: this.apiKey,
      createCheckoutRequest: {
        productId: productId as string,
        successUrl: successUrl as string,
        // Link checkout to user for tracking and fulfillment
        requestId: requestId as string,
        // Additional metadata for order processing and customer info
        metadata: metadata as Record<string, any>,
        customer: {
          email,
        },
      },
    });

    return checkoutSessionResponse;
  }

  async getCheckoutSession(checkoutId: string): Promise<CheckoutEntity> {
    const checkoutSession = await creem.retrieveCheckout({
      xApiKey: this.apiKey,
      checkoutId,
    });
    return checkoutSession;
  }

  // 获取订阅信息
  async getSubscription(subscriptionId: string): Promise<SubscriptionEntity> {
    const subscription = await creem.retrieveSubscription({
      xApiKey: this.apiKey,
      subscriptionId,
    });
    return subscription;
  }

  // 获取客户的所有订阅
  async getCustomerSubscriptions(customerId: string): Promise<SubscriptionEntity[]> {
    try {
      const response = await axios.get(
        `${this.baseURL}/subscriptions?customer_id=${customerId}`,
        { headers: this.getHeaders() },
      );
      return response.data as SubscriptionEntity[];
    } catch (error) {
      console.error('获取客户订阅失败:', error);
      throw error;
    }
  }

  // 取消订阅
  async cancelSubscription(subscriptionId: string): Promise<SubscriptionEntity> {
    const result = await creem.cancelSubscription({
      xApiKey: this.apiKey,
      id: subscriptionId,
    });
    return result;
  }

  // 更新订阅（更改座位数量）
  async upgradeSubscription(subscriptionId: string, productId: string): Promise<SubscriptionEntity> {
    const result = await creem.upgradeSubscription({
      xApiKey: this.apiKey,
      id: subscriptionId,
      upgradeSubscriptionRequestEntity: {
        productId,
      },
    });
    return result;
  }

  // 获取客户门户链接
  async getCustomerPortalUrl(customerId: string): Promise<CustomerLinksEntity> {
    const result = await creem.generateCustomerLinks({
      xApiKey: this.apiKey,
      createCustomerPortalLinkRequestEntity: {
        customerId,
      },
    });
    return result;
  }

  // 验证重定向签名
  verifyRedirectSignature(params: RedirectParams, signature: string): boolean {
    const data = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .concat(`salt=${this.apiKey}`)
      .join('|');
    const generatedSignature = crypto.createHash('sha256').update(data).digest('hex');
    return generatedSignature === signature;
  }

  // 验证webhook签名
  verifyWebhookSignature(payload: string, signature: string, webhookSecret: string): boolean {
    const computedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');

    return computedSignature === signature;
  }
}

// 导出单例实例
export const creemClient = new CreemClient();
