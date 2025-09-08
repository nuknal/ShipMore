export type SubscriptionPlan = 'free' | 'premium' | 'ultimate' | 'flex';

export type SubscriptionStatus = 'active' | 'canceled' | 'expired' | 'none';

export type SubscriptionData = {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string; // ISO 日期字符串
  endDate: string | null; // ISO 日期字符串，可能为空（如永久订阅）
  cancelAtPeriodEnd: boolean; // 是否在当前周期结束后取消
  trialEndDate: string | null; // 试用期结束日期
  provider: string | null; // 支付方式
  price: number; // 价格
  currency: string; // 货币
  interval: 'month' | 'year' | 'one-time'; // 订阅周期
};

export type UsageData = {
  userId: string;
  creditTotal: number; // 总积分
  creditUsed: number; // 已使用总积分
  creditRemaining: number; // 剩余总积分
  creditUsagePercentage: number; // 总使用百分比
  textUsage: {
    used: number; // 已使用次数
    usagePercentage: number; // 使用百分比
  };
  imageUsage: {
    used: number; // 已使用次数
    usagePercentage: number; // 使用百分比
  };
  resetDate: string | null; // 下次重置日期，ISO 字符串
};

export type BillingHistoryItem = {
  id: number;
  userId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending' | 'refunded' | 'active';
  description: string;
  paymentMethod: string;
  createdAt: string; // ISO 日期字符串
  invoiceUrl?: string; // 发票下载链接
  receiptUrl?: string; // 收据下载链接
};

export type PlanFeature = {
  feature: string;
  isAvailable: boolean;
};
export type PlanDetails = {
  id: string;
  name: string;
  price: number | string;
  currency: string;
  period: string;
  description: string;
  features: PlanFeature[];
  textQuota: number; // 文本解析配额
  imageQuota: number; // 图片解析配额
  isPopular?: boolean;
  buttonText?: string;
};

export type SubscriptionActionResult = {
  success: boolean;
  message: string;
  redirectUrl?: string; // 支付或确认页面URL
  error?: string;
};

// 添加Customer类型定义
export type Customer = {
  id: number;
  userId: string;
  provider: string;
  customerId: string;
  customerEmail?: string;
  customerName?: string;
  metadata?: Record<string, any>;
  defaultPaymentMethod?: string;
  isActive: boolean;
};

// 添加CustomerResponse类型
export type CustomerResponse =
  | { success: true; data: Customer }
  | { success: false; error: string };

// 添加CustomersResponse类型
export type CustomersResponse =
  | { success: true; data: Customer[] }
  | { success: false; error: string };
