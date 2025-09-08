import React from 'react';

import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
  badgeDark?: boolean;
  align?: 'left' | 'center';
};

export function SectionHeading({
  badge,
  title,
  description,
  className,
  align = 'center',
  ...props
}: SectionHeadingProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mb-8',
        align === 'center' ? 'text-center' : 'text-left',
        className,
      )}
      {...props}
    >
      {badge && (
        <span
          className={cn(
            'mb-4 inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400', // 通用样式
          )}
        >
          {badge}
        </span>
      )}
      <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
      {description && <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">{description}</p>}
    </div>
  );
}
