import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from '@/orders/entities/order-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export type CreateOrderCommand = {
  client_id: number;
  items: Array<{
    product_id: string;
    quantity: number;
    price: number;
  }>;
};

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ name: 'client_id' })
  clientId: number;

  @Column()
  status: OrderStatus = OrderStatus.PENDING;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: ['insert'] })
  items: OrderItem[];

  static create(input: CreateOrderCommand) {
    const order = new Order();
    order.clientId = input.client_id;
    order.items = input.items.map((item) => {
      const orderItem = new OrderItem();
      orderItem.productId = item.product_id;
      orderItem.quantity = item.quantity;
      orderItem.price = item.price;
      return orderItem;
    });
    order.total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return order;
  }
}
