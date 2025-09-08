import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { AuthProvider } from '@/components/providers/auth-provider';
import { FontAwesomeProvider } from '@/components/providers/font-awesome-provider';
import { routing } from '@/i18n/routing';
import '@/styles/globals.css';
import '@/styles/landing.css';

// generateMetadata function to define metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  let canonicalUrl = `https://knowone.ai/${locale}`;
  if (locale === 'en') {
    canonicalUrl = 'https://knowone.ai/';
  }

  const keywordsString = 'KnowOne,AI洞察, 社交技能, 人际关系, 情绪识别, 潜台词解析, 深度心理分析, AI Insights,social skills,relationship, mental, emotions, psychology,feelings, suggestions';
  const keywordsArray = keywordsString.split(',').map(k => k.trim());

  return {
    title: t('title'),
    description: t('description'),
    keywords: keywordsArray,
    alternates: {
      canonical: canonicalUrl,
      languages: routing.locales.reduce((acc, currentLocaleInLoop) => {
        acc[currentLocaleInLoop] = currentLocaleInLoop === 'en'
          ? 'https://knowone.ai/'
          : `https://knowone.ai/${currentLocaleInLoop}`;
        return acc;
      }, {} as Record<string, string>),
    },
    icons: {
      icon: '/knowone.svg',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 确保传入的 `locale` 是有效的
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://umami.nuknal.com/script.js"
          data-website-id="07cdda53-06b3-447c-8c30-1bceab22ac91"
        />
      </head>
      <body className="bg-gray-50 font-sans dark:bg-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <FontAwesomeProvider>
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            </FontAwesomeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
