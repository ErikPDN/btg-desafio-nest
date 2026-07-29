import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { RawEventDeserializer } from './pedido.deserializer';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: process.env.RABBITMQ_QUEUE!,
      queueOptions: { durable: true },
      deserializer: new RawEventDeserializer(),
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Consumer service is running on port ${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
