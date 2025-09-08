import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeStatVariants = cva(
  'flex items-center rounded-full px-3 py-2',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800',
        red: 'bg-red-100 text-red-800',
        green: 'bg-green-100 text-green-800',
        blue: 'bg-blue-100 text-blue-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        purple: 'bg-purple-100 text-purple-800',
        pink: 'bg-pink-100 text-pink-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeStatProps = {
  icon?: string;
} & React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeStatVariants>;

function BadgeStat({ className, variant, icon, children, ...props }: BadgeStatProps) {
  return (
    <div className={cn(badgeStatVariants({ variant }), className)} {...props}>
      {icon && <i className={`fas fa-${icon} mr-2`}></i>}
      {children}
    </div>
  );
}

export { BadgeStat, badgeStatVariants };
