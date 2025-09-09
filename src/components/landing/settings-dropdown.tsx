'use client';

import { faGear, faGlobe, faLightbulb, faMoon, faPalette, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useColorTheme } from '@/contexts/color-theme-context';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { usePathname, useRouter } from '@/i18n/navigation';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme, availableThemes } = useColorTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Settings');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  const handleColorThemeChange = (newColorTheme: typeof colorTheme) => {
    setColorTheme(newColorTheme);
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="flex size-9 items-center justify-center rounded-full p-0 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <FontAwesomeIcon icon={faGear} className="size-5" />
      </Button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="flex size-9 items-center justify-center rounded-full p-0 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        aria-label={t('title')}
      >
        <FontAwesomeIcon icon={faGear} className="size-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {/* 主题设置 */}
          <div className="mb-4">
            <div className="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-gray-100">
              <FontAwesomeIcon icon={faLightbulb} className="mr-2 size-4" />
              {t('theme_mode')}
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className={`flex flex-1 items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors ${
                  theme === 'light'
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/20 dark:text-primary-400'
                    : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleThemeChange('light')}
              >
                <FontAwesomeIcon icon={faSun} className="mr-2 size-4" />
                {t('light_theme')}
              </button>
              <button
                type="button"
                className={`flex flex-1 items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors ${
                  theme === 'dark'
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/20 dark:text-primary-400'
                    : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleThemeChange('dark')}
              >
                <FontAwesomeIcon icon={faMoon} className="mr-2 size-4" />
                {t('dark_theme')}
              </button>
              <button
                type="button"
                className={`flex flex-1 items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors ${
                  theme === 'system'
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/20 dark:text-primary-400'
                    : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleThemeChange('system')}
              >
                <FontAwesomeIcon icon={faGear} className="mr-2 size-4" />
                {t('system_theme')}
              </button>
            </div>
          </div>

          {/* 颜色主题设置 */}
          <div className="mb-4">
            <div className="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-gray-100">
              <FontAwesomeIcon icon={faPalette} className="mr-2 size-4" />
              {t('color_theme')}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {availableThemes.map((themeOption) => {
                const isSelected = colorTheme === themeOption.id;
                return (
                  <button
                    key={themeOption.id}
                    type="button"
                    className={`group relative rounded-md border p-2 text-left transition-all duration-200 hover:scale-105 ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20'
                        : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500'
                    }`}
                    onClick={() => handleColorThemeChange(themeOption.id)}
                    title={t(`color_themes.${themeOption.descriptionKey}`)}
                  >
                    {/* 颜色预览 */}
                    <div className="mb-1 flex space-x-1">
                      <div
                        className="size-3 rounded-full"
                        style={{ backgroundColor: themeOption.primaryColor }}
                      />
                      <div
                        className="size-3 rounded-full"
                        style={{ backgroundColor: themeOption.secondaryColor }}
                      />
                    </div>

                    {/* 主题名称 */}
                    <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
                      {t(`color_themes.${themeOption.nameKey}`)}
                    </div>

                    {/* 选中状态指示器 */}
                    {isSelected && (
                      <div className="absolute -right-1 -top-1 size-4 rounded-full bg-primary-500"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 语言设置 */}
          <div>
            <div className="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-gray-100">
              <FontAwesomeIcon icon={faGlobe} className="mr-2 size-4" />
              {t('language')}
            </div>
            <div className="flex space-x-2">
              {languages.map((lang) => {
                const isSelected = locale === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    className={`flex flex-1 items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/20 dark:text-primary-400'
                        : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
