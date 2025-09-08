import type { Metadata } from 'next';
import { BackToHomeNav } from '@/components/changelog/BackToHomeNav';
import { ChangelogList } from '@/components/changelog/ChangelogList';

export const metadata: Metadata = {
  title: '更新日志 | KnowOne AI',
  description: '查看 KnowOne AI 的最新更新、功能改进和修复的问题',
};

export default function ChangelogPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="mb-4 border-b px-6 py-4">
        <div className="container mx-auto flex max-w-5xl items-center">
          <BackToHomeNav />
        </div>
      </div>

      <div className="grow">
        <ChangelogList />
      </div>
    </main>
  );
}

// 使用Server Component的静态生成功能，定期重新生成页面
export const revalidate = 3600; // 每小时重新验证一次
