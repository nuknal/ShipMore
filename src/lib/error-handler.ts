'use client';

import { toast } from 'react-toastify';

type ErrorOptions = {
  showToast?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
};

// 默认选项
const defaultOptions: ErrorOptions = {
  showToast: true,
  logError: true,
  fallbackMessage: 'errors.general.unknown_error',
};

// 解析错误消息
export function handleErrorWithTranslation(error: any, t: any, options: ErrorOptions = {}) {
  const opts = { ...defaultOptions, ...options };
  let errorMessage = '';

  // 记录错误
  if (opts.logError) {
    console.error('Error occurred:', error);
  }

  // 解析错误消息
  if (typeof error === 'string') {
    // 直接使用字符串错误
    errorMessage = error;
  } else if (error?.error && typeof error.error === 'string') {
    // API 返回的错误格式 { error: 'errors.something' }
    errorMessage = error.error;
  } else if (error?.message && typeof error.message === 'string') {
    // 标准 Error 对象
    errorMessage = error.message;
  } else {
    // 回退到默认错误
    errorMessage = opts.fallbackMessage || 'errors.general.unknown_error';
  }

  // 检查是否是翻译键
  const isTranslationKey = errorMessage.startsWith('errors.');

  // 获取翻译后的消息
  let translatedMessage = errorMessage;
  if (isTranslationKey && t) {
    try {
      // 移除 'errors.' 前缀
      const errorPath = errorMessage.substring(7);
      translatedMessage = t(errorPath) || errorMessage;
    } catch (e) {
      console.warn('Error translating message:', e);
      translatedMessage = errorMessage;
    }
  }

  // 显示提示
  if (opts.showToast) {
    toast.error(translatedMessage);
  }

  return {
    originalError: error,
    message: errorMessage,
    translatedMessage,
  };
}
