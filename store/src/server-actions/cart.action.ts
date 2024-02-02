'use server';

import { redirect } from 'next/navigation';
import { CartServiceFactory } from '@/services/cart.service';

export async function addToCartAction(formData: FormData) {
  const cartService = CartServiceFactory.create();
  await cartService.addToCart({
    productId: formData.get('product_id') as string,
    quantity: parseInt(formData.get('quantity') as string),
  });
  redirect('/my-cart');
}
