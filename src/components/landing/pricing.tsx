import type { PlanDetails } from '@/types/subscription';
import { useTranslations } from 'next-intl';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { GetPricing } from '@/lib/pricing';

import { Section } from './section';
import { SectionHeading } from './section-heading';

export function Pricing() {
  const t = useTranslations('Landing.Pricing');

  const plans: PlanDetails[] = GetPricing();

  return (
    <Section id="pricing" background="white">
      <SectionHeading
        badge={t('badge')}
        title={t('title')}
        description={t('description')}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`plan-card overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800 dark:shadow-gray-900/30 ${
              plan.isPopular ? 'border-2 border-primary-500 dark:border-primary-600' : 'border border-gray-200 dark:border-gray-700'
            }`}
          >
            {plan.isPopular && (
              <div className="bg-primary-500 px-4 py-1 text-center text-sm font-medium text-white dark:bg-primary-600">
                {t('popularTag')}
              </div>
            )}
            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold dark:text-white">{plan.name}</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">{plan.price}</span>
                {plan.period && (
                  <span className="ml-2 text-gray-500 dark:text-gray-400">{plan.period}</span>
                )}
              </div>
              <ul className="mb-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
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
                    <span className="text-gray-600 dark:text-gray-300">{feature.feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.isPopular ? 'default' : 'outline'}
                className={`w-full ${
                  plan.isPopular
                    ? 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600'
                    : 'border-primary-500 text-primary-700 dark:border-primary-600 dark:text-primary-400 dark:hover:bg-gray-700'
                }`}
                asChild
              >
                <Link href="/sign-in">{plan.buttonText}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          {t('credits_consumption_rule')}
        </p>
      </div>
    </Section>
  );
}
