'use client';

import type {
  BillingHistoryItem,
  SubscriptionData,
  UsageData,
} from '@/types/subscription';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { BillingHistory } from '@/components/subscription/billing-history';
import { PlanSelector } from '@/components/subscription/plan-selector';
import { SubscriptionCard } from '@/components/subscription/subscription-card';
import { EstimatedCost, UsageStats } from '@/components/subscription/usage-stats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/lib/toast';
import {
  getBillingHistory,
  getSubscription,
  getUsage,
} from '@/services/subscription-api';

export default function SubscriptionPage() {
  const t = useTranslations('Subscription');
  const [activeTab, setActiveTab] = useState('subscription');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [billingHistory, setBillingHistory] = useState<BillingHistoryItem[]>([]);

  // 加载数据
  const loadData = async (showRefreshState = false) => {
    if (showRefreshState) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      // 并行请求数据
      const [subscriptionData, usageData, billingHistoryData] = await Promise.all([
        getSubscription(),
        getUsage(),
        getBillingHistory(),
      ]);

      // 检查错误
      if (subscriptionData.error) {
        toast({
          key: subscriptionData.error,
          variant: 'error',
        });
      }

      if (usageData.error) {
        toast({
          key: usageData.error,
          variant: 'error',
        });
      }

      if (billingHistoryData.error) {
        toast({
          key: billingHistoryData.error,
          variant: 'error',
        });
      }

      setSubscription(subscriptionData.data as SubscriptionData);
      setUsageData(usageData.data as UsageData);
      setBillingHistory(billingHistoryData.data as BillingHistoryItem[]);
    } catch (err) {
      toast({
        message: err instanceof Error ? err.message : 'error loading data',
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadData();
  }, []);

  // 处理订阅变更后的刷新
  const handleSubscriptionChange = () => {
    loadData(true);
  };

  // 手动刷新数据
  const handleRefresh = () => {
    loadData(true);
  };

  return (
    <div className="container mx-auto grow px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('manage_subscription')}</h1>
        <Button
          variant="outline"
          disabled={isRefreshing}
          onClick={handleRefresh}
          className="flex items-center gap-2"
        >
          {isRefreshing
            ? (
                <>
                  <svg className="size-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{t('refreshing')}</span>
                </>
              )
            : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  <span>{t('refresh')}</span>
                </>
              )}
        </Button>
      </div>

      {error
        ? (
            <Card className="mb-8 overflow-hidden rounded-xl border border-red-200 bg-white shadow-md dark:border-red-900 dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-12 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('error_loading_data')}</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{error}</p>
                  </div>
                  <Button onClick={handleRefresh}>{t('try_again')}</Button>
                </div>
              </CardContent>
            </Card>
          )
        : (
            <Card className="mb-8 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
              <Tabs defaultValue="subscription" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-gray-100 px-6 pb-2 pt-6 dark:border-gray-700">
                  <TabsList className="mb-4 grid w-full grid-cols-2 rounded-lg bg-gray-50 p-1 dark:bg-gray-700 md:flex md:w-auto md:space-x-1">
                    <TabsTrigger
                      value="subscription"
                      className="rounded-md px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm dark:text-gray-200 dark:data-[state=active]:bg-gray-800"
                    >
                      {t('subscription')}
                    </TabsTrigger>
                    <TabsTrigger
                      value="billing"
                      className="rounded-md px-6 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm dark:text-gray-200 dark:data-[state=active]:bg-gray-800"
                    >
                      {t('billing')}
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="subscription" className="space-y-8 px-6 pb-6">
                  {isLoading
                    ? (
                        <SubscriptionLoadingSkeleton />
                      )
                    : (
                        <>
                          {subscription && (
                            <SubscriptionCard
                              subscriptionData={subscription}
                              onSubscriptionChange={handleSubscriptionChange}
                            />
                          )}

                          {usageData && (
                            <div className="rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                              <UsageStats usageData={usageData} />
                              <div className="px-6 pb-6">
                                <EstimatedCost usageData={usageData} />
                              </div>
                            </div>
                          )}

                          <Separator className="my-8 bg-gray-200 dark:bg-gray-600" />

                          {subscription && (
                            <div>
                              <PlanSelector
                                currentPlan={subscription.plan}
                                onPlanChange={handleSubscriptionChange}
                              />
                            </div>
                          )}
                        </>
                      )}
                </TabsContent>

                <TabsContent value="billing" className="px-6 pb-6">
                  {isLoading
                    ? (
                        <BillingLoadingSkeleton />
                      )
                    : (
                        <div className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
                          <BillingHistory billingHistory={billingHistory} />
                        </div>
                      )}
                </TabsContent>
              </Tabs>
            </Card>
          )}

    </div>
  );
}

function SubscriptionLoadingSkeleton() {
  return (
    <>
      <Card className="mb-8 border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <Skeleton className="mb-2 h-6 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-2 h-2 w-full" />
            <Skeleton className="mt-4 h-4 w-1/2" />
          </CardContent>
        </Card>
        <Card className="border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-2 h-2 w-full" />
            <Skeleton className="mt-4 h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8 bg-gray-200 dark:bg-gray-600" />

      <div className="space-y-6">
        <Skeleton className="mx-auto h-8 w-1/2" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
              <CardHeader>
                <Skeleton className="mx-auto h-6 w-1/2" />
                <Skeleton className="mx-auto mt-2 h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mx-auto mb-6 h-8 w-1/3" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(j => (
                    <div key={j} className="flex items-center gap-3">
                      <Skeleton className="size-5 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

function BillingLoadingSkeleton() {
  return (
    <Card className="border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
