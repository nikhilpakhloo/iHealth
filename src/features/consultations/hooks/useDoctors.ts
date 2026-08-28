import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../../core/api/apiClient';
import { Doctor } from '../../../core/api/mockData';

interface DoctorsResponse {
  data: Doctor[];
  total: number;
  page: number;
  hasMore: boolean;
}

export const useDoctors = (searchQuery: string, specialtyFilter: string) => {
  return useInfiniteQuery<DoctorsResponse>({
    queryKey: ['doctors', searchQuery, specialtyFilter],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiClient.get('/doctors', {
        params: {
          page: pageParam,
          limit: 50,
          search: searchQuery,
          specialty: specialtyFilter
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
