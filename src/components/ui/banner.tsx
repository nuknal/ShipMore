'use client';

import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type BannerProps = {
  message: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
  onClose?: () => void;
  action?: {
    text: string;
    onClick: () => void;
  };
  sticky?: boolean;
  autoHideDuration?: number;
};

/**
 * 横幅组件
 * 用于显示重要的通知、营销信息和折扣
 */
export function Banner({
  message,
  variant = 'primary',
  icon,
  showCloseButton = true,
  className,
  onClose,
  action,
  sticky = true,
  autoHideDuration,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations('Common');

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (autoHideDuration && !sticky) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [autoHideDuration, sticky]);

  if (!isVisible) {
    return null;
  }

  const variantStyles = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    primary: 'bg-primary-50 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
    success: 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    danger: 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  const buttonHoverStyles = {
    default: 'hover:bg-gray-200 dark:hover:bg-gray-700',
    primary: 'hover:bg-primary-100 dark:hover:bg-primary-800',
    success: 'hover:bg-green-100 dark:hover:bg-green-800',
    warning: 'hover:bg-yellow-100 dark:hover:bg-yellow-800',
    danger: 'hover:bg-red-100 dark:hover:bg-red-800',
  };

  return (
    <div
      className={cn(
        'relative w-full py-3 px-4 text-center sm:px-6',
        'top-banner',
        variantStyles[variant],
        {
          'fixed top-0 left-0 right-0 z-[200]': sticky,
          'shadow-sm': !sticky,
        },
        'transition-all duration-300 ease-in-out',
        'animate-fade-in-down',
        className,
      )}
    >
      <div className="flex items-center justify-center gap-x-2">
        {icon && <span className="shrink-0">{icon}</span>}

        <div className="flex-1 text-sm font-medium">{message}</div>

        <div className="flex items-center gap-x-2">
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-semibold transition-colors',
                buttonHoverStyles[variant],
              )}
            >
              {action.text}
            </button>
          )}

          {showCloseButton && (
            <button
              type="button"
              className={cn(
                'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                buttonHoverStyles[variant],
              )}
              onClick={handleClose}
              aria-label={t('close')}
            >
              <span className="sr-only">{t('close')}</span>
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 添加全局CSS到你的样式文件中:
 *
 * @keyframes fade-in-down {
 *   0% {
 *     opacity: 0;
 *     transform: translateY(-10px);
 *   }
 *   100% {
 *     opacity: 1;
 *     transform: translateY(0);
 *   }
 * }
 *
 * .animate-fade-in-down {
 *   animation: fade-in-down 0.5s ease-out forwards;
 * }
 */
