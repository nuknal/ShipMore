'use client';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

type FontSizeSelectorProps = {
  currentSize: 'small' | 'medium' | 'large';
  onChange: (size: 'small' | 'medium' | 'large') => void;
};

export default function FontSizeSelector({ currentSize, onChange }: FontSizeSelectorProps) {
  const [size, setSize] = useState(currentSize);

  // 当外部currentSize变化时更新内部状态
  useEffect(() => {
    setSize(currentSize);
  }, [currentSize]);

  const handleDecrease = () => {
    let newSize: 'small' | 'medium' | 'large' = size;
    if (size === 'medium') {
      newSize = 'small';
    }
    if (size === 'large') {
      newSize = 'medium';
    }

    if (newSize !== size) {
      setSize(newSize);
      onChange(newSize);
    }
  };

  const handleIncrease = () => {
    let newSize: 'small' | 'medium' | 'large' = size;
    if (size === 'small') {
      newSize = 'medium';
    }
    if (size === 'medium') {
      newSize = 'large';
    }

    if (newSize !== size) {
      setSize(newSize);
      onChange(newSize);
    }
  };

  const getSizeText = () => {
    switch (size) {
      case 'small': return '小';
      case 'medium': return '中';
      case 'large': return '大';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        className="flex size-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-primary-600 disabled:text-gray-300 dark:hover:bg-gray-700"
        onClick={handleDecrease}
        disabled={size === 'small'}
        aria-label="减小字体"
        type="button"
      >
        <FontAwesomeIcon icon={faMinus} className="size-3" />
      </button>
      <span className="min-w-10 rounded bg-gray-100 px-2 py-1 text-center text-sm dark:bg-gray-700">{getSizeText()}</span>
      <button
        className="flex size-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-primary-600 disabled:text-gray-300 dark:hover:bg-gray-700"
        onClick={handleIncrease}
        disabled={size === 'large'}
        aria-label="增大字体"
        type="button"
      >
        <FontAwesomeIcon icon={faPlus} className="size-3" />
      </button>
    </div>
  );
}
