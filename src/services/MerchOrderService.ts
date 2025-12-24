import { supabase } from "@/lib/supabase/client";

export class MerchOrderService {
  static async createOrder(payload: {
    reward_id: string;
    address_id: string;
  }) {
    const { data, error } = await supabase.rpc(
      "create_merchandise_order",
      {
        p_reward_id: payload.reward_id,
        p_address_id: payload.address_id,
      }
    );

    if (error) throw error;
    return data;
  }

  static async getMyOrders(userId: string) {
    const { data, error } = await supabase
      .from("merchandise_orders")
      .select(
        `
        *,
        rewards(title, description)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  static async requestRefund(orderId: string) {
    const { error } = await supabase.rpc(
      "refund_merchandise_order",
      {
        p_order_id: orderId,
      }
    );

    if (error) throw error;
  }
}
