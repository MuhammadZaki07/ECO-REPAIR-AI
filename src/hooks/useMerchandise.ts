import { useMemo } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { MerchandiseService } from "@/services/MerchandiseService";
import type { EcoMerch, MerchOrder } from "@/types/merchandise";
import { ENV } from "@/env";

export const useMerch = (search = "", page = 1) => {
  const merchQuery = useQuery<{
    data: EcoMerch[];
    total: number;
  }>({
    queryKey: ["merch", search, page],
    queryFn: () =>
      MerchandiseService.getAllMerch({
        page,
        limit: ENV.PAGE_SIZE,
        search,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });

  const pages = useMemo(() => {
    const total = merchQuery.data?.total ?? 0;
    return Math.max(1, Math.ceil(total / ENV.PAGE_SIZE));
  }, [merchQuery.data?.total]);

  return {
    merch: merchQuery.data?.data ?? [],
    loading: merchQuery.isLoading,
    error: merchQuery.error as Error | null,
    refetch: merchQuery.refetch,
    total: merchQuery.data?.total ?? 0,
    pages,
    isEmpty: !merchQuery.isLoading && (merchQuery.data?.data.length ?? 0) === 0,
  };
};

export const useMerchOrders = (
  userId?: string,
  search = "",
  page = 1
) => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery<{
    data: MerchOrder[];
    total: number;
  }>({
    queryKey: ["merch-orders", userId, search, page],
    queryFn: () =>
      MerchandiseService.getMyOrders(userId!, {
        page,
        limit: ENV.PAGE_SIZE,
        search,
      }),
    enabled: !!userId,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });

  const orderMutation = useMutation({
    mutationFn: ({
      merch_id,
      address,
      note,
    }: {
      merch_id: string;
      address: string;
      note?: string;
    }) => {
      if (!userId) throw new Error("User not logged in");
      return MerchandiseService.createOrder({
        merch_id,
        user_id: userId,
        address,
        note,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["merch-orders"] });
    },
  });

  const refundMutation = useMutation({
    mutationFn: (orderId: string) =>
      MerchandiseService.requestRefund(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["merch-orders"] });
    },
  });

  const pages = useMemo(() => {
    const total = ordersQuery.data?.total ?? 0;
    return Math.max(1, Math.ceil(total / ENV.PAGE_SIZE));
  }, [ordersQuery.data?.total]);

  return {
    orders: ordersQuery.data?.data ?? [],
    loading: ordersQuery.isLoading,
    error: ordersQuery.error as Error | null,
    refetch: ordersQuery.refetch,

    orderMerch: (merch_id: string, address: string, note?: string) =>
      orderMutation.mutateAsync({ merch_id, address, note }),

    refundOrder: (orderId: string) =>
      refundMutation.mutateAsync(orderId),

    total: ordersQuery.data?.total ?? 0,
    pages,
    isEmpty:
      !ordersQuery.isLoading &&
      (ordersQuery.data?.data.length ?? 0) === 0,
  };
};
