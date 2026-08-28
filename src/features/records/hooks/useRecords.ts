import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../../core/api/apiClient';
import { HealthRecord } from '../../../core/api/mockData';

interface RecordsResponse {
  data: HealthRecord[];
  total: number;
  page: number;
  hasMore: boolean;
}

export const useRecords = () => {
  return useInfiniteQuery<RecordsResponse>({
    queryKey: ['records'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient.get('/records', {
        params: {
          page: pageParam,
          limit: 100, // Fetch more per page for records
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
