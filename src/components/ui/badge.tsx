import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-white bg-opacity-90 text-primary-700',
        primary: 'bg-white bg-opacity-90 text-primary-700',
        purple: 'bg-white bg-opacity-90 text-purple-700',
        green: 'bg-white bg-opacity-90 text-green-700',
        secondary: 'bg-secondary-600 text-white',
        outline: 'border-input bg-background text-foreground border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeProps = {} & React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
