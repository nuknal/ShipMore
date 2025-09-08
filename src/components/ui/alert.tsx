import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg p-4',
  {
    variants: {
      variant: {
        default: 'bg-gray-50 dark:bg-gray-900',
        purple: 'bg-purple-50 dark:bg-purple-900/30',
        yellow: 'bg-yellow-50 dark:bg-yellow-900/30',
        red: 'bg-red-50 dark:bg-red-900/30',
        amber: 'bg-amber-50 dark:bg-amber-900/30',
        green: 'bg-green-50 dark:bg-green-900/30',
        error: 'bg-red-50 dark:bg-red-900/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Alert = ({ ref, className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
);
Alert.displayName = 'Alert';

const AlertTitle = ({ ref, className, variant = 'default', ...props }: React.HTMLAttributes<HTMLHeadingElement> & { variant?: string } & { ref?: React.RefObject<HTMLParagraphElement | null> }) => {
  const colorMap: Record<string, string> = {
    default: 'text-gray-800 dark:text-gray-200',
    purple: 'text-purple-800 dark:text-purple-200',
    yellow: 'text-yellow-800 dark:text-yellow-200',
    red: 'text-red-800 dark:text-red-200',
    amber: 'text-amber-800 dark:text-amber-200',
    green: 'text-green-800 dark:text-green-200',
  };

  return (
    <h4
      ref={ref}
      className={cn('font-medium mb-2', colorMap[variant], className)}
      {...props}
    >
      {props.children}
    </h4>
  );
};
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = ({ ref, className, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.RefObject<HTMLParagraphElement | null> }) => (
  <p
    ref={ref}
    className={cn('text-gray-700 dark:text-gray-300 mb-3', className)}
    {...props}
  />
);
AlertDescription.displayName = 'AlertDescription';

const AlertFooter = ({ ref, className, variant = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: string } & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const borderColorMap: Record<string, string> = {
    default: 'border-gray-100 dark:border-gray-700',
    purple: 'border-purple-100 dark:border-purple-700/50',
    yellow: 'border-yellow-100 dark:border-yellow-700/50',
    red: 'border-red-100 dark:border-red-700/50',
    amber: 'border-amber-100 dark:border-amber-700/50',
    green: 'border-green-100 dark:border-green-700/50',
  };

  return (
    <div
      ref={ref}
      className={cn('bg-white dark:bg-gray-800 p-3 rounded border', borderColorMap[variant], className)}
      {...props}
    />
  );
};
AlertFooter.displayName = 'AlertFooter';

export { Alert, AlertDescription, AlertFooter, AlertTitle };
