import { Controller } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PedidoDto } from '@app/common/dto/pedido.dto';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @EventPattern('pedidos')
  async handlePedidoEvent(@Payload() data: PedidoDto) {
    await this.consumerService.processarPedido(data);
  }
}
