import { useState, useEffect, useCallback, useMemo } from "react";
import { MerchandiseService } from "@/services/MerchandiseService";
import type { EcoMerch, MerchOrder } from "@/types/merchandise";
import { ENV } from "@/env";

export const useMerch = (search: string = "", page: number = 1) => {
  const [merch, setMerch] = useState<EcoMerch[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMerch = useCallback(async () => {
    try {
      setLoading(true);
      const { data, total: totalItems } = await MerchandiseService.getAllMerch({
        page,
        limit: ENV.PAGE_SIZE,
        search,
      });
      setMerch(data);
      setTotal(totalItems);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchMerch();
  }, [fetchMerch]);

  const paginated = useMemo(() => merch, [merch]);

  return {
    merch: paginated,
    loading,
    error,
    refetch: fetchMerch,
    total,
    pages: Math.max(1, Math.ceil(total / ENV.PAGE_SIZE)),
    isEmpty: !loading && merch.length === 0,
  };
};

export const useMerchOrders = (userId?: string, search: string = "", page: number = 1) => {
  const [orders, setOrders] = useState<MerchOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, total: totalItems } = await MerchandiseService.getMyOrders(userId, {
        page,
        limit: ENV.PAGE_SIZE,
        search,
      });
      setOrders(data);
      setTotal(totalItems);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId, page, search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const orderMerch = useCallback(
    async (merch_id: string, address: string, note?: string) => {
      if (!userId) throw new Error("User not logged in");
      const order = await MerchandiseService.createOrder({ merch_id, user_id: userId, address, note });
      setOrders((prev) => [order, ...prev]);
      return order;
    },
    [userId]
  );

  const refundOrder = useCallback(
    async (orderId: string) => {
      await MerchandiseService.requestRefund(orderId);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "refunded" } : o)));
    },
    []
  );

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    orderMerch,
    refundOrder,
    total,
    pages: Math.max(1, Math.ceil(total / ENV.PAGE_SIZE)),
    isEmpty: !loading && orders.length === 0,
  };
};
