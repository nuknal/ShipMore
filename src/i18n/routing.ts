import { defineRouting } from 'next-intl/routing';
import supportedLangs from './lang';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: supportedLangs,
  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeCookie: true,
  localeDetection: true,
});
