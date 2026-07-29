import { DatabaseService } from '@app/database/database.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { clientes, pedidos, pedidoItens } from '@app/database/schema';
import { eq, sql } from 'drizzle-orm';
import {
  PedidoResponseDto,
  QuantidadePedidosResponseDto,
  ValorTotalPedidoResponseDto,
} from '@app/common';
@Injectable()
export class AppService {
  constructor(private readonly dbService: DatabaseService) {}

  async getValorTotalPedido(
    codigoPedido: number,
  ): Promise<ValorTotalPedidoResponseDto> {
    const [pedido] = await this.dbService.db
      .select({
        valorTotal: sql<string>`SUM(${pedidoItens.precoUnitario} * ${pedidoItens.quantidade})`,
      })
      .from(pedidoItens)
      .innerJoin(pedidos, eq(pedidos.id, pedidoItens.pedidoId))
      .where(eq(pedidos.codigoPedido, codigoPedido));

    if (!pedido?.valorTotal)
      throw new NotFoundException(
        `Pedido com código ${codigoPedido} não encontrado`,
      );

    return { codigoPedido, valorTotal: Number(pedido.valorTotal) };
  }

  async getPedidosByCliente(
    codigoCliente: number,
  ): Promise<PedidoResponseDto[]> {
    const hasCliente = await this.dbService.db
      .select()
      .from(clientes)
      .where(eq(clientes.codigoCliente, codigoCliente));

    if (!hasCliente.length)
      throw new NotFoundException(
        `Cliente com código ${codigoCliente} não encontrado`,
      );

    return this.dbService.db.query.pedidos.findMany({
      where: eq(pedidos.codigoCliente, codigoCliente),
      columns: {
        id: false,
      },
      with: {
        itens: {
          columns: {
            id: false,
            pedidoId: false,
          },
        },
      },
    });
  }

  async getQuantidadePedidosByCliente(
    codigoCliente: number,
  ): Promise<QuantidadePedidosResponseDto> {
    const [quantity] = await this.dbService.db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(pedidos)
      .where(eq(pedidos.codigoCliente, codigoCliente));

    return { codigoCliente, quantidadePedidos: Number(quantity.count) };
  }
}
