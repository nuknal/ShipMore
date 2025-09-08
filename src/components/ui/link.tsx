import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

type LinkProps = {
  href: string;
  showArrow?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  asNextLink?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link = ({ ref, className, href, showArrow = false, variant = 'default', size = 'default', asNextLink = true, children, ...props }: LinkProps & { ref?: React.RefObject<HTMLAnchorElement | null> }) => {
  const variantClasses = {
    default: 'text-gray-600 hover:text-gray-900',
    primary: 'text-primary-600 hover:text-primary-700',
    secondary: 'text-gray-500 hover:text-gray-700',
    destructive: 'text-red-600 hover:text-red-700',
  };

  const sizeClasses = {
    default: 'text-base',
    sm: 'text-sm',
    lg: 'text-lg',
  };

  const classes = cn(
    'font-medium transition-colors',
    variantClasses[variant],
    sizeClasses[size],
    showArrow ? 'flex items-center' : '',
    className,
  );

  const content = (
    <>
      {children}
      {showArrow && <FontAwesomeIcon icon={faChevronRight} className="ml-1 text-xs" />}
    </>
  );

  if (asNextLink) {
    return (
      <NextLink href={href} className={classes} ref={ref} {...props}>
        {content}
      </NextLink>
    );
  }

  return (
    <a href={href} className={classes} ref={ref} {...props}>
      {content}
    </a>
  );
};
Link.displayName = 'Link';

export { Link };
