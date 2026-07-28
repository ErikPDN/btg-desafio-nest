import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { clientes } from './clientes';

export const pedidos = pgTable('pedidos', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  codigoPedido: integer('codigo_pedido').notNull().unique(),
  codigoCliente: integer('codigo_cliente')
    .notNull()
    .references(() => clientes.codigoCliente),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
