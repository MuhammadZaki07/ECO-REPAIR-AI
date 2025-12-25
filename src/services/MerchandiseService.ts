import { supabase } from "@/lib/supabase/client";
import type { EcoMerch, MerchOrder } from "@/types/merchandise";

export class MerchandiseService {
  static async getAllMerch(params?: { page?: number; limit?: number; search?: string }): Promise<{ data: EcoMerch[]; total: number }> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 6;
    const search = params?.search ?? "";

    let query = supabase
      .from("eco_merchandise")
      .select("*", { count: "exact" })
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) throw error;
    return { data: data ?? [], total: count ?? 0 };
  }

  static async createOrder(payload: {
    merch_id: string;
    user_id: string;
    address: string;
    note?: string;
  }): Promise<MerchOrder> {
    const { data, error } = await supabase.rpc("claim_merchandise", {
      p_merchandise_id: payload.merch_id,
      p_user_id: payload.user_id,
      p_address: payload.address,
      p_note: payload.note ?? null,
    });

    if (error) throw error;
    return data as MerchOrder;
  }

  static async getMyOrders(userId: string, params?: { page?: number; limit?: number; search?: string }): Promise<{ data: MerchOrder[]; total: number }> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 6;
    const search = params?.search ?? "";

    let query = supabase
      .from("eco_merchandise_orders")
      .select("*, eco_merchandise(*)", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (search) {
      query = query.ilike("eco_merchandise.title", `%${search}%`);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return { data: data ?? [], total: count ?? 0 };
  }

  static async requestRefund(orderId: string) {
    const { error } = await supabase.rpc("refund_merch_order", {
      p_order_id: orderId,
    });
    if (error) throw error;
  }
}
