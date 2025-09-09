'use client';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslations } from 'next-intl';

import { useColorTheme, type ColorTheme } from '@/contexts/color-theme-context';

interface ColorThemeSelectorProps {
  onChange?: (theme: ColorTheme) => void;
}

export default function ColorThemeSelector({ onChange }: ColorThemeSelectorProps) {
  const { colorTheme, setColorTheme, availableThemes } = useColorTheme();
  const t = useTranslations('Settings');

  const handleThemeChange = (newTheme: ColorTheme) => {
    setColorTheme(newTheme);
    if (onChange) {
      onChange(newTheme);
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {t('color_theme')}
      </h4>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {availableThemes.map((theme) => {
          const isSelected = colorTheme === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              className={`group relative rounded-lg border-2 p-3 text-left transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20'
                  : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
              }`}
              onClick={() => handleThemeChange(theme.id)}
              aria-label={`${t('color_theme')} - ${t(`color_themes.${theme.nameKey}`)}`}
            >
              {/* 颜色预览 */}
              <div className="mb-2 flex space-x-1">
                <div
                  className="size-4 rounded-full"
                  style={{ backgroundColor: theme.primaryColor }}
                />
                <div
                  className="size-4 rounded-full"
                  style={{ backgroundColor: theme.secondaryColor }}
                />
              </div>
              
              {/* 主题名称 */}
              <div className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                {t(`color_themes.${theme.nameKey}`)}
              </div>
              
              {/* 主题描述 */}
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t(`color_themes.${theme.descriptionKey}`)}
              </div>
              
              {/* 选中状态指示器 */}
              {isSelected && (
                <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg">
                  <FontAwesomeIcon icon={faCheck} className="size-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
