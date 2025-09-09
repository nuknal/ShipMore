'use client';

import { faCrown, faGear, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { SettingsDropdown } from '@/components/landing/settings-dropdown';
import SettingsDialog from '@/components/settings/settings-dialog';
import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/navigation';

type SectionTabItem = {
  label: string;
  href: string;
  value: string;
};

function getBasePathname(pathname: string) {
  const base0 = pathname.split('/').slice(1).join('/');
  const base = pathname.split('/').slice(2).join('/');
  return base || base0 || '';
}

export default function AppAuthedHeader() {
  const t = useTranslations('Menu');
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems: SectionTabItem[] = [
    { label: t('home'), href: '/dashboard', value: 'dashboard' },
    { label: t('subscription'), href: '/subscription', value: 'subscription' },
  ];
  const basePath = getBasePathname(pathname);
  const isActive = (href: string) => {
    const baseHref = href.startsWith('/') ? href.substring(1) : href;
    return basePath === baseHref || basePath.startsWith(`${baseHref}/`);
  };

  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur dark:bg-gray-900/80">
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <div className="container mx-auto flex items-center justify-between">
          {/* 左侧：Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/shipmore.png" alt="ShipMore Logo" width={28} height={28} className="mr-2" />
              <h1 className="text-xl font-bold">
                <span className="text-primary-700 dark:text-primary-400">Ship</span>
                <span className="text-primary-500 dark:text-primary-300">More</span>
              </h1>
            </Link>
          </div>

          {/* 中间：导航菜单 */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.value}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* 右侧：设置、用户菜单 */}
          <div className="flex items-center space-x-3">
            {/* 设置下拉菜单 */}
            <SettingsDropdown />

            {session?.user
              ? (
                  <div className="relative" ref={menuRef}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="overflow-hidden rounded-full"
                      onClick={() => setMenuOpen(!menuOpen)}
                      aria-label="user menu"
                    >
                      {session.user.image
                        ? (
                            <Image src={session.user.image} alt={session.user.name || '用户头像'} className="size-8 rounded-full" width={32} height={32} />
                          )
                        : (
                            <div className="flex size-8 items-center justify-center rounded-full bg-gray-200">
                              <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                            </div>
                          )}
                    </Button>

                    {menuOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 dark:bg-gray-800 dark:ring-gray-700">
                        <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{session.user.name}</p>
                          <p className="truncate text-xs text-gray-500 dark:text-gray-400">{session.user.email}</p>
                        </div>
                        <Link
                          href="/subscription"
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          onClick={() => setMenuOpen(false)}
                        >
                          <FontAwesomeIcon icon={faCrown} className="mr-3 text-gray-400 dark:text-gray-500" />
                          {t('subscription')}
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setSettingsOpen(true);
                            setMenuOpen(false);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                          <FontAwesomeIcon icon={faGear} className="mr-3 text-gray-400 dark:text-gray-500" />
                          {t('settings')}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            signOut({ callbackUrl: '/' });
                            setMenuOpen(false);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                          <FontAwesomeIcon icon={faRightFromBracket} className="mr-3 text-gray-400 dark:text-gray-500" />
                          {t('signout')}
                        </button>
                      </div>
                    )}
                  </div>
                )
              : (
                  <Link href="/sign-in">
                    <Button variant="outline" size="sm">
                      {t('signin')}
                    </Button>
                  </Link>
                )}
          </div>
        </div>
      </div>

      {/* 设置弹窗 */}
      <SettingsDialog isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
