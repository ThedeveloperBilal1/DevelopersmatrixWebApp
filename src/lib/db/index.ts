import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// Create a mock DB for build time if no connection string
function createMockDB() {
  return {
    query: {
      articles: { findMany: async () => [], findFirst: async () => null },
      deals: { findMany: async () => [], findFirst: async () => null },
      sources: { findMany: async () => [], findFirst: async () => null },
    },
    insert: () => ({ values: async () => {} }),
    update: () => ({ set: () => ({ where: async () => {} }) }),
    delete: () => ({ where: async () => {} }),
  } as any;
}

export const db = connectionString 
  ? drizzle(neon(connectionString), { schema })
  : createMockDB();
