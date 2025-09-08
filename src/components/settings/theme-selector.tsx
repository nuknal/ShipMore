'use client';

import { faMagic, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type ThemeSelectorProps = {
  onChange?: (theme: 'light' | 'dark' | 'system') => void;
};

export default function ThemeSelector({ onChange }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 在组件挂载后再渲染，避免服务器端和客户端渲染不一致
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    if (onChange) {
      onChange(newTheme);
    }
  };

  if (!mounted) {
    return (
      <div className="flex space-x-2">
        <div className="size-8 rounded-full border border-gray-300 bg-white"></div>
        <div className="size-8 rounded-full border border-gray-300 bg-gray-800"></div>
        <div className="size-8 rounded-full border border-gray-300 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      <button
        type="button"
        className={`size-8 bg-white ${
          theme === 'light' ? 'border-primary-500' : 'border-gray-300'
        } flex items-center justify-center rounded-full`}
        onClick={() => handleThemeChange('light')}
        aria-label="light theme"
      >
        <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
      </button>
      <button
        type="button"
        className={`size-8 border bg-gray-800 ${
          theme === 'dark' ? 'border-primary-500' : 'border-gray-300'
        } flex items-center justify-center rounded-full`}
        onClick={() => handleThemeChange('dark')}
        aria-label="dark theme"
      >
        <FontAwesomeIcon icon={faMoon} className="text-gray-200" />
      </button>
      <button
        type="button"
        className={`size-8 border bg-gradient-to-r from-blue-500 to-purple-500 ${
          theme === 'system' ? 'border-primary-500' : 'border-gray-300'
        } flex items-center justify-center rounded-full`}
        onClick={() => handleThemeChange('system')}
        aria-label="follow system"
      >
        <FontAwesomeIcon icon={faMagic} className="text-white" />
      </button>
    </div>
  );
}
