import * as React from 'react';

import { cn } from '@/lib/utils';

const Accordion = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn('space-y-4', className)}
    {...props}
  />
);
Accordion.displayName = 'Accordion';

const AccordionItem = ({ ref, className, active, ...props }: React.HTMLAttributes<HTMLDivElement> & { active?: boolean } & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn(
      'border-b border-gray-100 pb-4',
      className,
    )}
    {...props}
  />
);
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = ({ ref, className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { ref?: React.RefObject<HTMLButtonElement | null> }) => (
  <button
    ref={ref}
    className={cn(
      'flex items-center justify-between w-full font-medium text-gray-800',
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = ({ ref, className, forceMount, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { forceMount?: boolean } & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className={cn('mt-3', className)}
    {...props}
  >
    {children}
  </div>
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
