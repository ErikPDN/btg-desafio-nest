import { Controller, Get } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @EventPattern('pedidos')
  async handlePedidoEvent() {
    await this.consumerService.processarPedido();
  }
}
