import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
	throw new Error('DB url missing');
}

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle({ client: sql, schema });
