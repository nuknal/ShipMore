'use client';

import AOS from 'aos';

import React, { useEffect } from 'react';
import 'aos/dist/aos.css';

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  // 初始化 AOS 动画库
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return <>{children}</>;
}
