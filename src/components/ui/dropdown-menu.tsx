'use client';

import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

import { cn } from '@/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = ({ ref, className, inset, children, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
} & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger> | null> }) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-primary-100 data-[state=open]:bg-primary-100',
      'dark:focus:bg-gray-700 dark:data-[state=open]:bg-gray-700',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <FontAwesomeIcon icon={faChevronRight} className="ml-auto size-4" />
  </DropdownMenuPrimitive.SubTrigger>
);
DropdownMenuSubTrigger.displayName
  = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.SubContent> | null> }) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100',
      className,
    )}
    {...props}
  />
);
DropdownMenuSubContent.displayName
  = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = ({ ref, className, sideOffset = 4, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.Content> | null> }) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md',
        'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = ({ ref, className, inset, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
} & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.Item> | null> }) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-primary-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'dark:focus:bg-gray-700 dark:focus:text-gray-100',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = ({ ref, className, children, checked, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem> | null> }) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-primary-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'dark:focus:bg-gray-700 dark:focus:text-gray-100',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <FontAwesomeIcon icon={faCheck} className="size-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);
DropdownMenuCheckboxItem.displayName
  = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = ({ ref, className, children, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.RadioItem> | null> }) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-primary-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'dark:focus:bg-gray-700 dark:focus:text-gray-100',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <div className="size-2 rounded-full bg-primary-600" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = ({ ref, className, inset, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
} & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.Label> | null> }) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-xs text-gray-500',
      'dark:text-gray-400',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> & { ref?: React.RefObject<React.ElementRef<typeof DropdownMenuPrimitive.Separator> | null> }) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-gray-100 dark:bg-gray-700', className)}
    {...props}
  />
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
