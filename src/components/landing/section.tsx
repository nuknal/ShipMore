import React from 'react';

import { cn } from '@/lib/utils';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'gradient' | 'gradient-secondary';
} & React.HTMLAttributes<HTMLElement>;

export function Section({
  children,
  className,
  id,
  background = 'white',
  ...props
}: SectionProps) {
  const getBgClass = () => {
    switch (background) {
      case 'white':
        return 'bg-white dark:bg-gray-900';
      case 'gray':
        return 'bg-gray-50 dark:bg-gray-800';
      case 'gradient':
        return 'gradient-bg dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800';
      case 'gradient-secondary':
        return 'gradient-bg-secondary dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800';
      default:
        return 'bg-white dark:bg-gray-900';
    }
  };

  return (
    <section
      id={id}
      className={cn(
        'py-20 relative overflow-hidden',
        getBgClass(),
        className,
      )}
      {...props}
    >
      <div className="container relative z-10 mx-auto px-4">{children}</div>
    </section>
  );
}
