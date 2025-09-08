import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.shipmore.xyz'),
  // General SEO - English First
  title: 'ShipMore - Next.js Application Template for Rapid Development',
  description: 'Build modern web applications faster with ShipMore - a comprehensive Next.js template featuring user authentication, payment integration, multi-language support, and modern UI components. Save months of development time.',
  keywords: [
    'Next.js template',
    'React application template',
    'web app boilerplate',
    'Next.js starter',
    'full-stack template',
    'TypeScript template',
    'authentication template',
    'payment integration',
    'multi-language app',
    'Tailwind CSS template',
    'modern web development',
    'rapid prototyping',
    'developer tools',
    'SaaS template',
    'startup template',
    'ShipMore',
  ],

  // Open Graph (OG) metadata - English First
  openGraph: {
    title: 'ShipMore - Build Modern Web Apps Faster with Next.js Template',
    description: 'Comprehensive Next.js application template with authentication, payments, internationalization, and modern UI. Perfect for developers and startups building SaaS products.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'ShipMore',
    images: [
      {
        url: '/og-image-shipmore.png',
        width: 1200,
        height: 630,
        alt: 'ShipMore Next.js application template for rapid development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card metadata - English First
  twitter: {
    card: 'summary_large_image',
    title: 'ShipMore - Next.js Template for Rapid Web Development',
    description: 'Build modern web applications faster with our comprehensive Next.js template. Features authentication, payments, i18n, and modern UI components.',
    // site: '@ShipMoreXYZ', // 如果有官方 Twitter Handle，请填写
    // creator: '@YourCreatorHandle', // 内容创建者的 Handle
    images: ['/twitter-card-shipmore.png'], // 建议使用一个适合 Twitter 的图片
  },

  alternates: {
    canonical: '/', // (unauth) 路径下的 landing page 是规范根路径
    languages: {
      en: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      zh: `${process.env.NEXT_PUBLIC_APP_URL}/zh`,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function UnauthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
