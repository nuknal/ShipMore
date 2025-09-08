import {
  faBookOpen,
  faBrain,
  faCommentDots,
  faFaceFrownOpen,
  faLayerGroup,
  faMagic,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Section } from './section';
import { SectionHeading } from './section-heading';

export function Features() {
  const t = useTranslations('Landing.Features');

  const featureIcons: Record<string, any> = {
    [t(`cards.0.title`)]: faBrain,
    [t(`cards.1.title`)]: faFaceFrownOpen,
    [t(`cards.2.title`)]: faCommentDots,
    [t(`cards.3.title`)]: faMagic,
    [t(`cards.4.title`)]: faLayerGroup,
    [t(`cards.5.title`)]: faBookOpen,
  };

  const getFeatures = () => {
    const features = [];
    for (let i = 0; i < 6; i++) {
      const title = t(`cards.${i}.title`);
      features.push({
        icon: featureIcons[title] || faStar, // 默认图标
        title,
        description: t(`cards.${i}.description`),
      });
    }
    return features;
  };

  const features = getFeatures();

  return (
    <Section id="features" background="white">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge={t('badge')}
          title={t('title')}
          description={t('description')}
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card rounded-xl bg-white p-6 shadow-md dark:border dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/30"
            >
              <div className="mb-6 flex size-14 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                <FontAwesomeIcon icon={feature.icon} className="text-2xl text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
