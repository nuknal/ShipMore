import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { getI18nPath } from '@/utils/Helpers';

type AuthFormProps = {
  mode: 'signin' | 'signup';
  locale: string;
};

export default function AuthForm({ mode, locale }: AuthFormProps) {
  const isSignIn = mode === 'signin';
  const t = useTranslations('Auth');

  const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [email, setEmail] = useState('');
  // const [token, setToken] = useState<string | null>(null);
  // const { theme } = useTheme();

  const handleSocialAuth = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: getI18nPath('/know', locale),
      });
    } catch (error) {
      console.error(isSignIn ? 'signin failed:' : 'signup failed:', error);
      setError(isSignIn ? t('signin.login_failed') : t('signup.signup_failed'));
    } finally {
      setIsLoading(false);
    }
  };

  // // 处理 Turnstile 验证完成
  // const handleTurnstileSuccess = async (token: string) => {
  //   const res = await fetch('/api/verify/turnstile', {
  //     method: 'POST',
  //     body: JSON.stringify({ token }),
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   });

  //   const data = await res.json();
  //   if (data.success) {
  //     setToken(token);
  //   } else {
  //     setToken(null);
  //   }
  // };

  // // 处理 Turnstile 验证过期
  // const handleTurnstileExpire = () => {
  //   console.log('Turnstile verification expired', token);
  //   setToken(null);
  // };

  // // 处理 Turnstile 验证错误
  // const handleTurnstileError = () => {
  //   console.log('Turnstile verification error');
  //   setToken(null);
  // };

  // const handleEmailLinkAuth = async () => {
  //   setIsLoading(true);
  //   setError('');
  //   setSuccess('');

  //   if (!email) {
  //     setError(t('signup.email_required'));
  //     setIsLoading(false);
  //     return;
  //   }

  //   if (!token) {
  //     setError(t('signup.turnstile_required'));
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     // 使用 email provider 发送登录链接
  //     const result = await signIn('email', {
  //       email,
  //       redirect: false,
  //       callbackUrl: getI18nPath('/know', locale),
  //     });

  //     if (result?.error) {
  //       setError(result.error);
  //     } else {
  //       // 显示成功消息
  //       setSuccess(t('signin.check_email'));
  //     }
  //   } catch (error) {
  //     console.error('email link signin failed:', error);
  //     setError(t('signin.email_link_failed'));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full min-w-[380px] max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800 sm:min-w-[380px]">
        <div>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/knowone.svg"
              alt="KnowOne AI Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <h1 className="text-2xl font-bold">
              <span className="text-primary-700 dark:text-primary-500">Know</span>
              <span className="text-primary-500 dark:text-primary-400">One</span>
              <span className="text-primary-300 dark:text-primary-300"> AI</span>
            </h1>
          </Link>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {isSignIn ? t('signin.subtitle') : t('signup.subtitle')}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
            <div className="flex">
              <div className="text-sm text-red-700 dark:text-red-200">
                {error}
              </div>
            </div>
          </div>
        )}

        {/* {success && (
          <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/30">
            <div className="flex">
              <div className="text-sm text-green-700 dark:text-green-200">
                {success}
              </div>
            </div>
          </div>
        )} */}

        <div className="mt-4 space-y-4">

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialAuth('github')}
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <Image src="/logos/github.svg" alt="GitHub Logo" width={20} height={20} className="mr-2" />
              {isSignIn ? t('signin.github_signin') : t('signup.github_signup')}
            </button>

            <button
              type="button"
              onClick={() => handleSocialAuth('google')}
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <Image src="/logos/google.svg" alt="Google Logo" width={20} height={20} className="mr-2" />
              {isSignIn ? t('signin.google_signin') : t('signup.google_signup')}
            </button>

            {/* <button
              type="button"
              onClick={() => handleSocialAuth('apple')}
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <Image src="/logos/apple.svg" alt="Apple Logo" width={20} height={20} className="mr-2" />
              {isSignIn ? t('signin.apple_signin') : t('signup.apple_signup')}
            </button> */}
            {/*
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">{t('signin.or')}</span>
              </div>
            </div>

            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faEnvelope} className="size-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete={isSignIn ? 'email' : 'new-email'}
                required
                className="block w-full rounded-md border border-gray-300 py-2.5 pl-10 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                placeholder={t('signup.email_placeholder')}
              />
            </div>

            <button
              type="button"
              onClick={handleEmailLinkAuth}
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-70 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              {isSignIn ? t('signin.email_link_signin') : t('signup.email_link_signup')}
            </button>
            */}
            {/* <div className="mt-2 flex w-full">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={handleTurnstileSuccess}
                onError={handleTurnstileError}
                onExpire={handleTurnstileExpire}
                options={{
                  theme: theme === 'dark' ? 'dark' : 'light',
                  size: 'flexible',
                  appearance: 'always',
                }}
              />
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
}
