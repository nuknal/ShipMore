'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Section } from './section';

export function Stats() {
  const t = useTranslations('Landing.Stats');

  const stats = [
    {
      value: t('users'),
      label: t('usersLabel'),
      dataAosDelay: '100',
    },
    {
      value: t('profiles'),
      label: t('profilesLabel'),
      dataAosDelay: '200',
    },
    {
      value: t('improvement'),
      label: t('improvementLabel'),
      dataAosDelay: '300',
    },
    {
      value: t('satisfaction'),
      label: t('satisfactionLabel'),
      dataAosDelay: '400',
    },
  ];

  return (
    <Section className="bg-primary-600 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="counter-anim mb-2 text-4xl font-bold md:text-5xl">
                {stat.value}
              </div>
              <p className="text-primary-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
