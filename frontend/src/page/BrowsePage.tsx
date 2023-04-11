import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { api } from '@/api';
import { ProductListItem } from '@/features/Product';

export default function BrowsePage() {
  const [searchParams] = useSearchParams();
  const { data: paginatedProducts, isLoading } = useQuery({
    queryKey: ['products', searchParams.toString()],
    queryFn: () => api.products.getProducts(searchParams),
  });

  return (
    <div className="page-container gap-[16px] items-stretch">
      <span className="text-body-2 text-black-500">1 - 8 results of 20</span>
      <div className="flex flex-row flex-wrap gap-[16px]">
        {paginatedProducts?.content.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
