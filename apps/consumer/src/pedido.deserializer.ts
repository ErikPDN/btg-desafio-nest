import { Injectable } from '@nestjs/common';
import { Deserializer, IncomingEvent } from '@nestjs/microservices';

@Injectable()
export class RawEventDeserializer implements Deserializer {
  deserialize(value: unknown): IncomingEvent {
    return {
      pattern: 'pedidos',
      data: value,
    };
  }
}
