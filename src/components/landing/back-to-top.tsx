'use client';

import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 初始检查滚动位置
  useLayoutEffect(() => {
    if (window && window.pageYOffset > 300) {
      setIsVisible(true);
    }
  }, []);

  // 监听滚动事件，当页面滚动超过300px时显示按钮
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // 点击按钮时滚动到页面顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant="default"
      size="icon"
      className={`fixed bottom-8 right-8 z-50 size-12 rounded-full bg-primary-600 shadow-lg transition-all duration-300 hover:bg-primary-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'
      }`}
      onClick={scrollToTop}
      aria-label="返回顶部"
    >
      <FontAwesomeIcon icon={faArrowUp} className="text-lg text-white" />
    </Button>
  );
}
