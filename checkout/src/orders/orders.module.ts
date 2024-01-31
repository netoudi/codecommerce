import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from '@/orders/entities/order-item.entity';
import { Order } from '@/orders/entities/order.entity';
import { OrdersController } from '@/orders/orders.controller';
import { OrdersService } from '@/orders/orders.service';
import { Product } from '@/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
