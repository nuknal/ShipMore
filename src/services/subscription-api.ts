import type { ApiResponse } from '@/types/api';
import type {
  BillingHistoryItem,
  PlanDetails,
  SubscriptionActionResult,
  SubscriptionData,
  SubscriptionPlan,
  UsageData,
} from '@/types/subscription';
import { GetPricing } from '@/lib/pricing';
import { ApiResponseHelper } from '@/types/api';
import { fetchWithAuth } from './auth-fetch';

// 获取订阅信息
export async function getSubscription(): Promise<ApiResponse<SubscriptionData>> {
  try {
    const response = await fetchWithAuth('/api/payment/subscription');
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'errors.services.analysis.parse_error' }));
      return ApiResponseHelper.error(errorData.error || 'errors.services.subscription.get_failed');
    }
    return response.json();
  } catch (error) {
    console.error('get subscription failed:', error);
    return ApiResponseHelper.error(error instanceof Error ? error.message : 'errors.services.subscription.get_failed');
  }
}

// 获取使用情况
export async function getUsage(): Promise<ApiResponse<UsageData>> {
  try {
    const response = await fetchWithAuth('/api/payment/usage');
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'errors.services.analysis.parse_error' }));
      return ApiResponseHelper.error(errorData.error || 'errors.services.subscription.usage_failed');
    }
    return response.json();
  } catch (error) {
    console.error('get usage failed:', error);
    return ApiResponseHelper.error(error instanceof Error ? error.message : 'errors.services.subscription.usage_failed');
  }
}

// 获取账单历史
export async function getBillingHistory(): Promise<ApiResponse<BillingHistoryItem[]>> {
  try {
    const response = await fetchWithAuth('/api/payment/billing-history');
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'errors.services.analysis.parse_error' }));
      return ApiResponseHelper.error(errorData.error || 'errors.services.subscription.billing_history_failed');
    }
    return response.json();
  } catch (error) {
    console.error('get billing history failed:', error);
    return ApiResponseHelper.error(error instanceof Error ? error.message : 'errors.services.subscription.billing_history_failed');
  }
}

// 订阅计划
export async function subscribeToPlan(plan: SubscriptionPlan): Promise<ApiResponse<SubscriptionActionResult>> {
  try {
    const response = await fetchWithAuth('/api/payment/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plan }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'errors.services.analysis.parse_error' }));
      return ApiResponseHelper.error(errorData.error || 'errors.services.subscription.subscribe_failed');
    }

    return response.json();
  } catch (error) {
    console.error('subscribe to plan failed:', error);
    return ApiResponseHelper.error(error instanceof Error ? error.message : 'errors.services.subscription.subscribe_failed');
  }
}

// 取消订阅
export async function cancelSubscription(): Promise<ApiResponse<SubscriptionActionResult>> {
  try {
    const response = await fetchWithAuth('/api/payment/cancel-subscription', {
      method: 'POST',
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'errors.services.analysis.parse_error' }));
      return ApiResponseHelper.error(errorData.error || 'errors.services.subscription.cancel_failed');
    }

    return response.json();
  } catch (error) {
    console.error('cancel subscription failed:', error);
    return ApiResponseHelper.error(error instanceof Error ? error.message : 'errors.services.subscription.cancel_failed');
  }
}

// 恢复订阅
export async function resumeSubscription(): Promise<ApiResponse<SubscriptionActionResult>> {
  try {
    const response = await fetchWithAuth('/api/payment/resume-subscription', {
      method: 'POST',
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'errors.services.analysis.parse_error' }));
      return ApiResponseHelper.error(errorData.error || 'errors.services.subscription.resume_failed');
    }

    return response.json();
  } catch (error) {
    console.error('resume subscription failed:', error);
    return ApiResponseHelper.error(error instanceof Error ? error.message : 'errors.services.subscription.resume_failed');
  }
}

// 获取单个订阅计划详情
export function getPlanDetails(planId: string): ApiResponse<PlanDetails> {
  try {
    const allPlans = GetPricing();
    const details = allPlans.find(plan => plan.id === planId);
    if (!details) {
      return ApiResponseHelper.error('errors.services.subscription.plan_not_found');
    }
    return ApiResponseHelper.success(details);
  } catch (error) {
    console.error('get plan details failed:', error);
    return ApiResponseHelper.error(error instanceof Error ? error.message : 'errors.services.subscription.get_failed');
  }
}
