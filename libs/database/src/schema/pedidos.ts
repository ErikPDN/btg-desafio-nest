import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { clientes } from './clientes';
import { pedidoItens } from './pedido-itens';
import { relations } from 'drizzle-orm';

export const pedidos = pgTable('pedidos', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  codigoPedido: integer('codigo_pedido').notNull().unique(),
  codigoCliente: integer('codigo_cliente')
    .notNull()
    .references(() => clientes.codigoCliente),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const pedidosRelations = relations(pedidos, ({ many }) => ({
  itens: many(pedidoItens),
}));
