import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '@/orders/entities/order.entity';
import { Product } from '@/products/entities/product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Order)
  order: Order;
}
