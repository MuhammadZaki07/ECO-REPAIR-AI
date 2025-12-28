import { useQuery } from '@tanstack/react-query';
import { HistoryService } from '@/services/HistoryService';
import { baseQueryOptions } from '@/lib/queryOptions';

export const useHistory = (
  userId?: string,
  page = 1,
  limit = 6,
  search = ''
) => {
  const query = useQuery({
    queryKey: ['history', userId, page, limit, search],
    queryFn: () =>
      HistoryService.getUserHistory({
        userId: userId!,
        page,
        limit,
        search,
      }),
    enabled: !!userId,
    ...baseQueryOptions,
  });

  return {
    history: query.data?.data ?? [],
    total: query.data?.total ?? 0,
    pages: Math.ceil((query.data?.total ?? 0) / limit),
    isEmpty: !query.isLoading && (query.data?.data?.length ?? 0) === 0,

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};
