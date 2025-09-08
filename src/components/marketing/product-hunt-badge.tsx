import Image from 'next/image';
import React from 'react';

import { Link } from '@/i18n/navigation';

type ProductHuntBadgeProps = {
  postId: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  theme?: 'light' | 'dark';
};

export function ProductHuntBadge({
  postId,
  size = 'small',
  className = '',
  theme,
}: ProductHuntBadgeProps) {
  // 尺寸配置
  const sizeConfig = {
    small: { width: 160, height: 43 },
    medium: { width: 250, height: 54 },
    large: { width: 300, height: 65 },
  };

  const { width, height } = sizeConfig[size];

  // ProductHunt badge URL - 使用固定时间戳以保证一致性
  const badgeUrl = `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${postId}&theme=${theme}&t=1754106231958`;

  // ProductHunt 产品页面 URL - 更新为正确的products路径
  const productUrl = `https://www.producthunt.com/products/knowone-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-knowone-ai`;

  return (
    <div className={`inline-block ${className}`}>
      <Link
        href={productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-lg"
        aria-label="KnowOne.AI featured on Product Hunt"
      >
        <Image
          src={badgeUrl}
          alt="KnowOne.AI - Understand More & Respond Smarter | Product Hunt"
          width={width}
          height={height}
          unoptimized
        />
      </Link>
    </div>
  );
}
