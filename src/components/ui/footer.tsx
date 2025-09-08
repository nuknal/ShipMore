import * as React from 'react';

import { cn } from '@/lib/utils';

const Footer = ({ ref, className, ...props }: React.HTMLAttributes<HTMLElement> & { ref?: React.RefObject<HTMLElement | null> }) => (
  <footer
    ref={ref}
    className={cn('bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 py-3 mt-auto', className)}
    {...props}
  />
);
Footer.displayName = 'Footer';

const FooterContainer = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn('container mx-auto px-4', className)}
    {...props}
  />
);
FooterContainer.displayName = 'FooterContainer';

const FooterContent = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn('flex flex-row justify-between items-center', className)}
    {...props}
  />
);
FooterContent.displayName = 'FooterContent';

const FooterSection = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn('mb-0', className)}
    {...props}
  />
);
FooterSection.displayName = 'FooterSection';

const FooterLinks = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn('flex space-x-4', className)}
    {...props}
  />
);
FooterLinks.displayName = 'FooterLinks';

const FooterLink = ({ ref, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { ref?: React.RefObject<HTMLAnchorElement | null> }) => (
  <a
    ref={ref}
    className={cn('text-gray-400 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 text-xs', className)}
    {...props}
  />
);
FooterLink.displayName = 'FooterLink';

const FooterText = ({ ref, className, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.RefObject<HTMLParagraphElement | null> }) => (
  <p
    ref={ref}
    className={cn('text-gray-400 dark:text-gray-300 text-xs', className)}
    {...props}
  />
);
FooterText.displayName = 'FooterText';

const FooterCopyright = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn('text-center inline-flex items-center ml-2', className)}
    {...props}
  />
);
FooterCopyright.displayName = 'FooterCopyright';

export {
  Footer,
  FooterContainer,
  FooterContent,
  FooterCopyright,
  FooterLink,
  FooterLinks,
  FooterSection,
  FooterText,
};
