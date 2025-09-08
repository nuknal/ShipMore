'use client';

import type { PlanDetails, SubscriptionPlan } from '@/types/subscription';
import { useTranslations } from 'next-intl';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { GetPricing } from '@/lib/pricing';
import { toast } from '@/lib/toast';

import { subscribeToPlan } from '../../services/subscription-api';

type PlanSelectorProps = {
  currentPlan: SubscriptionPlan;
  onPlanChange: () => void;
};

export function PlanSelector({ currentPlan, onPlanChange }: PlanSelectorProps) {
  const t = useTranslations('Subscription');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const plans: PlanDetails[] = GetPricing();

  // 处理计划更改
  const handlePlanChange = async (plan: SubscriptionPlan) => {
    if (plan === currentPlan) {
      toast({
        title: t('current_plan'),
        message: t('already_subscribed'),
        variant: 'default',
      });
      return;
    }

    try {
      setIsProcessing(true);
      setSelectedPlan(plan);

      // 根据当前是否有订阅决定调用哪个API
      const result = await subscribeToPlan(plan);

      if (!result.error) {
        if (result.data && result.data.redirectUrl) {
          window.location.href = result.data.redirectUrl;
          return;
        }

        onPlanChange();
      } else {
        toast({
          key: result.error,
          variant: 'error',
        });
      }
    } catch (error) {
      toast({
        title: t('failed'),
        message: 'error updating subscription plan',
        variant: 'error',
      });
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="mb-8">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-center text-2xl font-bold sm:text-left">{t('select_plan_description')}</h2>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map(plan => (
          <Card
            key={plan.id}
            className={`group overflow-hidden rounded-xl border-2 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800${
              plan.id === currentPlan
                ? ' scale-105 border-primary-500 dark:border-primary-400'
                : ' border-gray-200 hover:-translate-y-1 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
          >
            {plan.isPopular && (
              <div className="bg-primary-500 px-4 py-1.5 text-center text-sm font-medium tracking-wider text-white">
                {t('most_popular')}
              </div>
            )}
            <CardHeader className="pb-2 pt-6">
              <CardTitle className="text-center text-xl font-bold">{plan.name}</CardTitle>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-6 text-center">
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {typeof plan.price === 'number' ? `¥${plan.price}` : plan.price}
                </span>
                {plan.period && (
                  <span className="ml-1 text-sm text-gray-500">{plan.period}</span>
                )}
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <div className={`mr-3 flex size-5 shrink-0 items-center justify-center rounded-full ${
                      feature.isAvailable
                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                    >
                      {feature.isAvailable
                        ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )
                        : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                    </div>
                    <span className={`${feature.isAvailable ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                      {feature.feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pb-6">
              <Button
                variant={plan.id === currentPlan ? 'outline' : 'default'}
                className={`w-full rounded-lg py-2.5 font-medium transition-all ${
                  plan.id === currentPlan
                    ? 'border-2 border-primary-500 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                    : 'bg-primary-500 text-white shadow-md hover:bg-primary-600 hover:shadow-lg dark:bg-primary-600 dark:hover:bg-primary-700'
                }`}
                onClick={() => handlePlanChange(plan.id as SubscriptionPlan)}
                disabled={isProcessing || plan.id === currentPlan}
              >
                {isProcessing && selectedPlan === plan.id
                  ? (
                      <span className="flex items-center">
                        <svg className="mr-2 size-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('processing')}
                      </span>
                    )
                  : plan.id === currentPlan
                    ? t('current_plan')
                    : t('select_plan')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="link" className="mt-4 text-xs text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
              {t('learn_more_pricing')}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-xs">{t('pricing_tooltip')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
