import type { NextAuthOptions } from 'next-auth';
import type { NextRequest } from 'next/server';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/db/drizzle';
import { accounts, sessions, settings, users, verificationTokens } from '@/db/schema';
import { freeSubscription } from './quota';
import { sendVerificationRequest } from './resend';
import { decodeImageUrl } from './utils';

const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000,
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000,
      },
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      from: process.env.RESEND_EMAIL_FROM,
      sendVerificationRequest,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    signOut: '/',
    newUser: '/sign-up', // 新用户注册页面
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        return false;
      }

      console.log('user', user);
      console.log('account', account);
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        // 将 token.sub 作为用户 ID
        // 为 session.user 添加 id 属性
        (session.user as any).id = token.sub as string;
        if (session.user.image) {
          session.user.image = decodeImageUrl(session.user.image);
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 天
  },
  events: {
    async createUser({ user }) {
      console.log('createUser', user);

      // initialize user's settings/profile/free-usage
      await db.insert(settings).values({
        userId: user.id,
      });

      await freeSubscription(user.id);
    },
  },
};

async function getUserId(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (userId) {
    return userId;
  }
  // 从请求头获取用户邮箱
  const userEmail = request.headers.get('x-user-email');
  if (!userEmail) {
    return '';
  }

  // 从数据库查找用户
  const userResult = await db.select()
    .from(users)
    .where(eq(users.email, userEmail))
    .limit(1);

  if (!userResult.length) {
    return '';
  }

  return userResult[0]!.id;
};

export { authOptions, getUserId };
