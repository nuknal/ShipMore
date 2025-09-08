'use client';
import type { ReactNode } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

export default function ToastProviders({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
}
