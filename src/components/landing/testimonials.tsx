'use client';

import { faComments, faHourglass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocale } from 'next-intl';
import React from 'react';
import { Section } from './section';
import { SectionHeading } from './section-heading';

export function Testimonials() {
  const locale = useLocale();

  // 根据语言设置占位文本
  const placeholderText = locale === 'zh'
    ? {
        title: '用户评价',
        subtitle: '等待真实用户评价',
        description: '产品即将上线，我们将在这里展示真实用户的使用体验和反馈',
        comingSoon: '敬请期待...',
        waitingForReviews: '等待真实用户的宝贵反馈',
      }
    : {
        title: 'User Reviews',
        subtitle: 'Awaiting Real User Testimonials',
        description: 'Our product is launching soon. We will showcase real user experiences and feedback here',
        comingSoon: 'Coming soon...',
        waitingForReviews: 'Waiting for valuable feedback from real users',
      };

  return (
    <Section id="testimonials" className="bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge={placeholderText.title}
          title={placeholderText.subtitle}
          description={placeholderText.description}
        />

        <div className="flex justify-center">
          <div className="w-full max-w-2xl rounded-xl bg-white p-12 shadow-md dark:border dark:border-gray-600 dark:bg-gray-700 dark:shadow-gray-900/30">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faComments}
                    className="text-4xl text-gray-300 dark:text-gray-500"
                  />
                  <FontAwesomeIcon
                    icon={faHourglass}
                    className="absolute -right-1 -top-1 text-lg text-primary-500 dark:text-primary-400"
                  />
                </div>
              </div>

              <h3 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                {placeholderText.waitingForReviews}
              </h3>

              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {placeholderText.comingSoon}
              </p>

              <div className="flex justify-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={`placeholder-star-${i}`} className="text-xl text-gray-200 dark:text-gray-600">
                    ★
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
