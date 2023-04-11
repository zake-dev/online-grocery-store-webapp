import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { api } from '@/api';
import { PaginationBar } from '@/components';
import { ProductListItem } from '@/features/Product';

export default function BrowsePage() {
  const [searchParams] = useSearchParams();
  const { data: paginatedProducts, isLoading } = useQuery({
    queryKey: ['products', searchParams.toString()],
    queryFn: () => api.products.getProducts(searchParams),
  });

  const productLowCount = (() => {
    const page = paginatedProducts?.pagination.page || 1;
    const size = paginatedProducts?.pagination.size || 0;
    return (page - 1) * size + 1;
  })();
  const productHighCount = (() => {
    const page = paginatedProducts?.pagination.page || 1;
    const size = paginatedProducts?.pagination.size || 0;
    return page * size;
  })();

  return (
    <div className="page-container gap-[16px] items-stretch">
      <span className="text-body-2 text-black-500">
        {productLowCount} - {productHighCount} results of{' '}
        {paginatedProducts?.pagination.totalCount ?? 0}
      </span>
      <div className="flex flex-row flex-wrap gap-[16px]">
        {paginatedProducts?.content.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <PaginationBar pagination={paginatedProducts?.pagination} />
      </div>
    </div>
  );
}
