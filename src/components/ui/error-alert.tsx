'use client';

import { XCircle } from 'lucide-react';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from './alert';

type ErrorAlertProps = {
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
};

/**
 * 错误提示组件
 * 用于在界面中显示错误信息
 */
export function ErrorAlert({ title = 'Error', message, onClose, className }: ErrorAlertProps) {
  return (
    <Alert variant="error" className={className}>
      <XCircle className="size-4" />
      <AlertTitle variant="red">{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 inline-flex size-6 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-50"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <XCircle className="size-4" />
        </button>
      )}
    </Alert>
  );
}
