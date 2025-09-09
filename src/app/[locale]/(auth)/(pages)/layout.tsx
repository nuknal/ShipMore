import React from 'react';

import AppAuthedHeader from '@/components/app-authed-header';
import { AppSidebar } from '@/components/app-sidebar';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 可选：桌面隐藏的 Rail，移动端保留底部导航 */}
      <AppSidebar showDesktop={false} />

      {/* 合并后的顶栏 + 子导航 */}
      <AppAuthedHeader />

      {/* Main Content Area */}
      <main className="grow">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
