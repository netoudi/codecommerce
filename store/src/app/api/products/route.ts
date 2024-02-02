import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '@/services/product.service';

// cache do fetch para api catalog
// cache do fetch para minha propria api
export async function GET(request: NextRequest) {
  const productService = new ProductService();
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') as string;
  const categoryId = searchParams.get('category_id') as string;
  const products = await productService.getProducts({ search, categoryId });
  return NextResponse.json(products);
}
