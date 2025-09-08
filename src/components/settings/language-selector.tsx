'use client';

// 导入更新设置的服务
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import supportedLangs from '@/i18n/lang'; // 确保这个路径是正确的
import { usePathname, useRouter } from '@/i18n/navigation';

// 定义语言及其国旗的数据结构
const languageOptions = supportedLangs.map((lang) => {
  if (lang === 'en') {
    return { code: 'en', name: 'English', flag: '🇺🇸' };
  }
  if (lang === 'zh') {
    return { code: 'zh', name: '简体中文', flag: '🇨🇳' };
  }
  // 可以为其他支持的语言添加更多 case
  return { code: lang, name: lang.toUpperCase(), flag: '🏳️' }; // 默认标志
});

type LanguageSelectorProps = {
  currentLanguage: string;
  // onChange 现在由 useRouter 处理，可以移除，或者用于其他副作用
  onChange?: (language: string) => void;
};

export default function LanguageSelector({ currentLanguage, onChange }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  let selectedLanguage = languageOptions.find(opt => opt.code === currentLanguage);
  if (!selectedLanguage) {
    // 如果 currentLanguage 无效或未找到，则默认显示英语或列表中的第一个
    // 确保 languageOptions 不为空，这在我们的情况下是成立的
    selectedLanguage = languageOptions.find(opt => opt.code === 'en') || languageOptions[0]!;
  }

  const handleLanguageChange = async (newLanguageCode: string) => {
    // 1. 设置 Cookie，供 next-intl 中间件使用
    //    `NEXT_LOCALE` 是 next-intl 常用的 Cookie 名称
    //    `path=/` 确保 Cookie 在整个站点可用
    //    `max-age` 设置 Cookie 的有效期 (例如一年，以秒为单位)
    //    `SameSite=Lax` 是一个推荐的安全设置
    const oneYearInSeconds = 365 * 24 * 60 * 60;
    document.cookie = `NEXT_LOCALE=${newLanguageCode};path=/;max-age=${oneYearInSeconds};SameSite=Lax`;

    // 2. 更新 localStorage (如果您的应用其他地方仍然需要它)
    //    您可以根据需要保留或移除这一行
    localStorage.setItem('i18nextLng', newLanguageCode);

    // 3. 更新路由，切换语言
    router.replace(pathname, { locale: newLanguageCode });

    if (onChange) {
      onChange(newLanguageCode);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          size="sm"
        >
          <span className="mr-2">{selectedLanguage.flag}</span>
          {selectedLanguage.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        {languageOptions.map(option => (
          <DropdownMenuItem
            key={option.code}
            onClick={() => handleLanguageChange(option.code)}
            className={`flex items-center ${
              currentLanguage === option.code
                ? 'bg-white dark:bg-gray-700'
                : 'dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{option.flag}</span>
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
