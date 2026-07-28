import { integer, pgTable } from 'drizzle-orm/pg-core';

export const clientes = pgTable('clientes', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  codigoCliente: integer('codigo_cliente').notNull().unique(),
});
