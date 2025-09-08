'use client';

import AOS from 'aos';

import { useEffect } from 'react';
import 'aos/dist/aos.css';

export function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 确保 AOS 只初始化一次
    if (typeof window !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
        offset: 50,
        delay: 0,
        mirror: false,
      });
    }

    // 添加窗口大小变化监听，以便在窗口大小变化时刷新 AOS
    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{children}</>;
}
