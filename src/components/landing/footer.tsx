import { faDiscord, faFacebookF, faXTwitter } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { Link } from '@/i18n/navigation';
import { ProductHuntBadge } from '../marketing/product-hunt-badge';

export function Footer() {
  const t = useTranslations('Landing.Footer');

  // 使用类型断言来处理链接
  const getLink = (key: string) => t(`links.${key}`);

  const footerSections = [
    {
      title: t('company'),
      links: [
        { name: getLink('about'), href: '/about' },
        { name: getLink('help'), href: '#demo' },
        { name: getLink('contact'), href: 'mailto:hello@example.com' },
      ],
    },
    {
      title: t('product'),
      links: [
        { name: getLink('features'), href: '#features' },
        { name: getLink('pricing'), href: '#pricing' },
        { name: getLink('testimonials'), href: '#testimonials' },
        { name: getLink('faq'), href: '#faq' },
      ],
    },
    {
      title: t('legal'),
      links: [
        { name: getLink('terms'), href: '/terms' },
        { name: getLink('privacy'), href: '/privacy' },
        { name: getLink('security'), href: '/security' },
        { name: getLink('refund'), href: '/refund' },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-secondary-800 to-secondary-900 py-16 text-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* 公司信息 */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center">
              <Image
                src="/knowone.svg"
                alt="App Template Logo"
                width={36}
                height={36}
                className="mr-2"
              />
              <h3 className="gradient-text text-2xl font-bold">
                AppTemplate
              </h3>
            </div>
            {/* <p className="mb-6 max-w-md text-gray-300 dark:text-gray-400">
              {t('subscribeText')}
            </p> */}
            <div className="flex space-x-4">
              <Link
                href="https://x.com/AppTemplate"
                className="flex size-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors hover:border-primary-500 hover:text-primary-400 dark:border-gray-600 dark:hover:border-primary-400"
                aria-label="X"
              >
                <FontAwesomeIcon icon={faXTwitter} className="text-lg" />
              </Link>
              <Link
                href="#"
                className="flex size-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors hover:border-primary-500 hover:text-primary-400 dark:border-gray-600 dark:hover:border-primary-400"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-lg" />
              </Link>
              <Link
                href="https://discord.gg/pnfxaxBm"
                className="flex size-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors hover:border-primary-500 hover:text-primary-400 dark:border-gray-600 dark:hover:border-primary-400"
                aria-label="discord"
              >
                <FontAwesomeIcon icon={faDiscord} className="text-lg" />
              </Link>
            </div>
            <div className="py-4 italic text-gray-300 underline dark:text-gray-400">
              <span>hello@example.com</span>
            </div>
            {/* ProductHunt Badge */}
            <div className="mt-0">
              <ProductHuntBadge
                postId="996862"
                size="small"
                theme="light"
                className="transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* 链接部分 */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h4 className="mb-5 text-lg font-semibold text-white dark:text-gray-200">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-block text-gray-400 transition-colors hover:text-primary-400 dark:text-gray-400 dark:hover:text-primary-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 dark:border-gray-700">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-gray-400 dark:text-gray-500 md:mb-0">
              &copy;
              {' '}
              {new Date().getFullYear()}
              {' '}
              AppTemplate
              {' '}
              {t('copyright')}
            </p>
            <div className="flex space-x-6">
              <Link
                href="/terms"
                className="text-gray-400 transition-colors hover:text-primary-400 dark:text-gray-400 dark:hover:text-primary-300"
              >
                {getLink('terms')}
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 transition-colors hover:text-primary-400 dark:text-gray-400 dark:hover:text-primary-300"
              >
                {getLink('privacy')}
              </Link>
              {/* <Link
                href="/cookies"
                className="text-gray-400 transition-colors hover:text-primary-400 dark:text-gray-400 dark:hover:text-primary-300"
              >
                {getLink('cookies')}
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// 为Footer组件添加静态getLink方法，用于在组件外部使用
Footer.getLink = (key: string): string => {
  return `links.${key}`;
};
