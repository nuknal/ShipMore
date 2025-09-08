'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { handleErrorWithTranslation } from '@/lib/error-handler';

export type ErrorState = {
  hasError: boolean;
  errorMessage: string;
  originalError: any;
};

export type ErrorHandlerOptions = {
  showToast?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
};

/**
 * 错误处理钩子
 * 用于在组件中处理错误并显示错误消息
 */
export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    errorMessage: '',
    originalError: null,
  });

  // 获取翻译函数
  const t = useTranslations('errors');

  // 处理错误
  const handleError = (error: any, options: ErrorHandlerOptions = {}) => {
    const result = handleErrorWithTranslation(error, t, options);

    setErrorState({
      hasError: true,
      errorMessage: result.translatedMessage,
      originalError: result.originalError,
    });

    return result;
  };

  // 清除错误
  const clearError = () => {
    setErrorState({
      hasError: false,
      errorMessage: '',
      originalError: null,
    });
  };

  return {
    errorState,
    handleError,
    clearError,
    t,
  };
}
