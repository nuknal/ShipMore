import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { users } from '@/db/schema';

export async function connectDb() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  return drizzle(client);
}

export async function main() {
  const db = await connectDb();
  const userData = await db.select().from(users).where(sql`${users.id} = 'clerk_user_id'`);
  console.log(userData);
}

main();
