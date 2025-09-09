import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { HeroImage } from './hero-image';
import { HeroImageZh } from './hero-image-zh';

export function Hero() {
  const t = useTranslations('Landing.Hero');
  const locale = useLocale();
  return (
    <section className="gradient-bg relative overflow-hidden pb-24 pt-32 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
              {t('badge')}
            </span>
            <h1 className="mb-6 text-4xl font-bold leading-tight dark:text-white md:text-5xl lg:text-6xl">
              {/* <span className="gradient-text">{t('title.highlighted')}</span>
              <br /> */}
              {t('title.last')}
              <br />
              <span className="gradient-text">{t('title.understand_more')}</span>
              {t('title.and')}
              <span className="gradient-text">{t('title.respond_smarter')}</span>
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              {t('description')}
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                className="btn-float shine rounded-lg bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:-translate-y-1 hover:bg-primary-700 hover:shadow-xl active:translate-y-0 active:shadow-md dark:bg-primary-700 dark:hover:bg-primary-600"
                asChild
              >
                <Link href="/sign-in">{t('primaryButton')}</Link>
              </Button>
              <Button
                className="rounded-lg border-2 border-primary-200 bg-white px-8 py-4 text-lg font-semibold text-primary-600 shadow-md transition-all hover:-translate-y-1 hover:border-primary-300 hover:bg-primary-50 hover:shadow-lg active:translate-y-0 dark:border-primary-700 dark:bg-gray-800 dark:text-primary-400 dark:hover:bg-gray-700"
                asChild
              >
                <Link href="#demo">{t('secondaryButton')}</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            {locale === 'zh' ? (
              <HeroImageZh className="card-3d floating rounded-lg shadow-xl dark:shadow-gray-900/50" />
            ) : (
              <HeroImage className="card-3d floating rounded-lg shadow-xl dark:shadow-gray-900/50" />
            )}
          </div>
        </div>
      </div>

      {/* 波浪背景 */}
      <div className="wave-bg">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white dark:fill-gray-900"
          >
          </path>
        </svg>
      </div>
    </section>
  );
}
