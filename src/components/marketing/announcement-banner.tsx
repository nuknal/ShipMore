'use client';

import type { ReactNode } from 'react';
import { BellRing, Clock, Gift, Tag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Banner } from '@/components/ui/banner';

type AnnouncementType = 'beta' | 'promo' | 'limited' | 'new_feature';

type AnnouncementBannerProps = {
  type?: AnnouncementType;
  message?: ReactNode;
  actionText?: string;
  onAction?: () => void;
  onClose?: () => void;
  expiresAt?: Date | null;
  showCountdown?: boolean;
};

/**
 * 营销公告横幅组件
 * 用于显示测试版通知、促销信息、限时优惠和新功能公告
 */
export function AnnouncementBanner({
  type = 'beta',
  message,
  actionText,
  onAction,
  onClose,
  expiresAt = null,
  showCountdown = false,
}: AnnouncementBannerProps) {
  const t = useTranslations('Marketing');
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  // 根据横幅类型获取默认消息（支持富文本）
  const getDefaultMessage = () => {
    switch (type) {
      case 'beta':
        return (
          <span className="text-gradient-animated">
            <span className="font-bold">
              🧪
              {' '}
              {t('beta_testing')}
            </span>
            {' '}
            {t('beta_message')}
          </span>
        );
      case 'promo':
        return (
          <span className="text-gradient-animated">
            <span className="font-bold">🎉 特别优惠：</span>
            {' '}
            {t('promo_message')}
          </span>
        );
      case 'limited':
        return (
          <span className="text-gradient-animated">
            <span className="font-bold">⏱️ 闪购：</span>
            {' '}
            {t('limited_message')}
          </span>
        );
      case 'new_feature':
        return (
          <span className="text-gradient-animated">
            <span className="font-bold">✨ 新功能：</span>
            {' '}
            {t('new_feature_message')}
          </span>
        );
      default:
        return '';
    }
  };

  // 根据横幅类型获取图标
  const getIcon = () => {
    switch (type) {
      case 'beta':
        return <BellRing className="size-4" />;
      case 'promo':
        return <Tag className="size-4" />;
      case 'limited':
        return <Clock className="size-4" />;
      case 'new_feature':
        return <Gift className="size-4" />;
      default:
        return <BellRing className="size-4" />;
    }
  };

  // 根据横幅类型获取样式变体
  const getVariant = () => {
    switch (type) {
      case 'beta':
        return 'primary';
      case 'promo':
        return 'success';
      case 'limited':
        return 'warning';
      case 'new_feature':
        return 'primary';
      default:
        return 'primary';
    }
  };

  // 计算剩余时间
  useEffect(() => {
    if (!expiresAt || !showCountdown) {
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = expiresAt.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return '';
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        return `${days}${t('days')} ${hours}${t('hours')}`;
      } else if (hours > 0) {
        return `${hours}${t('hours')} ${minutes}${t('minutes')}`;
      } else {
        return `${minutes}${t('minutes')}`;
      }
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // 每分钟更新一次

    return () => clearInterval(timer);
  }, [expiresAt, showCountdown, t]);

  // 检查是否已过期
  if (isExpired) {
    return null;
  }

  // 构建完整的消息
  const displayMessage = message || getDefaultMessage();

  // 处理倒计时信息
  const countdownInfo = showCountdown && timeLeft
    ? (
        <>
          {' · '}
          <span className="font-medium">{t('ends_in')}</span>
          {' '}
          <span className="font-bold text-red-500">{timeLeft}</span>
        </>
      )
    : null;

  return (
    <Banner
      message={(
        <>
          {displayMessage}
          {countdownInfo}
        </>
      )}
      variant={getVariant()}
      icon={getIcon()}
      action={
        actionText && onAction
          ? {
              text: t(actionText),
              onClick: onAction,
            }
          : undefined
      }
      onClose={onClose}
      sticky
    />
  );
}
