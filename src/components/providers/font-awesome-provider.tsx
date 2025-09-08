'use client';

import { config } from '@fortawesome/fontawesome-svg-core';

import '@fortawesome/fontawesome-svg-core/styles.css';

// 防止 Font Awesome 图标闪烁
config.autoAddCss = false;

export function FontAwesomeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
