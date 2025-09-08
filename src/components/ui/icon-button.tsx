import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-primary-600',
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        default: 'p-2',
        sm: 'p-1',
        lg: 'p-3',
      },
      isDisabled: {
        true: 'cursor-not-allowed opacity-50 hover:bg-transparent hover:text-gray-400',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      isDisabled: false,
    },
  },
);

export type IconButtonProps = {
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof iconButtonVariants>;

const IconButton = ({ ref, className, variant, size, isDisabled, disabled, asChild = false, ...props }: IconButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  // 确保 isDisabled 是布尔值
  const isButtonDisabled = Boolean(disabled || isDisabled);

  return (
    <button
      className={cn(iconButtonVariants({ variant, size, isDisabled: isButtonDisabled, className }))}
      ref={ref}
      disabled={isButtonDisabled}
      {...props}
    />
  );
};
IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants };
