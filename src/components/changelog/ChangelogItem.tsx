import type { ChangelogEntry } from '@/data/changelog';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type ChangelogItemProps = {
  entry: ChangelogEntry;
};

const typeColorMap = {
  added: 'text-green-500',
  changed: 'text-blue-500',
  fixed: 'text-amber-500',
  removed: 'text-red-500',
  improved: 'text-purple-500',
};

const typeIconMap = {
  added: '✨',
  changed: '🔄',
  fixed: '🐛',
  removed: '🗑️',
  improved: '📈',
};

export function ChangelogItem({ entry }: ChangelogItemProps) {
  const t = useTranslations('Changelog');

  return (
    <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[200px_1fr]">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-bold">
          v
          {entry.version}
        </h3>
        <time className="text-sm text-gray-500">{entry.date}</time>
      </div>
      <div className="space-y-4">
        {entry.title && <h4 className="mb-4 text-xl font-semibold">{entry.title}</h4>}
        <ul className="space-y-3">
          {entry.changes.map((change, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-0.5">{typeIconMap[change.type]}</span>
              <div>
                <span className={cn('font-medium mr-2', typeColorMap[change.type])}>
                  {t(`changeTypes.${change.type}`)}
                  :
                </span>
                <span>{change.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
