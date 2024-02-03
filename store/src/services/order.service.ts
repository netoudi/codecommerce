import { Order } from '@/models';
import { AuthService } from '@/services/auth.service';

export class OrderService {
  constructor(private authService: AuthService) {}

  async getOrder(id: string): Promise<Order> {
    const response = await fetch(`${process.env.ORDERS_API_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
    return response.json();
  }

  async getOrders(): Promise<Order[]> {
    const response = await fetch(`${process.env.ORDERS_API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
    return response.json();
  }

  async createOrder(input: { cardHash: string; items: { productId: string; quantity: number }[] }): Promise<Order> {
    const response = await fetch(`${process.env.ORDERS_API_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        card_hash: input.cardHash,
        items: input.items.map((item) => {
          return {
            product_id: item.productId,
            quantity: item.quantity,
          };
        }),
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      const error = data;
      throw new Error(error.message);
    }
    return data;
  }
}

export class OrderServiceFactory {
  static create() {
    return new OrderService(new AuthService());
  }
}
