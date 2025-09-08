'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
};

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  // const element = document.getElementById('__next'); // Next.js 通常有一个 id 为 __next 的 div
  // 或者更通用地挂载到 body
  // const element = document.body;

  // 确保 portalRoot 存在，如果不存在，则在客户端挂载时创建
  let portalRoot = document.getElementById('portal-root');
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(portalRoot);
  }

  return createPortal(children, portalRoot);
};

export default Portal;
