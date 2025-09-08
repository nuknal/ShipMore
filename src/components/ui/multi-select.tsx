'use client';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type MultiSelectOption = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '请选择',
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = React.useRef<HTMLDivElement>(null);

  // 处理选择项的切换
  const handleToggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  // 移除已选择的标签
  const handleRemoveTag = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

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
      <div
        className={cn(
          'flex min-h-10 w-full flex-wrap items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-0 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
          isOpen && 'border-primary-500 ring-2 ring-primary-500',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {value.length > 0
          ? (
              <div className="flex flex-wrap gap-1">
                {value.map((selectedValue) => {
                  const option = options.find(o => o.value === selectedValue);
                  return (
                    <span
                      key={selectedValue}
                      className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {option?.label || selectedValue}
                      {!disabled && (
                        <button
                          type="button"
                          className="ml-1 inline-flex size-4 items-center justify-center rounded-full text-primary-600 hover:bg-primary-200 hover:text-primary-900"
                          onClick={e => handleRemoveTag(e, selectedValue)}
                        >
                          <FontAwesomeIcon icon={faTimes} className="size-3" />
                        </button>
                      )}
                    </span>
                  );
                })}
              </div>
            )
          : (
              <span className="text-gray-500">{placeholder}</span>
            )}
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300">
          <div className="p-1 dark:bg-gray-700 dark:text-gray-300">
            {options.map(option => (
              <div
                key={option.value}
                className={cn(
                  'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300',
                  value.includes(option.value) && 'bg-primary-50 text-primary-600 font-medium',
                )}
                onClick={() => handleToggleOption(option.value)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 size-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={value.includes(option.value)}
                    onChange={() => {}}
                    onClick={e => e.stopPropagation()}
                  />
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
