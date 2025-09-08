'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { BackToTop } from '@/components/landing/back-to-top';
import { CTA } from '@/components/landing/cta';
import { FAQ } from '@/components/landing/faq';
import { Features } from '@/components/landing/features';
import { Footer } from '@/components/landing/footer';
import { Hero } from '@/components/landing/hero';
import { Navbar } from '@/components/landing/navbar';
import { Pricing } from '@/components/landing/pricing';
import { Testimonials } from '@/components/landing/testimonials';
import { AnnouncementManager } from '@/components/marketing/announcement-manager';

export default function LandingPage() {
  // 添加状态来跟踪横幅是否显示
  const [bannerHeight, setBannerHeight] = useState(0);
  const [showAnnouncementManager, setShowAnnouncementManager] = useState(true);

  // 使用 useCallback 包装 updateBannerHeight
  const updateBannerHeight = useCallback(() => {
    const bannerElement = document.querySelector('.top-banner');
    if (bannerElement) {
      setBannerHeight(bannerElement.clientHeight);
    } else {
      setBannerHeight(0); // 如果banner不存在，设置高度为0
    }
  }, []); // setBannerHeight 是稳定的，依赖数组可以为空

  // 监听横幅高度变化
  useEffect(() => {
    // 初始化获取banner高度
    const updateBannerHeightLocal = () => { // Rename local function to avoid conflict? No, useCallback moved it outside.
      updateBannerHeight(); // Call the memoized function
    };

    // 立即执行一次获取高度
    updateBannerHeightLocal(); // Call the local wrapper which calls the memoized one. No, just call directly.
    updateBannerHeight();

    // 使用MutationObserver监听DOM变化
    const observer = new MutationObserver((_mutations) => {
      updateBannerHeight(); // Call the memoized function
    });

    // 监听body元素的子节点变化，因为banner可能会被添加或移除
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    // 监听 resize 事件以更新高度
    const handleResize = () => {
      updateBannerHeight();
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [updateBannerHeight]); // 添加 updateBannerHeight 作为依赖项

  useEffect(() => {
    const handleScroll = () => {
      const navBar = document.getElementById('navbar');
      const isNavBarAtTop = navBar ? navBar.classList.contains('bg-white') || navBar.classList.contains('dark:bg-gray-900') : false;

      if (window.scrollY > 10 && isNavBarAtTop) { // landing 开始滚动且 NavBar 在顶部
        setShowAnnouncementManager(false);
      } else if (window.scrollY === 0) { // 回到页面最顶部
        setShowAnnouncementManager(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // 初始化时执行一次
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [bannerHeight]); // bannerHeight 变化时也需要重新评估

  // 定义通用的区块动画变体
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {showAnnouncementManager && <AnnouncementManager />}
      <div style={{ paddingTop: `${bannerHeight}px` }}>
        <Navbar />

        <main>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <Hero />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <Features />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <Testimonials />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <Pricing />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <FAQ />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <CTA />
          </motion.div>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}
