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

  let canonicalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}`;
  if (locale === 'en') {
    canonicalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/`;
  }

  const keywordsString = 'ShipMore,Next.js模板,React应用模板,全栈模板,TypeScript模板,认证模板,支付集成,多语言应用,现代Web开发,快速原型,开发者工具,SaaS模板,创业模板,Next.js template,React application template,full-stack template,TypeScript template,authentication template,payment integration,multi-language app,modern web development,rapid prototyping,developer tools,SaaS template,startup template';
  const keywordsArray = keywordsString.split(',').map(k => k.trim());

  return {
    title: t('title'),
    description: t('description'),
    keywords: keywordsArray,
    alternates: {
      canonical: canonicalUrl,
      languages: routing.locales.reduce((acc, currentLocaleInLoop) => {
        acc[currentLocaleInLoop] = currentLocaleInLoop === 'en'
          ? `${process.env.NEXT_PUBLIC_APP_URL}/`
          : `${process.env.NEXT_PUBLIC_APP_URL}/${currentLocaleInLoop}`;
        return acc;
      }, {} as Record<string, string>),
    },
    icons: {
      icon: '/shipmore.png',
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
          src={process.env.UMAMI_SCRIPT_URL}
          data-website-id={process.env.UMAMI_WEBSITE_ID}
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
