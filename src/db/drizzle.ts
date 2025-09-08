import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

const client = new Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

export const db: NodePgDatabase<typeof schema> = drizzle(client);
