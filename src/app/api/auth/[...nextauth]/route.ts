import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// 创建 NextAuth 处理程序
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
