'use server';

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

export async function addToCartAction(formData: FormData) {
  const productId = formData.get('product_id') as string;
  const quantity = formData.get('quantity') as string;
  const cookieStore = cookies();
  const cartString = cookieStore.get('cart')?.value;
  if (cartString) {
    cookieStore.set('cart', JSON.stringify({ items: [] }));
  }
  const cart: Cart = cartString ? JSON.parse(cartString) : { items: [], total: 0 };
  const product = await new ProductService().getProduct(productId);
  cart.items.push({
    productId,
    quantity: parseInt(quantity),
    total: parseInt(quantity) * product.price,
  });
  cart.total = cart.total + parseInt(quantity) * product.price;
  cookieStore.set('cart', JSON.stringify(cart));
  console.log({ productId, quantity, product, cart });
}
