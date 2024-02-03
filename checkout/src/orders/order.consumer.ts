import { AmqpConnection, Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { OrderStatus } from '@/orders/entities/order.entity';
import { OrdersService } from '@/orders/orders.service';

@Injectable()
export class OrderConsumer {
  constructor(
    private orderService: OrdersService,
    private amqpConnection: AmqpConnection,
  ) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'PaymentDone',
    queue: 'payments',
  })
  async consume(msg: { order_id: string; status: OrderStatus }) {
    try {
      if (msg.status === OrderStatus.PAID) {
        await this.orderService.pay(msg.order_id);
      }
      if (msg.status === OrderStatus.FAILED) {
        await this.orderService.fail(msg.order_id);
      }
      throw new InvalidStatusError(msg.status);
    } catch (error) {
      if (error instanceof EntityNotFoundError || error instanceof InvalidStatusError) {
        await this.amqpConnection.publish('amq.direct', 'fail', {
          error: error.message,
          order_id: msg.order_id,
        });
        return new Nack(false);
      }
      // TODO: logica para contar quantas vezes um mensagem foi consumida
      return new Nack(true);
    }
  }
}

class InvalidStatusError extends Error {
  constructor(invalidStatus: string) {
    super(`Invalid status: ${invalidStatus}`);
  }
}
