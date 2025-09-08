import * as React from 'react';

import { cn } from '@/lib/utils';

type SelectAdvancedProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

const SelectAdvanced: React.FC<SelectAdvancedProps> = ({
  value,
  onValueChange,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = React.useRef<HTMLDivElement>(null);

  // 关闭下拉菜单的点击外部处理器
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={cn('relative', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child as React.ReactElement<SelectTriggerProps>, {
              onClick: () => setIsOpen(!isOpen),
              isOpen,
            });
          }
          if (child.type === SelectContent) {
            return isOpen
              ? React.cloneElement(child as React.ReactElement<SelectContentProps>, {
                  value,
                  onValueChange: (newValue: string) => {
                    onValueChange(newValue);
                    setIsOpen(false);
                  },
                })
              : null;
          }
        }
        return child;
      })}
    </div>
  );
};

type SelectTriggerProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isOpen?: boolean;
};

const SelectTrigger: React.FC<SelectTriggerProps> = ({
  children,
  className,
  onClick,
  isOpen,
}) => {
  return (
    <button
      type="button"
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-0',
        isOpen && 'border-primary-500 ring-2 ring-primary-500',
        className,
      )}
      onClick={onClick}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('ml-2 h-4 w-4 transition-transform', isOpen && 'rotate-180')}
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  );
};

type SelectContentProps = {
  children: React.ReactNode;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

const SelectContent: React.FC<SelectContentProps> = ({
  children,
  className,
  value,
  onValueChange,
}) => {
  return (
    <div className={cn(
      'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg',
      className,
    )}
    >
      <div className="p-1">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectItem) {
            const childElement = child as React.ReactElement<SelectItemProps>;
            return React.cloneElement(childElement, {
              isSelected: childElement.props.value === value,
              onSelect: () => onValueChange && onValueChange(childElement.props.value),
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

type SelectItemProps = {
  children: React.ReactNode;
  className?: string;
  value: string;
  isSelected?: boolean;
  onSelect?: () => void;
};

const SelectItem: React.FC<SelectItemProps> = ({
  children,
  className,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 hover:text-gray-900',
        isSelected && 'bg-primary-50 text-primary-600 font-medium',
        className,
      )}
      onClick={onSelect}
    >
      {children}
    </div>
  );
};

type SelectValueProps = {
  children?: React.ReactNode;
  placeholder?: string;
};

const SelectValue: React.FC<SelectValueProps> = ({
  children,
  placeholder,
}) => {
  if (!children) {
    return <span className="text-gray-500">{placeholder}</span>;
  }
  return <>{children}</>;
};

export {
  SelectAdvanced as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
};
