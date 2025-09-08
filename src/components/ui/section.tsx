import * as React from 'react';

import { cn } from '@/lib/utils';

const Section = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn('mb-6 border-b border-gray-100 dark:border-gray-700 pb-4', className)}
    {...props}
  />
);
Section.displayName = 'Section';

const SectionHeader = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn('font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center justify-between', className)}
    {...props}
  />
);
SectionHeader.displayName = 'SectionHeader';

const SectionTitle = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn('flex items-center', className)}
    {...props}
  />
);
SectionTitle.displayName = 'SectionTitle';

const SectionContent = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn('text-gray-600 dark:text-gray-300', className)}
    {...props}
  />
);
SectionContent.displayName = 'SectionContent';

export { Section, SectionContent, SectionHeader, SectionTitle };
