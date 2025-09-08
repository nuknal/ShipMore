import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing'; // 假设 routing.ts 在此路径

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.shipmore.xyz'; // 替换为你的实际域名

export default function sitemap(): MetadataRoute.Sitemap {
  const { locales, defaultLocale } = routing;

  // 1. 基本的国际化根路径 (e.g., /en, /zh, /)
  const localePaths = locales.map((locale) => {
    const path = locale === defaultLocale ? '/' : `/${locale}`;
    return {
      url: `${siteUrl}${path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: locale === defaultLocale ? 1 : 0.8,
    };
  });

  // 2. 其他已知的静态公开页面
  const staticPageSegments = [
    'changelog',
    'about',
    'refund',
    'security',
    'privacy',
    'terms',
    // 如果未来有 /contact 或 /help 页面，也可以添加到这里
  ];

  const additionalStaticPaths: MetadataRoute.Sitemap = [];
  staticPageSegments.forEach((segment) => {
    locales.forEach((locale) => {
      const path = locale === defaultLocale ? `/${segment}` : `/${locale}/${segment}`;
      additionalStaticPaths.push({
        url: `${siteUrl}${path}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7, // 静态页面的优先级可以稍低一些
      });
    });
  });

  // (unauth) 路径下的特定页面。由于根 landing page 已被 localePaths 覆盖，
  // 并且其他特定页面如 /about, /terms 等已由 additionalStaticPaths 处理，
  // 此处通常为空，除非 (unauth) 组下还有其他未被上述逻辑覆盖的特定页面。
  const unauthGroupSpecificPaths: MetadataRoute.Sitemap = [];
  // 例如，如果 (unauth) 下有一个独特的页面 /unauth/special-offer, 则可以这样添加:
  // locales.forEach(locale => {
  //   const path = locale === defaultLocale ? '/special-offer' : `/${locale}/special-offer`;
  //   // 注意：如果路由组 (unauth) 真的影响 URL，则路径会是 /unauth/special-offer
  //   // 但通常 () 包裹的路由组不影响 URL 路径
  //   unauthGroupSpecificPaths.push({
  //     url: `${siteUrl}${path}`,
  //     lastModified: new Date().toISOString(),
  //     changeFrequency: 'weekly',
  //     priority: 0.6,
  //   });
  // });

  const allPaths = [
    ...localePaths,
    ...additionalStaticPaths,
    ...unauthGroupSpecificPaths,
  ];

  return allPaths;
}
