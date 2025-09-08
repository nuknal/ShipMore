import React from 'react';

import { AppFooter } from '@/components/app-footer';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <AppHeader />

      {/* Sidebar Menu */}
      <AppSidebar />

      {/* Main Content Area */}
      <main className="grow py-16 md:pb-6">
        {children}
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
