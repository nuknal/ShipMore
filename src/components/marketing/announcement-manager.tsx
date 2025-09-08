'use client';

import { useEffect, useState } from 'react';
import { AnnouncementBanner } from './announcement-banner';

type AnnouncementConfig = {
  type: 'beta' | 'promo' | 'limited' | 'new_feature';
  message?: string;
  actionText?: string;
  actionUrl?: string;
  expiresAt?: string; // ISO 日期字符串
  startAt?: string; // ISO 日期字符串
  showCountdown?: boolean;
  id: string;
};

/**
 * 公告管理器组件
 * 负责根据时间、用户状态等条件显示适当的公告横幅
 */
export function AnnouncementManager() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState<AnnouncementConfig | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  // 模拟从配置或API获取公告
  const announcements: AnnouncementConfig[] = [
    {
      id: 'beta-2025-05-12',
      type: 'beta',
      // 如果不设置message，将使用i18n中的默认消息
      actionText: 'feedback',
      actionUrl: 'mailto:support@shipmore.xyz',
      // 不设置过期时间则一直显示
      expiresAt: '2025-07-31',
    },
  ];

  useEffect(() => {
    // 从本地存储加载已关闭的公告
    try {
      const saved = localStorage.getItem('dismissed_announcements');
      if (saved) {
        setDismissed(new Set(JSON.parse(saved)));
      }
    } catch (e) {
      console.error('Failed to load dismissed announcements', e);
    }
  }, []);

  useEffect(() => {
    // 筛选有效的公告
    const now = new Date();
    const validAnnouncements = announcements.filter((announcement) => {
      // 检查是否已被用户关闭
      // if (dismissed.has(announcement.id)) {
      //   return false;
      // }

      // 检查开始时间
      if (announcement.startAt && new Date(announcement.startAt) > now) {
        return false;
      }

      // 检查过期时间
      if (announcement.expiresAt && new Date(announcement.expiresAt) < now) {
        return false;
      }

      return true;
    });

    // 选择优先级最高的公告 (这里采用数组顺序作为优先级)
    setCurrentAnnouncement(validAnnouncements[0] || null);
  }, [dismissed]);

  const handleDismiss = () => {
    if (!currentAnnouncement) {
      return;
    }

    // 将当前公告ID添加到已关闭集合
    const newDismissed = new Set(dismissed);
    newDismissed.add(currentAnnouncement.id);
    setDismissed(newDismissed);

    // 保存到本地存储
    try {
      localStorage.setItem(
        'dismissed_announcements',
        JSON.stringify(Array.from(newDismissed)),
      );
    } catch (e) {
      console.error('Failed to save dismissed announcements', e);
    }
  };

  const handleAction = () => {
    if (currentAnnouncement?.actionUrl) {
      window.location.href = currentAnnouncement.actionUrl;
    }
  };

  if (!currentAnnouncement) {
    return null;
  }

  return (
    <AnnouncementBanner
      type={currentAnnouncement.type}
      message={currentAnnouncement.message}
      actionText={currentAnnouncement.actionText}
      onAction={handleAction}
      onClose={handleDismiss}
      expiresAt={currentAnnouncement.expiresAt ? new Date(currentAnnouncement.expiresAt) : null}
      showCountdown={currentAnnouncement.showCountdown}
    />
  );
}
