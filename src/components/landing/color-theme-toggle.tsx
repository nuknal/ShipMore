'use client';

import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useColorTheme } from '@/contexts/color-theme-context';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export function ColorThemeToggle() {
  const { colorTheme, setColorTheme, availableThemes } = useColorTheme();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Settings');

  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="flex size-9 items-center justify-center rounded-full p-0 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        aria-label={t('color_theme')}
      >
        <FontAwesomeIcon icon={faPalette} className="size-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            {t('color_theme')}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {availableThemes.map((theme) => {
              const isSelected = colorTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  className={`group relative rounded-md border p-2 text-left transition-all duration-200 hover:scale-105 ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20'
                      : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500'
                  }`}
                  onClick={() => {
                    setColorTheme(theme.id);
                    setIsOpen(false);
                  }}
                  aria-label={`${t('color_theme')} - ${t(`color_themes.${theme.nameKey}`)}`}
                >
                  {/* 颜色预览 */}
                  <div className="mb-1 flex space-x-1">
                    <div
                      className="size-3 rounded-full"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <div
                      className="size-3 rounded-full"
                      style={{ backgroundColor: theme.secondaryColor }}
                    />
                  </div>

                  {/* 主题名称 */}
                  <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {t(`color_themes.${theme.nameKey}`)}
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
      )}
    </div>
  );
}
