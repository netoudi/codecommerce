import { Product } from '@/models';

export class ProductService {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${process.env.CATALOG_API_URL}/products`, {
      next: {
        revalidate: 1,
      },
    });
    return response.json();
  }

  async getProduct(productId: string): Promise<Product> {
    const response = await fetch(`${process.env.CATALOG_API_URL}/products/${productId}`, {
      next: {
        revalidate: 1,
      },
    });
    return response.json();
  }
}
