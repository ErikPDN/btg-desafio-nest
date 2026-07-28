import { integer, numeric, pgTable, varchar } from 'drizzle-orm/pg-core';
import { pedidos } from './pedidos';

export const pedidoItens = pgTable('pedido_itens', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  pedidoId: integer('pedido_id')
    .notNull()
    .references(() => pedidos.id),
  produto: varchar('produto', { length: 255 }).notNull(),
  quantidade: integer('quantidade').notNull(),
  precoUnitario: numeric('preco_unitario', {
    precision: 10,
    scale: 2,
  }).notNull(),
});
