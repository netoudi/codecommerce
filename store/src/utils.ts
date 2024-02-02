import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function searchProducts(router: AppRouterInstance, search?: string | null, categoryId?: string | null) {
  let path = `/`;
  const urlSearchParams = new URLSearchParams();
  if (search) {
    urlSearchParams.append('search', search);
  }
  if (categoryId && categoryId !== '0') {
    urlSearchParams.append('category_id', categoryId);
  }
  if (urlSearchParams.toString()) {
    path += `?${urlSearchParams.toString()}`;
  }
  router.push(path);
}
