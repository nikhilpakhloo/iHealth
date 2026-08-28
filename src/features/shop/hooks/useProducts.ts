import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../../core/api/apiClient';
import { Product } from '../../../core/api/mockData';

interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  hasMore: boolean;
}

export const useProducts = (searchQuery: string, categoryFilter: string) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ['products', searchQuery, categoryFilter],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient.get('/products', {
        params: {
          page: pageParam,
          limit: 50,
          search: searchQuery,
          category: categoryFilter === 'All' ? '' : categoryFilter
        }
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
  });
};
