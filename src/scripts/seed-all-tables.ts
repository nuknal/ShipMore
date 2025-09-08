import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import {
  users,
} from '@/db/schema';

export async function connectDb() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  return drizzle(client);
}

async function main() {
  console.log('开始初始化所有表的模拟数据...');
  const db = await connectDb();

  // 检查是否已有用户数据
  const existingUsers = await db.select().from(users).limit(1);
  if (existingUsers.length === 0) {
    console.log('没有找到用户数据，请先创建用户');
    return;
  }

  // 获取第一个用户作为示例
  const user = existingUsers[0]!;
  console.log(`使用用户 ID: ${user.id}`);
}

main().catch(console.error);
