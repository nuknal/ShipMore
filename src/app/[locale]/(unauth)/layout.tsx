import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.knowone.ai'),
  // General SEO - English First
  title: 'KnowOne AI - Understand Conversations, Improve Relationships',
  description: 'Unlock deeper understanding in your interactions with KnowOne AI. Analyze text & images for hidden emotions, subtext, and psychological insights. Get smart suggestions to respond better and build stronger connections.',
  keywords: [
    'AI social skills',
    'relationship improvement AI',
    'conversation analysis',
    'emotion recognition AI',
    'subtext interpretation',
    'psychological analysis tool',
    'communication skills AI',
    'understand others better',
    'smart response suggestions',
    'KnowOne AI',
    'interpersonal skills',
    'emotional intelligence AI',
  ],

  // Open Graph (OG) metadata - English First
  openGraph: {
    title: 'KnowOne AI: Decode Conversations, Enhance Your Social Skills',
    description: 'Gain AI-powered insights into emotions, intentions, and subtext. KnowOne AI helps you understand more and respond smarter to build meaningful relationships.',
    url: 'https://www.knowone.ai', // 请确保这是正确的生产环境 URL
    siteName: 'KnowOne AI',
    images: [
      {
        url: '/og-image-knowone-social.png', // 建议使用一个能代表社交理解和连接的 OG 图片
        width: 1200,
        height: 630,
        alt: 'KnowOne AI helping understand conversations and improve relationships',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card metadata - English First
  twitter: {
    card: 'summary_large_image',
    title: 'KnowOne AI - Master Social Interactions with AI Insights',
    description: 'Decode conversations, understand emotions, and get smart response suggestions with KnowOne AI. Elevate your communication and relationships.',
    // site: '@KnowOneAI', // 如果有官方 Twitter Handle，请填写
    // creator: '@YourCreatorHandle', // 内容创建者的 Handle
    images: ['/twitter-card-knowone.png'], // 建议使用一个适合 Twitter 的图片
  },

  alternates: {
    canonical: '/', // 假设 (unauth) 路径下的 landing page 是英文的规范根路径
    languages: {
      en: 'https://www.knowone.ai/', // 根据您的路由调整
      zh: 'https://www.knowone.ai/zh',
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
