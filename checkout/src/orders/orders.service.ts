import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from '@/orders/dto/create-order.dto';
import { Order } from '@/orders/entities/order.entity';
import { Product } from '@/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private amqpConnection: AmqpConnection,
  ) {}

  async create(createOrderDto: CreateOrderDto & { client_id: number }) {
    const productsIds = createOrderDto.items.map((item) => item.product_id);
    const uniqueProductIds = [...new Set(productsIds)];
    const products = await this.productRepository.findBy({ id: In(uniqueProductIds) });
    if (products.length !== uniqueProductIds.length) {
      throw new Error(
        `Algum produto não existe. Produtos passados ${productsIds}, produtos encotrados ${products.map((product) => product.id)}`,
      );
    }
    const order = Order.create({
      client_id: createOrderDto.client_id,
      items: createOrderDto.items.map((item) => {
        const product = products.find((product) => product.id === item.product_id);
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          price: product.price,
        };
      }),
    });
    await this.orderRepository.save(order);
    await this.amqpConnection.publish('amq.direct', 'OrderCreated', {
      order_id: order.id,
      card_hash: createOrderDto.card_hash,
      total: order.total,
    });
    return order;
  }

  findAll(client_id: number) {
    return this.orderRepository.find({ where: { client_id }, order: { created_at: 'DESC' } });
  }

  findOne(id: string, client_id: number) {
    return this.orderRepository.findOneByOrFail({ id, client_id });
  }
}
