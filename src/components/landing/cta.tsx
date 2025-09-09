'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export function CTA() {
  const t = useTranslations('Landing.CTA');

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const delayedVariant = (delay: number) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delay,
      },
    },
  });

  return (
    <section className="gradient-bg-secondary relative overflow-hidden py-20 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            {t('title')}
          </motion.h2>
          <motion.p
            className="mb-8 text-lg text-gray-900 opacity-90 dark:text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={delayedVariant(0.1)}
          >
            {t('description')}
          </motion.p>
          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={delayedVariant(0.2)}
          >
            <Button
              variant="default"
              size="lg"
              className="btn-float shine bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
              asChild
            >
              <Link href="/sign-in">{t('primaryButton')}</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-900 hover:bg-white/10 dark:border-gray-300 dark:text-gray-200 dark:hover:bg-gray-800/50"
              asChild
            >
              <Link href="#features">{t('secondaryButton')}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="h-auto w-full"
        >
          <path
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="fill-white dark:fill-gray-900"
          >
          </path>
        </svg>
      </div>
    </section>
  );
}
