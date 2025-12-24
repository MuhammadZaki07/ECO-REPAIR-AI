import { supabase } from "@/lib/supabase/client";
import type { EcoMerch } from "@/types/merchandise";

export class MerchandiseService {
  static async getAllMerch(): Promise<EcoMerch[]> {
    const { data, error } = await supabase
      .from("eco_merchandise")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  static async createOrder(payload: {
    merch_id: string;
    user_id: string;
    address: string;
    note?: string;
  }) {
    const { data, error } = await supabase.rpc("create_merch_order", {
      p_merch_id: payload.merch_id,
      p_user_id: payload.user_id,
      p_address: payload.address,
      p_note: payload.note ?? null,
    });

    if (error) throw error;
    return data;
  }

  static async getMyOrders(userId: string) {
    const { data, error } = await supabase
      .from("eco_merchandise_orders")
      .select("*, eco_merchandise(id, title, cost_eco_coin, stock)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  static async requestRefund(orderId: string) {
    const { error } = await supabase.rpc("refund_merch_order", {
      p_order_id: orderId,
    });

    if (error) throw error;
  }
}
