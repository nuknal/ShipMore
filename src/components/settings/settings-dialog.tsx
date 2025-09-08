'use client';

import type { Settings } from '@/types/settings';

import { faGear, faInfoCircle, faShieldAlt, faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import FontSizeSelector from '@/components/settings/font-size-selector';
import LanguageSelector from '@/components/settings/language-selector';
import ThemeSelector from '@/components/settings/theme-selector';
import ToggleSwitch from '@/components/settings/toggle-switch';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { usePathname, useRouter } from '@/i18n/navigation';
import { getUserSettings, updateUserSettings } from '@/services/settings';

type SettingsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    language: 'en',
    fontSize: 'medium',
    notificationEnabled: true,
    saveAnalysisHistory: true,
    saveChatHistory: true,
    allowDataCollection: true,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'general' | 'privacy' | 'about'>('general');
  const t = useTranslations('Settings');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      fetchSettings();
    }
  }, [isOpen]);

  async function fetchSettings() {
    setLoading(true);

    const response = await getUserSettings();
    if (response.data) {
      setSettings(response.data);
    } else {
      console.error(response.error || '获取设置失败');
    }

    setLoading(false);
  }

  const handleSettingChange = async <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);

    const response = await updateUserSettings({ [key]: value });
    if (!response.success) {
      // 如果更新失败，回滚设置
      setSettings(settings);
    } else {
      // 如果是语言设置更改，立即切换语言
      if (key === 'language' && typeof value === 'string') {
        // 使用 next-intl 的路由器切换语言
        router.replace(pathname, { locale: value });
      }
    }
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
        <DialogContent className="fixed inset-0 m-auto flex h-auto max-h-[90vh] w-[95vw] max-w-[90vw] items-center justify-center bg-white p-0 dark:bg-gray-900 sm:h-[550px] sm:min-w-[700px] md:min-w-[800px] lg:min-w-[900px]">
          <DialogTitle className="sr-only">{t('title')}</DialogTitle>
          <div className="size-12 animate-spin rounded-full border-y-2 border-primary-500"></div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="fixed inset-0 m-auto h-auto max-h-[90vh] w-[95vw] max-w-[90vw] overflow-hidden bg-white p-0 dark:bg-gray-900 sm:h-[550px] sm:min-w-[700px] md:min-w-[800px] lg:min-w-[900px]">
        <DialogTitle className="sr-only">{t('title')}</DialogTitle>
        <div className="flex h-full flex-col sm:flex-row">
          <div className="border-b border-gray-200 bg-gray-100 p-0 dark:border-gray-700 dark:bg-gray-800 sm:w-1/4 sm:border-b-0 sm:border-r">
            <div className="flex items-center justify-center border-b border-gray-200 p-4 dark:border-gray-700">
              <FontAwesomeIcon icon={faGear} className="mr-2 text-primary-500" />
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('title')}</h2>
            </div>
            <div className="flex flex-row sm:flex-col">
              <button
                type="button"
                className={`flex flex-1 items-center justify-center px-4 py-3 text-gray-700 dark:text-gray-300 sm:justify-start ${
                  activeTab === 'general'
                    ? 'border-b-2 border-primary-500 bg-white dark:border-primary-400 dark:bg-gray-700 sm:border-b-0 sm:border-l-4 sm:bg-white sm:dark:bg-gray-700'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('general')}
              >
                <FontAwesomeIcon icon={faSliders} className="mr-0 size-4 sm:mr-3" />
                <span className="hidden sm:inline">{t('general')}</span>
                <span className="sm:hidden">{t('general')}</span>
              </button>
              <button
                type="button"
                className={`flex flex-1 items-center justify-center px-4 py-3 text-gray-700 dark:text-gray-300 sm:justify-start ${
                  activeTab === 'privacy'
                    ? 'border-b-2 border-primary-500 bg-white dark:border-primary-400 dark:bg-gray-700 sm:border-b-0 sm:border-l-4 sm:bg-white sm:dark:bg-gray-700'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('privacy')}
              >
                <FontAwesomeIcon icon={faShieldAlt} className="mr-0 size-4 sm:mr-3" />
                <span className="hidden sm:inline">{t('privacy_settings')}</span>
                <span className="sm:hidden">{t('privacy_settings')}</span>
              </button>
              <button
                type="button"
                className={`flex flex-1 items-center justify-center px-4 py-3 text-gray-700 dark:text-gray-300 sm:justify-start ${
                  activeTab === 'about'
                    ? 'border-b-2 border-primary-500 bg-white dark:border-primary-400 dark:bg-gray-700 sm:border-b-0 sm:border-l-4 sm:bg-white sm:dark:bg-gray-700'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('about')}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-0 size-4 sm:mr-3" />
                <span className="hidden sm:inline">{t('about')}</span>
                <span className="sm:hidden">{t('about')}</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white p-4 dark:bg-gray-900 sm:w-3/4 sm:p-8">
            {activeTab === 'general' && (
              <div className="mx-auto max-w-3xl space-y-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">{t('application_settings')}</h3>

                <div className="flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-3 sm:mb-0 sm:pr-8">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{t('language')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('language_description')}</p>
                  </div>
                  <LanguageSelector
                    currentLanguage={settings.language}
                    onChange={value => handleSettingChange('language', value)}
                  />
                </div>

                <div className="flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-3 sm:mb-0 sm:pr-8">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{t('theme')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('theme_description')}</p>
                  </div>
                  <ThemeSelector
                    onChange={value => handleSettingChange('theme', value)}
                  />
                </div>

                <div className="flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-3 sm:mb-0 sm:pr-8">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{t('font_size')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('font_size_description')}</p>
                  </div>
                  <FontSizeSelector
                    currentSize={settings.fontSize}
                    onChange={value => handleSettingChange('fontSize', value)}
                  />
                </div>

                <div className="flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-3 sm:mb-0 sm:pr-8">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{t('notification')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('notification_description')}</p>
                  </div>
                  <ToggleSwitch
                    id="notification-toggle"
                    checked={settings.notificationEnabled}
                    onChange={value => handleSettingChange('notificationEnabled', value)}
                  />
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="mx-auto max-w-3xl space-y-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">{t('privacy_settings')}</h3>

                <div className="flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-3 sm:mb-0 sm:pr-8">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{t('save_analysis_history')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('save_analysis_history_description')}</p>
                  </div>
                  <ToggleSwitch
                    id="analysis-history-toggle"
                    checked={settings.saveAnalysisHistory}
                    onChange={value => handleSettingChange('saveAnalysisHistory', value)}
                  />
                </div>

                <div className="flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-3 sm:mb-0 sm:pr-8">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{t('save_chat_history')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('save_chat_history_description')}</p>
                  </div>
                  <ToggleSwitch
                    id="chat-history-toggle"
                    checked={settings.saveChatHistory}
                    onChange={value => handleSettingChange('saveChatHistory', value)}
                  />
                </div>

                <div className="flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0 sm:pr-8">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{t('data_collection')}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('data_collection_description')}</p>
                  </div>
                  <ToggleSwitch
                    id="data-toggle"
                    checked={settings.allowDataCollection}
                    onChange={value => handleSettingChange('allowDataCollection', value)}
                  />
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="mx-auto max-w-3xl space-y-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">{t('about')}</h3>

                <div className="flex flex-col border-b border-gray-200 py-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0 sm:pr-8">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{t('version')}</h3>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">1.0.0</span>
                </div>

                <div className="flex flex-col border-b border-gray-200 py-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0 sm:pr-8">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{t('contact_us')}</h3>
                  </div>
                  <a href="mailto:support@knowone.ai" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">support@knowone.ai</a>
                </div>

                <div className="flex flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0 sm:pr-8">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{t('service_terms')}</h3>
                  </div>
                  <button type="button" className="flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                    <span>{t('view')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
