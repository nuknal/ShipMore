'use client';

import React, { createContext, use, useEffect, useState } from 'react';

export type ColorTheme = 'coral' | 'blue' | 'green' | 'purple' | 'orange' | 'rose' | 'teal' | 'neutral';

type ColorThemeContextType = {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  availableThemes: Array<{
    id: ColorTheme;
    nameKey: string;
    descriptionKey: string;
    primaryColor: string;
    secondaryColor: string;
  }>;
};

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const availableThemes = [
  {
    id: 'coral' as ColorTheme,
    nameKey: 'coral',
    descriptionKey: 'coral_description',
    primaryColor: '#CE796B',
    secondaryColor: '#C18C5D',
  },
  {
    id: 'blue' as ColorTheme,
    nameKey: 'blue',
    descriptionKey: 'blue_description',
    primaryColor: '#0EA5E9',
    secondaryColor: '#38BDF8',
  },
  {
    id: 'green' as ColorTheme,
    nameKey: 'green',
    descriptionKey: 'green_description',
    primaryColor: '#22C55E',
    secondaryColor: '#4ADE80',
  },
  {
    id: 'purple' as ColorTheme,
    nameKey: 'purple',
    descriptionKey: 'purple_description',
    primaryColor: '#A855F7',
    secondaryColor: '#C084FC',
  },
  {
    id: 'orange' as ColorTheme,
    nameKey: 'orange',
    descriptionKey: 'orange_description',
    primaryColor: '#F97316',
    secondaryColor: '#FB923C',
  },
  {
    id: 'rose' as ColorTheme,
    nameKey: 'rose',
    descriptionKey: 'rose_description',
    primaryColor: '#F43F5E',
    secondaryColor: '#FB7185',
  },
  {
    id: 'teal' as ColorTheme,
    nameKey: 'teal',
    descriptionKey: 'teal_description',
    primaryColor: '#14B8A6',
    secondaryColor: '#2DD4BF',
  },
  {
    id: 'neutral' as ColorTheme,
    nameKey: 'neutral',
    descriptionKey: 'neutral_description',
    primaryColor: '#737373',
    secondaryColor: '#A3A3A3',
  },
];

type ColorThemeProviderProps = {
  children: React.ReactNode;
};

export function ColorThemeProvider({ children }: ColorThemeProviderProps) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('coral');
  const [mounted, setMounted] = useState(false);

  // 初始化主题
  useEffect(() => {
    const storedTheme = localStorage.getItem('color-theme') as ColorTheme | null;
    if (storedTheme && availableThemes.some(theme => theme.id === storedTheme)) {
      setColorTheme(storedTheme);
    }
    setMounted(true);
  }, []);

  // 应用主题到 DOM
  useEffect(() => {
    if (!mounted) {
      return;
    }

    // 移除所有主题类
    const root = document.documentElement;
    availableThemes.forEach((_theme) => {
      root.removeAttribute(`data-color-theme`);
    });

    // 应用当前主题
    if (colorTheme !== 'coral') {
      root.setAttribute('data-color-theme', colorTheme);
    }

    // 保存到 localStorage
    localStorage.setItem('color-theme', colorTheme);
  }, [colorTheme, mounted]);

  const handleSetColorTheme = (theme: ColorTheme) => {
    setColorTheme(theme);
  };

  const contextValue: ColorThemeContextType = {
    colorTheme,
    setColorTheme: handleSetColorTheme,
    availableThemes,
  };

  return (
    <ColorThemeContext value={contextValue}>
      {children}
    </ColorThemeContext>
  );
}

export function useColorTheme() {
  const context = use(ColorThemeContext);
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
}
