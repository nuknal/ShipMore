import { useTranslations } from 'next-intl';
import { changelogEntries } from '@/data/changelog';
import { ChangelogItem } from './ChangelogItem';

export function ChangelogList() {
  const t = useTranslations('Changelog');

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="mt-2 text-gray-500">{t('subtitle')}</p>
      </div>
      <div className="divide-y">
        {changelogEntries.map((entry, index) => (
          <ChangelogItem key={index} entry={entry} />
        ))}
      </div>
    </div>
  );
}
