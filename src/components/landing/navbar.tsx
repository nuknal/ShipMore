'use client';

import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

import LanguageSwitcher from './language-switcher';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const t = useTranslations('Landing');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isSignedIn = status === 'authenticated';
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 获取Banner的高度
    const updateBannerHeight = () => {
      const bannerElement = document.querySelector('.top-banner');
      if (bannerElement) {
        setBannerHeight(bannerElement.clientHeight);
      } else {
        setBannerHeight(0); // 如果banner不存在，设置高度为0
      }
    };

    // 立即执行一次获取高度
    updateBannerHeight();

    // 使用MutationObserver监听DOM变化
    const observer = new MutationObserver((_mutations) => {
      updateBannerHeight();
    });

    // 监听body元素的子节点变化，因为banner可能会被添加或移除
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    // 监听resize事件更新高度
    const handleResize = () => {
      updateBannerHeight();
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: t('Features.badge'), href: '#features' },
    { name: t('HowItWorks.badge'), href: '#how-it-works' },
    { name: t('Testimonials.badge'), href: '#testimonials' },
    { name: t('Pricing.badge'), href: '#pricing' },
    { name: t('FAQ.badge'), href: '#faq' },
  ];

  return (
    <nav
      id="navbar"
      style={{ top: `${bannerHeight}px` }}
      className={`fixed z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md dark:bg-gray-900 dark:shadow-gray-900/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/knowone.svg"
              alt="ShipMore Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <p className="text-2xl font-bold">
              <span className="text-primary-700 dark:text-primary-500">Ship</span>
              <span className="text-primary-500 dark:text-primary-400">More</span>
              <span className="text-primary-300 dark:text-primary-300"></span>
            </p>
          </Link>

          {/* 桌面导航链接 */}
          <div className="hidden items-center space-x-10 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-semibold text-gray-800 transition-colors hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 桌面登录/注册按钮或用户头像 */}
          <div className="hidden items-center space-x-3 md:flex">
            <ThemeToggle />
            <LanguageSwitcher />
            {isSignedIn
              ? (
                  <div className="relative flex items-center" ref={userMenuRef}>
                    {/* <Button
                      variant="default"
                      className="mr-3 flex items-center bg-primary-600 px-4 py-2.5 text-base font-semibold text-white shadow-md hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
                      asChild
                    >
                      <Link href="/know">
                        <span>{t('NavBar.enterKnow')}</span>
                      </Link>
                    </Button> */}

                    <Link
                      href="/know"
                      className="overflow-hidden rounded-full"
                    >
                      {session?.user?.image
                        ? (
                            <Image
                              src={session.user.image}
                              alt={session.user.name || 'user avatar'}
                              className="size-8 rounded-full"
                              width={32}
                              height={32}
                            />
                          )
                        : (
                            <div className="flex size-8 items-center justify-center rounded-full bg-gray-200">
                              <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                            </div>
                          )}
                    </Link>
                  </div>
                )
              : (
                  <>
                    {/* <Button
                      variant="ghost"
                      className="px-5 py-2.5 text-base font-semibold text-gray-800 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-primary-400"
                      asChild
                    >
                      <Link href="/sign-in">{t('NavBar.signIn')}</Link>
                    </Button> */}
                    <Button
                      variant="default"
                      className="bg-primary-600 px-6 py-2.5 text-base font-semibold text-white shadow-md hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
                      asChild
                    >
                      <Link href="/sign-in">{t('NavBar.signIn')}</Link>
                    </Button>
                  </>
                )}
          </div>

          {/* 移动端菜单按钮和主题切换按钮 */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              type="button"
              className="rounded-lg p-2 text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800"
              onClick={toggleMobileMenu}
              aria-label="mobile-menu"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="text-xl"
              />
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="mt-2 rounded-lg bg-white p-5 shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30 md:hidden">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Button
                  key={link.name}
                  variant="ghost"
                  className="w-full justify-start py-3 text-base font-semibold text-gray-800 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary-400"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              ))}
              <div className="mt-2 flex flex-col space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                {isSignedIn
                  ? (
                      <>
                        <Button
                          variant="default"
                          className="flex w-full items-center justify-center bg-primary-600 px-4 py-3 text-base font-semibold text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
                          asChild
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Link href="/know">
                            <span>{t('NavBar.enterKnow')}</span>
                          </Link>
                        </Button>
                      </>
                    )
                  : (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-start py-3 text-base font-semibold text-gray-800 hover:bg-primary-50 hover:text-primary-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-primary-400"
                          asChild
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Link href="/sign-in">{t('NavBar.signIn')}</Link>
                        </Button>
                        <Button
                          variant="default"
                          className="w-full bg-primary-600 px-6 py-3 text-base font-semibold text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
                          asChild
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Link href="/sign-in">{t('NavBar.signUp')}</Link>
                        </Button>
                      </>
                    )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
