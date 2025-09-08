import * as React from 'react';

import { cn } from '@/lib/utils';

const Avatar = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn(
      'relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
);
Avatar.displayName = 'Avatar';

const AvatarImage = ({ ref, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { ref?: React.RefObject<HTMLImageElement | null> }) => (
  <img
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600',
      className,
    )}
    {...props}
  />
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarFallback, AvatarImage };
