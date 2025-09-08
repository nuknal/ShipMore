'use client';

import type { SubscriptionData } from '@/types/subscription';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import Portal from '@/components/ui/Portal';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/lib/toast';
import { cancelSubscription, getPlanDetails, resumeSubscription } from '../../services/subscription-api';

// 取消确认对话框
type ConfirmDialogProps = {
  isProcessing: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
};

function ConfirmDialog({ isProcessing, onCancel, onConfirm }: ConfirmDialogProps) {
  const t = useTranslations('Subscription');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
      >
        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{t('confirm_cancel_title')}</h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300">{t('confirm_cancel_description')}</p>
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            {t('cancel')}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={isProcessing}
            className="bg-primary-400 hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-600 dark:hover:bg-primary-800"
          >
            {isProcessing
              ? (
                  <span className="flex items-center">
                    <svg className="mr-2 size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t('processing')}
                  </span>
                )
              : (
                  t('confirm')
                )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

type SubscriptionCardProps = {
  subscriptionData: SubscriptionData;
  onSubscriptionChange: () => void;
  isLoading?: boolean;
};

export function SubscriptionCard({
  subscriptionData,
  onSubscriptionChange,
  isLoading = false,
}: SubscriptionCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const t = useTranslations('Subscription');
  const locale = useLocale();
  // 获取计划详情
  const planDetailsResult = getPlanDetails(subscriptionData.plan);
  // 确定planDetails是有效的计划详情而不是错误对象
  const planDetails = 'error' in planDetailsResult ? null : planDetailsResult.data;

  // 格式化日期
  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return '-';
    }
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 获取订阅状态标签颜色
  const getStatusColor = () => {
    switch (subscriptionData.status) {
      case 'active':
        return 'bg-green-500 text-white';
      case 'canceled':
        return 'bg-amber-500 text-white';
      case 'expired':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // 获取订阅状态文本
  const getStatusText = () => {
    switch (subscriptionData.status) {
      case 'active':
        return t('active');
      case 'canceled':
        return t('canceled');
      case 'expired':
        return t('expired');
      default:
        return t('not_subscribed');
    }
  };

  // 处理取消订阅
  const handleCancelSubscription = async () => {
    try {
      setIsProcessing(true);
      const result = await cancelSubscription();
      if ('success' in result && result.success) {
        toast({
          title: t('subscription_cancelled'),
          message: result.message,
          variant: 'default',
        });
        onSubscriptionChange();
      } else {
        toast({
          title: t('operation_failed'),
          message: 'error' in result ? result.error : t('cancel_subscription_error'),
          variant: 'error',
        });
      }
    } catch {
      toast({
        title: t('operation_failed'),
        message: t('cancel_subscription_error'),
        variant: 'error',
      });
    } finally {
      setIsProcessing(false);
      setIsConfirmOpen(false);
    }
  };

  // 处理恢复订阅
  const handleResumeSubscription = async () => {
    try {
      setIsProcessing(true);
      const result = await resumeSubscription();
      if ('success' in result && result.success) {
        toast({
          title: t('subscription_resumed'),
          message: result.message,
          variant: 'default',
        });
        onSubscriptionChange();
      } else {
        toast({
          title: t('operation_failed'),
          message: 'error' in result ? result.error : t('resume_subscription_error'),
          variant: 'error',
        });
      }
    } catch {
      toast({
        title: t('operation_failed'),
        message: t('resume_subscription_error'),
        variant: 'error',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="mb-8 overflow-hidden border border-gray-100 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="mb-2 h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Skeleton className="mb-2 h-4 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div>
              <Skeleton className="mb-2 h-4 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="col-span-2">
              <Skeleton className="mb-2 h-4 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-32" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <>
      {isConfirmOpen && (
        <Portal>
          <ConfirmDialog
            isProcessing={isProcessing}
            onCancel={() => setIsConfirmOpen(false)}
            onConfirm={handleCancelSubscription}
          />
        </Portal>
      )}
      <Card className="relative mb-4 overflow-hidden rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
        {/* 添加右上角装饰元素 */}
        <div className="absolute right-0 top-0 size-20 overflow-hidden">
          <div className={`absolute right-[-20px] top-[20px] w-[120px] rotate-45 p-1 text-center text-xs font-semibold shadow-md ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>

        <CardHeader className="pb-2 pt-4">
          <div className="flex items-center">
            <div>
              <CardTitle className="mb-1 flex items-center text-xl font-bold text-primary-600 dark:text-primary-400">
                {planDetails?.name || subscriptionData.plan.toUpperCase()}
              </CardTitle>
              <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">
                  {subscriptionData.price / 100}
                  {' '}
                  {subscriptionData.currency}
                </span>
                <span className="mx-1">/</span>
                <span>
                  {subscriptionData.interval === 'month'
                    ? t('monthly')
                    : subscriptionData.interval === 'year'
                      ? t('yearly')
                      : t('3_months')}
                </span>
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-3 shadow-inner dark:bg-gray-800/50">
              <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">{t('start_date')}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatDate(subscriptionData.startDate)}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 shadow-inner dark:bg-gray-800/50">
              <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">{t('end_date')}</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatDate(subscriptionData.endDate)}</p>
            </div>

            {subscriptionData.provider && (
              <div className="col-span-full rounded-lg bg-gray-50 p-3 shadow-inner dark:bg-gray-800/50">
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">{t('payment_method')}</p>
                <p className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-100">
                  <svg className="mr-2 size-5 text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22 10H2M22 12V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40973 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.7157 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.7157 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19H18.8C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V12ZM7 15H7.01M11 15H13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {subscriptionData.provider}
                </p>
              </div>
            )}

            {subscriptionData.status === 'canceled' && subscriptionData.endDate && (
              <div className="col-span-full mt-3 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4 dark:border-amber-600 dark:bg-amber-900/20">
                <div className="flex items-start">
                  <svg className="mr-3 size-5 shrink-0 text-amber-600 dark:text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-amber-800 dark:text-amber-400">
                    {t('subscription_canceled_message', {
                      date: formatDate(subscriptionData.endDate),
                      plan: planDetails?.name || subscriptionData.plan,
                      price: subscriptionData.price / 100,
                      currency: subscriptionData.currency,
                      interval: subscriptionData.interval === 'month' ? t('monthly') : t('yearly'),
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        {(subscriptionData.status === 'active' || subscriptionData.status === 'canceled') && (
          <CardFooter className="border-t border-gray-200 bg-gray-50 py-4 dark:border-gray-700 dark:bg-gray-800/80">
            {subscriptionData.status === 'active'
              ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsConfirmOpen(true)}
                    disabled={isProcessing}
                    className="group flex w-full items-center justify-center border-gray-300 text-sm font-medium transition-all duration-200 ease-in-out hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:hover:border-red-900 dark:hover:bg-red-900/20 dark:hover:text-red-400 sm:w-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 size-4 text-gray-400 transition-colors group-hover:text-red-500 dark:text-gray-400 dark:group-hover:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {isProcessing ? t('processing') : t('cancel_subscription')}
                  </Button>
                )
              : subscriptionData.status === 'canceled'
                ? (
                    <Button
                      size="sm"
                      onClick={handleResumeSubscription}
                      disabled={isProcessing}
                      className="group flex w-full items-center justify-center bg-primary-500 text-sm font-medium shadow-md transition-all duration-200 ease-in-out hover:bg-primary-600 hover:shadow-lg dark:bg-primary-600 dark:hover:bg-primary-700 sm:w-auto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 size-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      {isProcessing
                        ? (
                            <span className="flex items-center">
                              <svg className="mr-2 size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              {t('processing')}
                            </span>
                          )
                        : (
                            t('resume_subscription')
                          )}
                    </Button>
                  )
                : null}
          </CardFooter>
        )}
      </Card>
    </>
  );
}
