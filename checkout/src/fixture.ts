import { NestFactory } from '@nestjs/core';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);
  const productRepository = dataSource.getRepository('Product');

  await productRepository.insert([
    {
      id: 'e7c7eb5a-3ddb-4280-8665-14166a7ab11f',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      image_url: 'http://host.docker.internal:9000/products/1.png',
    },
    {
      id: 'acec21b2-144f-4f5f-9bbd-fcf00df9111f',
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      image_url: 'http://host.docker.internal:9000/products/2.png',
    },
    {
      id: '01a4fa95-03d7-4f6b-aa7b-b69a3f842184',
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
      image_url: 'http://host.docker.internal:9000/products/3.png',
    },
    {
      id: 'fb0c39dc-f65a-4cad-b6c9-7ceec792edc0',
      name: 'Product 4',
      description: 'Description 4',
      price: 400,
      image_url: 'http://host.docker.internal:9000/products/4.png',
    },
    {
      id: 'b7343306-7587-4512-9e88-87a5bdf60e77',
      name: 'Product 5',
      description: 'Description 5',
      price: 500,
      image_url: 'http://host.docker.internal:9000/products/5.png',
    },
    {
      id: '5dde6f93-c9a6-4cf0-9bc0-558925b7db9a',
      name: 'Product 6',
      description: 'Description 6',
      price: 600,
      image_url: 'http://host.docker.internal:9000/products/6.png',
    },
    {
      id: 'ef51ac8b-97db-43cd-87b7-91f3b50c2b7d',
      name: 'Product 7',
      description: 'Description 7',
      price: 700,
      image_url: 'http://host.docker.internal:9000/products/7.png',
    },
    {
      id: '3016f5d9-f78b-49a8-a399-5712be4d126d',
      name: 'Product 8',
      description: 'Description 8',
      price: 800,
      image_url: 'http://host.docker.internal:9000/products/8.png',
    },
    {
      id: 'baefd539-6445-4f5b-ae2a-7dc22459f02d',
      name: 'Product 9',
      description: 'Description 9',
      price: 900,
      image_url: 'http://host.docker.internal:9000/products/9.png',
    },
    {
      id: 'f62eeaad-dafb-4e46-a6c7-f13340a8a49e',
      name: 'Product 10',
      description: 'Description 10',
      price: 1000,
      image_url: 'http://host.docker.internal:9000/products/10.png',
    },
    {
      id: 'c0e8baa3-f85c-403c-a233-a8c145a0f863',
      name: 'Product 11',
      description: 'Description 11',
      price: 1100,
      image_url: 'http://host.docker.internal:9000/products/11.png',
    },
    {
      id: 'cfd88bdb-62ed-4bd0-a4b4-1921c97f40af',
      name: 'Product 12',
      description: 'Description 12',
      price: 1200,
      image_url: 'http://host.docker.internal:9000/products/12.png',
    },
    {
      id: '3415c54a-8c87-4b98-8f1f-f83e37cd4b68',
      name: 'Product 13',
      description: 'Description 13',
      price: 1300,
      image_url: 'http://host.docker.internal:9000/products/13.png',
    },
    {
      id: 'f08aeb29-9add-4629-b148-9aee70f8e9a1',
      name: 'Product 14',
      description: 'Description 14',
      price: 1400,
      image_url: 'http://host.docker.internal:9000/products/14.png',
    },
    {
      id: '2bd20500-aa2f-40ca-9d90-04fcd0113ec3',
      name: 'Product 15',
      description: 'Description 15',
      price: 1500,
      image_url: 'http://host.docker.internal:9000/products/15.png',
    },
    {
      id: 'b81a5f03-0ce8-43ac-bf28-581c93eeaed6',
      name: 'Product 16',
      description: 'Description 16',
      price: 1600,
      image_url: 'http://host.docker.internal:9000/products/16.png',
    },
    {
      id: '48021099-6ebe-47e6-8e1a-097aebd49438',
      name: 'Product 17',
      description: 'Description 17',
      price: 1700,
      image_url: 'http://host.docker.internal:9000/products/17.png',
    },
    {
      id: 'ad839209-cea0-43f3-83ea-539e0e021531',
      name: 'Product 18',
      description: 'Description 18',
      price: 1800,
      image_url: 'http://host.docker.internal:9000/products/18.png',
    },
    {
      id: 'e1a7c39d-ee36-4f2f-8d2d-3dacad97a63e',
      name: 'Product 19',
      description: 'Description 19',
      price: 1900,
      image_url: 'http://host.docker.internal:9000/products/19.png',
    },
    {
      id: 'df36f321-4811-47b6-838e-f77a646b1d11',
      name: 'Product 20',
      description: 'Description 20',
      price: 2000,
      image_url: 'http://host.docker.internal:9000/products/20.png',
    },
  ]);

  await app.close();
}

bootstrap().then(() => {
  console.log(`🔥 Database recreated!`);
});
