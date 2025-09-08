'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import {
  Footer,
  FooterContainer,
  FooterContent,
  FooterLinks,
  FooterSection,
  FooterText,
} from '@/components/ui/footer';
import { Link } from '@/i18n/navigation';

export function AppFooter() {
  const t = useTranslations('Landing.Footer');
  const currentYear = new Date().getFullYear();

  return (
    <Footer className="py-2 dark:bg-gray-800">
      <FooterContainer>
        <FooterContent className="flex-wrap">
          {/* Copyright information */}
          <FooterSection>
            <div className="flex items-center">
              <FooterText className="text-gray-300 dark:text-gray-400">
                {currentYear}
                {' '}
                AppTemplate.AI
                {t('copyright')}
              </FooterText>
            </div>
          </FooterSection>

          {/* Made with love */}
          {/* <FooterCopyright className="order-last hidden md:order-none md:inline-flex">
            <p className="text-xs text-gray-300 dark:text-gray-400">
              {t('madeWith')}
              {' '}
              <FontAwesomeIcon icon={faHeart} className="mx-1 size-3 text-red-400 dark:text-red-300" />
              {' '}
              {t('byTeam')}
            </p>
          </FooterCopyright> */}

          {/* Links */}
          <FooterLinks>
            <Link href="/terms" className="text-xs text-gray-400 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">
              {t('terms')}
            </Link>
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">
              {t('privacy')}
            </Link>
            <Link href="mailto:hello@knowone.ai" className="text-xs text-gray-400 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">
              {t('contact')}
            </Link>
          </FooterLinks>
        </FooterContent>
      </FooterContainer>
    </Footer>
  );
}
