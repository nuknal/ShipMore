'use client';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

import { Section } from './section';
import { SectionHeading } from './section-heading';

export function FAQ() {
  const t = useTranslations('Landing.FAQ');
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const faqs = [
    {
      id: 'faq-1',
      question: t('items.0.question'),
      answer: t('items.0.answer'),
    },
    {
      id: 'faq-2',
      question: t('items.1.question'),
      answer: t('items.1.answer'),
    },
    {
      id: 'faq-3',
      question: t('items.2.question'),
      answer: t('items.2.answer'),
    },
    {
      id: 'faq-4',
      question: t('items.3.question'),
      answer: t('items.3.answer'),
    },
    {
      id: 'faq-5',
      question: t('items.4.question'),
      answer: t('items.4.answer'),
    },
  ];

  return (
    <Section id="faq" background="gray">
      <SectionHeading
        badge={t('badge')}
        title={t('title')}
        description={t('description')}
      />
      <div className="mx-auto max-w-3xl">
        {faqs.map(faq => (
          <div
            key={faq.id}
            className="faq-item mb-6 overflow-hidden rounded-lg shadow-sm dark:shadow-gray-900/30"
          >
            <button
              type="button"
              onClick={() => toggleItem(faq.id)}
              className="w-full rounded-lg bg-white p-5 text-left transition-colors hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`size-5 text-primary-500 transition-transform duration-300 dark:text-primary-400 ${openItem === faq.id ? 'rotate-180' : ''}`}
                />
              </div>
            </button>
            <div
              className={`mt-5 overflow-hidden bg-white px-5 transition-all duration-300 dark:bg-gray-700 ${
                openItem === faq.id ? 'max-h-96 py-5' : 'max-h-0'
              }`}
            >
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">{t('moreQuestions')}</p>
        <Button
          variant="outline"
          className="border-primary-500 px-8 py-3 text-lg font-medium text-primary-700 hover:bg-primary-50 dark:border-primary-600 dark:text-primary-400 dark:hover:bg-gray-700"
          asChild
        >
          <Link href="/contact">{t('contactUs')}</Link>
        </Button>
      </div>
    </Section>
  );
}
