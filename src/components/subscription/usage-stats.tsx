'use client';

import type { UsageData } from '@/types/subscription';
import { useTranslations } from 'next-intl';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type UsageStatsProps = {
  usageData: UsageData;
  isLoading?: boolean;
};

export function UsageStats({ usageData, isLoading = false }: UsageStatsProps) {
  const t = useTranslations('Subscription');

  // 格式化日期
  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return '-1';
    }
    return new Date(dateString).toLocaleDateString('zh', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 获取进度条颜色
  const getProgressColor = (percentage: number): string => {
    if (percentage < 50) {
      return 'bg-primary-400 dark:bg-primary-400';
    }
    if (percentage < 80) {
      return 'bg-primary-600 dark:bg-primary-600';
    }
    return 'bg-primary-800 dark:bg-primary-800';
  };

  // 计算剩余天数
  const getRemainingDays = () => {
    if (!usageData.resetDate) {
      return null;
    }

    const today = new Date();
    const resetDate = new Date(usageData.resetDate);
    const diffTime = resetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const remainingDays = getRemainingDays();

  if (isLoading) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-4 w-40" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('usage_statistics')}</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* 总积分卡片 */}
        <Card className="overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-1"></div>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center">
              <svg className="mr-2 size-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" clipRule="evenodd" />
                <path d="M10 5a1 1 0 011 1v4.5a.5.5 0 00.4.4l2.6.9a1 1 0 11-.6 1.9l-3-1A1 1 0 0110 12V6a1 1 0 011-1z" />
              </svg>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{t('total_credits')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('used', { count: usageData.creditUsed })}
              </span>
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                {t('remaining', { count: usageData.creditRemaining })}
              </span>
            </div>
            <div className="relative mb-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`absolute left-0 top-0 h-full ${getProgressColor(usageData.creditUsagePercentage)}`}
                style={{ width: `${Math.min(usageData.creditUsagePercentage, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {usageData.creditUsed}
              {' '}
              /
              {usageData.creditTotal}
              {' '}
              (
              {Math.round(usageData.creditUsagePercentage)}
              %)
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="mr-1.5 size-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {remainingDays !== null
                ? t('days_until_reset', { count: remainingDays })
                : t('reset_at', { date: formatDate(usageData.resetDate) })}
            </div>
          </CardContent>
        </Card>

        {/* 文本使用卡片 */}
        <Card className="overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-1"></div>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center">
              <svg className="mr-2 size-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{t('text_usage')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('used', { count: usageData.textUsage.used })}
              </span>
            </div>
            <div className="relative mb-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`absolute left-0 top-0 h-full ${getProgressColor(usageData.textUsage.usagePercentage)}`}
                style={{ width: `${Math.min(usageData.textUsage.usagePercentage, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {usageData.textUsage.used}
              {' '}
              (
              {Math.round(usageData.textUsage.usagePercentage)}
              %)
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="mr-1.5 size-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
              </svg>
              {t('text_quote_description')}
            </div>
          </CardContent>
        </Card>

        {/* 图片使用卡片 */}
        <Card className="overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="bg-gradient-to-r from-accent-coral to-primary-600 p-1"></div>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-center">
              <svg className="mr-2 size-5 text-accent-coral" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{t('image_usage')}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('used', { count: usageData.imageUsage.used })}
              </span>
            </div>
            <div className="relative mb-1 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`absolute left-0 top-0 h-full ${getProgressColor(usageData.imageUsage.usagePercentage)}`}
                style={{ width: `${Math.min(usageData.imageUsage.usagePercentage, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {usageData.imageUsage.used}
              {' '}
              (
              {Math.round(usageData.imageUsage.usagePercentage)}
              %)
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="mr-1.5 size-4 text-accent-coral" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              {t('image_quote_description')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 积分消耗规则说明 */}
      <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300">
        <div className="flex items-start">
          <svg className="mr-2 mt-0.5 size-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>{t('credits_consumption_rule')}</p>
        </div>
      </div>
    </div>
  );
}
