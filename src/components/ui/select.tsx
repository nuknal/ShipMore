'use client';

import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SelectContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
};

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined);

function useSelectContext() {
  const context = React.use(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
}

type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function Select({
  value,
  onValueChange,
  children,
  defaultOpen = false,
}: SelectProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <SelectContext value={{ open, setOpen, value, onValueChange }}>
      <div className="relative w-full">{children}</div>
    </SelectContext>
  );
}

type SelectTriggerProps = {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
};

export function SelectTrigger({
  children,
  className,
  placeholder,
}: SelectTriggerProps) {
  const { open, setOpen } = useSelectContext();

  return (
    <button
      type="button"
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-left ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
        'dark:bg-gray-800 dark:border-gray-700 dark:ring-gray-700 dark:ring-offset-gray-700',
        open && 'border-primary-500 ring-2 ring-primary-500',
        className,
      )}
      onClick={() => setOpen(!open)}
    >
      <span className="truncate">{children || placeholder || '选择选项'}</span>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={cn(
          'ml-2 h-4 w-4 transition-transform duration-200',
          open && 'rotate-180',
        )}
      />
    </button>
  );
}

type SelectValueProps = {
  placeholder?: string;
};

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = useSelectContext();

  return (
    <span className="truncate">
      {value || placeholder || ''}
    </span>
  );
}

type SelectContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function SelectContent({ children, className }: SelectContentProps) {
  const { open, setOpen } = useSelectContext();

  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg',
          'dark:bg-gray-800 dark:border-gray-700 dark:ring-gray-700 dark:ring-offset-gray-700',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

export function SelectItem({
  value,
  children,
  className,
}: SelectItemProps) {
  const { value: selectedValue, onValueChange, setOpen } = useSelectContext();
  const isSelected = selectedValue === value;

  const handleSelect = () => {
    onValueChange(value);
    setOpen(false);
  };

  return (
    <div
      className={cn(
        'relative flex cursor-pointer select-none items-center py-2 px-3 text-sm outline-none hover:bg-gray-100',
        isSelected && 'bg-primary-50 text-primary-600 font-medium',
        'dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200',
        className,
      )}
      onClick={handleSelect}
    >
      <span className="grow truncate">{children}</span>
      {isSelected && (
        <span className="ml-2 text-primary-600">
          <FontAwesomeIcon icon={faCheck} className="size-4" />
        </span>
      )}
    </div>
  );
}
