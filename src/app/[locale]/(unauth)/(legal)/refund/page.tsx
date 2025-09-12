import supportedLangs from '@/i18n/lang';

export async function generateStaticParams() {
  return supportedLangs.map(locale => ({ locale }));
}

export default async function RefundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isZH = locale === 'zh' || locale === 'zh-TW';

  const mod = isZH
    ? await import('./refund.zh.mdx')
    : await import('./refund.en.mdx');
  const MDXComponent = mod.default;

  const dateEN = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const dateZH = new Date().toLocaleDateString('zh', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {isZH ? `最后更新日期：${dateZH}` : `Last updated: ${dateEN}`}
          </p>
          <MDXComponent />
        </div>
      </div>
    </div>
  );
}
