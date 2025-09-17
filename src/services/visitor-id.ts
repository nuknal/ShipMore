'use client';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

const VISITOR_ID_KEY = 'ShipMore-visitor-id';
const VISITOR_CREATED_AT_KEY = 'ShipMore-visitor-created-at';

/**
 * 获取或生成访客 ID
 * 首先尝试从 localStorage 获取，如果不存在则使用 FingerprintJS 生成新的 ID
 */
export async function getVisitorId(): Promise<string> {
  // 如果在服务器端，返回一个默认值
  if (typeof window === 'undefined') {
    return 'server-side';
  }

  // 尝试从 localStorage 获取现有的访客 ID
  const storedId = localStorage.getItem(VISITOR_ID_KEY);
  if (storedId) {
    return storedId;
  }

  try {
    // 加载 FingerprintJS
    const fp = await FingerprintJS.load();

    // 获取访客的指纹信息
    const result = await fp.get();

    // 使用访客的指纹作为唯一标识符
    const visitorId = result.visitorId;

    // 将访客 ID 存储到 localStorage
    localStorage.setItem(VISITOR_ID_KEY, visitorId);

    // 存储创建时间
    localStorage.setItem(VISITOR_CREATED_AT_KEY, Date.now().toString());

    return visitorId;
  } catch (error) {
    console.error('生成访客 ID 失败:', error);

    // 如果 FingerprintJS 失败，生成一个随机 ID 作为备用
    const fallbackId = `fallback-${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(VISITOR_ID_KEY, fallbackId);
    localStorage.setItem(VISITOR_CREATED_AT_KEY, Date.now().toString());

    return fallbackId;
  }
}

/**
 * 获取访客 ID 的创建时间
 */
export function getVisitorCreatedAt(): number | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const createdAt = localStorage.getItem(VISITOR_CREATED_AT_KEY);
  return createdAt ? Number.parseInt(createdAt, 10) : null;
}

/**
 * 重置访客 ID
 * 在某些情况下可能需要重置 ID，例如用户明确请求或达到使用限制
 */
export function resetVisitorId(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(VISITOR_ID_KEY);
  localStorage.removeItem(VISITOR_CREATED_AT_KEY);
}

/**
 * 为 fetch 请求添加访客 ID 头部
 * @param headers 现有的请求头
 */
export async function addVisitorIdToHeaders(headers: HeadersInit = {}): Promise<Headers> {
  const visitorId = await getVisitorId();
  const newHeaders = new Headers(headers);
  newHeaders.set('X-Visitor-ID', visitorId);
  return newHeaders;
}
