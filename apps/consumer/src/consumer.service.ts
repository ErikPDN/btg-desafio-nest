import { PedidoDto } from '@app/common/dto/pedido.dto';
import { DatabaseService } from '@app/database/database.service';
import { Injectable, Logger } from '@nestjs/common';
import { clientes, pedidos, pedidoItens } from '@app/database/schema';
@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  constructor(private readonly dbService: DatabaseService) {}

  // TODO: Perguntar se esse é o modo mais adequado ao inves do modo do eventflow
  async processarPedido(pedido: PedidoDto) {
    this.logger.log(`Processando pedido: ${pedido.codigoPedido}`);

    await this.dbService.db.transaction(async (tx) => {
      await tx
        .insert(clientes)
        .values({ codigoCliente: pedido.codigoCliente })
        .onConflictDoNothing();

      const [novoPedido] = await tx
        .insert(pedidos)
        .values({
          codigoPedido: pedido.codigoPedido,
          codigoCliente: pedido.codigoCliente,
        })
        .returning();

      await tx.insert(pedidoItens).values(
        pedido.itens.map((item) => ({
          pedidoId: novoPedido.id,
          produto: item.produto,
          quantidade: item.quantidade,
          precoUnitario: item.precoUnitario.toString(),
        })),
      );
    });
  }
}
