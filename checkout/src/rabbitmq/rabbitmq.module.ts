import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://admin:admin@host.docker.internal:5672',
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitmqModule {}
