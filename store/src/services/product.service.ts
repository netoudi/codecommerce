import { Product } from '@/models';

export class ProductService {
  async getProducts({ search, categoryId }: { search?: string; categoryId?: string }): Promise<Product[]> {
    let url = `${process.env.CATALOG_API_URL}/products`;
    if (categoryId) {
      url += `/categories/${categoryId}`;
    }
    const response = await fetch(url, {
      next: {
        revalidate: 1,
      },
    });
    let data = await response.json();
    data = !data ? [] : data;
    if (search) {
      return data.filter((product: Product) => product.name.toLowerCase().includes(search.toLowerCase()));
    }
    return data;
  }

  async getProductsByIds(productIds: string[]): Promise<Product[]> {
    const responses = await Promise.all(
      productIds.map((productId) => {
        return fetch(`${process.env.CATALOG_API_URL}/products/${productId}`, {
          next: {
            revalidate: 1,
          },
        });
      }),
    );
    return Promise.all(responses.map((response) => response.json()));
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
