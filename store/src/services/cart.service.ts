import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { ProductService } from '@/services/product.service';

export type CartItem = {
  productId: string;
  quantity: number;
  total: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
};

export class CartService {
  cookieStore: ReadonlyRequestCookies;

  constructor(private productService: ProductService) {
    this.cookieStore = cookies();
  }

  async addToCart(input: { productId: string; quantity: number }) {
    const cartRaw = this.cookieStore.get('cart')?.value;
    if (!cartRaw) {
      this.cookieStore.set('cart', JSON.stringify({ items: [], total: 0 }));
    }
    const cart: Cart = cartRaw ? JSON.parse(cartRaw) : { items: [], total: 0 };
    const { productId, quantity } = input;
    const product = await this.productService.getProduct(productId);
    const productPrice = product.price * quantity;
    cart.items.push({
      productId,
      quantity,
      total: productPrice,
    });
    cart.total += productPrice;
    this.cookieStore.set('cart', JSON.stringify(cart));
  }

  removeItemFromCart(index: number) {
    const cartRaw = this.cookieStore.get('cart')?.value;
    const cart: Cart = cartRaw ? JSON.parse(cartRaw) : { items: [], total: 0 };
    cart.items.splice(index, 1);
    this.cookieStore.set('cart', JSON.stringify(cart));
  }

  getCart() {
    const cartRaw = this.cookieStore.get('cart')?.value;
    const cart: Cart = cartRaw ? JSON.parse(cartRaw) : { items: [], total: 0 };
    return cart;
  }

  clearCart() {
    this.cookieStore.delete('cart');
  }
}

export class CartServiceFactory {
  static create() {
    const productService = new ProductService();
    return new CartService(productService);
  }
}
