import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://knowone.ai'; // 替换为你的实际域名

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // disallow: '/private/', // 如果有不希望被爬取的路径，可以在此添加
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
