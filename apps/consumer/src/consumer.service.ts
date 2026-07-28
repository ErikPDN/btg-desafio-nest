import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  constructor() {}

  async processarPedido() {}
}
