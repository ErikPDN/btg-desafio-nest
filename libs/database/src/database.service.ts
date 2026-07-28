import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool;
  public db: NodePgDatabase<typeof schema>;

  constructor() {
    const connectionString = process.env.DATABASE_URL!;
    this.pool = new Pool({ connectionString });
    this.db = drizzle(this.pool, { schema });

    this.logger.log('DatabaseService initialized');
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
