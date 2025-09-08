import type { PlanDetails } from '@/types/subscription';

import { useTranslations } from 'next-intl';

export function GetPricing() {
  const t = useTranslations('Landing.Pricing');

  const plans: PlanDetails[] = [
    {
      id: 'free',
      name: t('plans.0.name'),
      price: t('plans.0.price'),
      period: t('plans.0.period'),
      description: t('plans.0.description'),
      features: [
        { feature: t('plans.0.features.0'), isAvailable: true },
        { feature: t('plans.0.features.1'), isAvailable: true },
        { feature: t('plans.0.features.2'), isAvailable: true },
        { feature: t('plans.0.features.4'), isAvailable: false },
        { feature: t('plans.0.features.5'), isAvailable: false },
        { feature: t('plans.0.features.6'), isAvailable: false },
      ],
      buttonText: t('plans.0.buttonText'),
      currency: 'USD',
      textQuota: 3,
      imageQuota: 1,
    },
    {
      id: 'premium',
      name: t('plans.1.name'),
      price: t('plans.1.price'),
      period: t('plans.1.period'),
      description: t('plans.1.description'),
      features: [
        { feature: t('plans.1.features.0'), isAvailable: true },
        { feature: t('plans.1.features.1'), isAvailable: true },
        { feature: t('plans.1.features.2'), isAvailable: true },
        { feature: t('plans.1.features.4'), isAvailable: true },
        { feature: t('plans.1.features.5'), isAvailable: true },
        { feature: t('plans.1.features.6'), isAvailable: true },
      ],
      buttonText: t('plans.1.buttonText'),
      currency: 'USD',
      textQuota: 200,
      imageQuota: 50,
      isPopular: true,
    },
    {
      id: 'ultimate',
      name: t('plans.2.name'),
      price: t('plans.2.price'),
      period: t('plans.2.period'),
      description: t('plans.2.description'),
      features: [
        { feature: t('plans.2.features.0'), isAvailable: true },
        { feature: t('plans.2.features.1'), isAvailable: true },
        { feature: t('plans.2.features.2'), isAvailable: true },
        { feature: t('plans.2.features.4'), isAvailable: true },
        { feature: t('plans.2.features.5'), isAvailable: true },
        { feature: t('plans.2.features.6'), isAvailable: true },
      ],
      buttonText: t('plans.2.buttonText'),
      currency: 'USD',
      textQuota: 500,
      imageQuota: 100,
    },
  ];

  return plans;
}
