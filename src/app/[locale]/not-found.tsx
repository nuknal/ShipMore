'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { useRouter } from '@/i18n/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  const t = useTranslations('NotFound');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center"
          >
            <span className="text-9xl font-bold text-primary-600 dark:text-primary-400">404</span>
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-3 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8 text-gray-600 dark:text-gray-300"
        >
          {t('description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button
            variant="gradient"
            size="lg"
            onClick={() => router.push('/')}
            className="shadow-lg transition-shadow hover:shadow-xl"
          >
            {t('backToHome')}
          </Button>
          <Link
            href="mailto:support@shipmore.xyz"
            asNextLink={true}
            className="inline-flex h-12 items-center justify-center rounded-md border border-primary-200 bg-white px-8 py-2 text-sm font-medium text-primary-600 shadow-md transition-colors hover:bg-primary-50 dark:border-gray-700 dark:bg-gray-800 dark:text-primary-400 dark:hover:bg-gray-700"
          >
            {t('contactUs')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('helpText')}
            <Link
              href="/help"
              variant="primary"
              className="ml-1 hover:underline"
            >
              {t('helpCenter')}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
