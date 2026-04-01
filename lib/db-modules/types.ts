import type { Pool } from 'mysql2/promise';

export interface DbModule {
  name: string;
  createTables: (pool: Pool) => Promise<void>;
  seed: (pool: Pool) => Promise<void>;
}
