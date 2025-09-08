'use client';

import { useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import AuthForm from '@/components/auth/auth-form';
import { useRouter } from '@/i18n/navigation';
import { getI18nPath } from '@/utils/Helpers';

export default function SignUpPage() {
  const locale = useLocale();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(getI18nPath('/know', locale));
    }
  }, [status, router, locale]);

  if (status === 'loading') {
    return null; // 加载中不显示内容，避免闪烁
  }

  return <AuthForm mode="signup" locale={locale} />;
}
