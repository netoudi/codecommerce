import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { OrdersModule } from '@/orders/orders.module';
import { Product } from '@/products/entities/product.entity';
import { ProductsModule } from '@/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'host.docker.internal',
      port: 3308,
      username: 'root',
      password: 'root',
      database: 'codecommerce',
      entities: [Product],
      synchronize: true,
    }),
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
