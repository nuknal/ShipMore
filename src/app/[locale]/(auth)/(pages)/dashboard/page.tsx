'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('title')}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {t('welcome')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('getStarted')}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('getStartedDesc')}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('customization')}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('customizationDesc')}
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
            <Link className="text-blue-600 hover:underline" href="/ai/chat">➡ Chat Demo</Link>
            <Link className="text-blue-600 hover:underline" href="/ai/image">➡ Image Demo</Link>
            <Link className="text-blue-600 hover:underline" href="/ai/file-parse">➡ File Parse Demo</Link>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('documentation')}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('documentationDesc')}
          </p>
        </Card>
      </div>
    </div>
  );
}
