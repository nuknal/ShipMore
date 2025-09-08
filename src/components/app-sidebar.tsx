'use client';

import {
  faCreditCard,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@/i18n/navigation';

export function AppSidebar() {
  const t = useTranslations('Menu');
  const pathname = usePathname();

  // 导航菜单项
  const menuItems = [
    { icon: faHome, label: t('home'), href: '/dashboard' },
    { icon: faCreditCard, label: t('subscription'), href: '/subscription' },
  ];

  // 检查路径是否匹配
  const isActive = (href: string) => {
    // 处理多语言路径，提取基本路径进行比较
    const basePathname0 = pathname.split('/').slice(1).join('/');
    const basePathname = pathname.split('/').slice(2).join('/');
    const baseHref = href.startsWith('/') ? href.substring(1) : href;
    return `/${basePathname}` === href || basePathname === baseHref || `/${basePathname0}` === href || basePathname0 === baseHref;
  };

  return (
    <TooltipProvider>
      {/* 桌面端侧边菜单 */}
      <div className="fixed left-6 top-1/2 z-10 hidden w-auto -translate-y-1/2 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 md:block">
        <div className="flex flex-col justify-start space-y-4 p-3">
          {menuItems.map((item, index) => {
            const active = isActive(item.href);
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center rounded-full p-2 transition-colors ${
                      active
                        ? 'bg-primary-50 font-medium text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-primary-900/20 dark:hover:text-primary-400'
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className={`size-5 ${active ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="dark:bg-gray-700 dark:text-gray-100">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* 移动端底部菜单 */}
      <div className="fixed inset-x-0 bottom-0 z-10 block w-full border-t border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 md:hidden">
        <div className="flex justify-around p-2">
          {menuItems.map((item, index) => {
            const active = isActive(item.href);
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex flex-col items-center justify-center p-2 transition-colors ${
                  active
                    ? 'font-medium text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className={`mb-1 size-5 ${active ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
