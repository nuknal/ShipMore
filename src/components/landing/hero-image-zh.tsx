'use client';

import React from 'react';

interface HeroImageZhProps {
  className?: string;
}

export function HeroImageZh({ className }: HeroImageZhProps) {
  return (
    <svg 
      width="600" 
      height="500" 
      viewBox="0 0 600 500" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="600" height="500" fill="none" />

      {/* 手机框架 */}
      <rect 
        x="150" 
        y="50" 
        width="300" 
        height="400" 
        rx="20" 
        fill="white" 
        stroke="hsl(var(--primary-300))" 
        strokeWidth="10" 
        className="dark:fill-gray-800"
      />

      {/* 屏幕内容 */}
      <rect 
        x="170" 
        y="80" 
        width="260" 
        height="340" 
        rx="10" 
        fill="hsl(var(--primary-50))" 
        className="dark:fill-gray-900"
      />

      {/* 应用标题栏 */}
      <rect 
        x="170" 
        y="80" 
        width="260" 
        height="50" 
        rx="10" 
        fill="hsl(var(--primary-600))"
      />
      <text 
        x="300" 
        y="110" 
        fontFamily="Arial, 'Noto Sans SC', sans-serif" 
        fontSize="20" 
        fill="white" 
        textAnchor="middle"
      >
        快船模板
      </text>

      {/* 用户头像和信息 */}
      <circle 
        cx="220" 
        cy="170" 
        r="30" 
        fill="hsl(var(--primary-700))"
      />
      <rect 
        x="270" 
        y="150" 
        width="140" 
        height="15" 
        rx="5" 
        fill="hsl(var(--primary-600))"
      />
      <rect 
        x="270" 
        y="175" 
        width="100" 
        height="10" 
        rx="5" 
        fill="hsl(var(--primary-600))" 
        fillOpacity="0.7"
      />

      {/* 分析结果区域 */}
      <rect 
        x="190" 
        y="220" 
        width="220" 
        height="180" 
        rx="10" 
        fill="white" 
        className="dark:fill-gray-800"
      />

      {/* 分析图表 */}
      <rect 
        x="210" 
        y="240" 
        width="180" 
        height="20" 
        rx="5" 
        fill="hsl(var(--primary-200))"
      />
      <text 
        x="300" 
        y="255" 
        fontFamily="Arial, 'Noto Sans SC', sans-serif" 
        fontSize="12" 
        fill="hsl(var(--secondary-600))" 
        textAnchor="middle"
        className="dark:fill-gray-300"
      >
        数据分析
      </text>

      {/* 图表条形 */}
      <rect 
        x="210" 
        y="270" 
        width="180" 
        height="10" 
        rx="5" 
        fill="hsl(var(--primary-300))" 
        fillOpacity="0.3"
      />
      <rect 
        x="210" 
        y="270" 
        width="140" 
        height="10" 
        rx="5" 
        fill="hsl(var(--primary-400))"
      />
      <text 
        x="210" 
        y="290" 
        fontFamily="Arial, 'Noto Sans SC', sans-serif" 
        fontSize="10" 
        fill="hsl(var(--secondary-600))"
        className="dark:fill-gray-400"
      >
        性能指标
      </text>

      <rect 
        x="210" 
        y="300" 
        width="180" 
        height="10" 
        rx="5" 
        fill="hsl(var(--primary-300))" 
        fillOpacity="0.3"
      />
      <rect 
        x="210" 
        y="300" 
        width="90" 
        height="10" 
        rx="5" 
        fill="hsl(var(--primary-400))"
      />
      <text 
        x="210" 
        y="320" 
        fontFamily="Arial, 'Noto Sans SC', sans-serif" 
        fontSize="10" 
        fill="hsl(var(--secondary-600))"
        className="dark:fill-gray-400"
      >
        用户活跃
      </text>

      <rect 
        x="210" 
        y="330" 
        width="180" 
        height="10" 
        rx="5" 
        fill="hsl(var(--primary-300))" 
        fillOpacity="0.3"
      />
      <rect 
        x="210" 
        y="330" 
        width="160" 
        height="10" 
        rx="5" 
        fill="hsl(var(--primary-400))"
      />
      <text 
        x="210" 
        y="350" 
        fontFamily="Arial, 'Noto Sans SC', sans-serif" 
        fontSize="10" 
        fill="hsl(var(--secondary-600))"
        className="dark:fill-gray-400"
      >
        收入增长
      </text>

      <rect 
        x="210" 
        y="360" 
        width="180" 
        height="10" 
        rx="5" 
        fill="hsl(var(--primary-300))" 
        fillOpacity="0.3"
      />
      <rect 
        x="210" 
        y="360" 
        width="160" 
        height="10" 
        rx="5" 
        fill="hsl(var(--primary-400))"
      />
      <text 
        x="210" 
        y="380" 
        fontFamily="Arial, 'Noto Sans SC', sans-serif" 
        fontSize="10" 
        fill="hsl(var(--secondary-600))"
        className="dark:fill-gray-400"
      >
        市场份额
      </text>

      {/* 装饰元素 */}
      <circle 
        cx="480" 
        cy="150" 
        r="50" 
        fill="hsl(var(--accent-secondary))" 
        fillOpacity="0.2"
      />
      <circle 
        cx="120" 
        cy="350" 
        r="70" 
        fill="hsl(var(--primary-700))" 
        fillOpacity="0.2"
      />
      <circle 
        cx="450" 
        cy="420" 
        r="30" 
        fill="hsl(var(--primary-200))" 
        fillOpacity="0.4"
      />
    </svg>
  );
}
