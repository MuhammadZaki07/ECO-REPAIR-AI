import { supabase } from "@/lib/supabase/client";
import { uploadFile, deleteFile } from "@/lib/storage.helper";
import { ENV } from "@/env";
import type { EcoMerch, MerchOrder } from "@/types/merchandise";
import type { ParamsService } from "@/types/paramService";

export class MerchandiseService {
  static async getAllMerch(
    params?: ParamsService & {
      sortBy?: keyof EcoMerch;
      sortOrder?: "asc" | "desc";
      onlyActive?: boolean;
    }
  ) {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 6;
    const search = params?.search ?? "";
    const sortBy = params?.sortBy ?? "created_at";
    const sortOrder = params?.sortOrder ?? "desc";
    const onlyActive = params?.onlyActive ?? true;

    let query = supabase
      .from("eco_merchandise")
      .select("*", { count: "exact" })
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range((page - 1) * limit, page * limit - 1);

    if (onlyActive) query = query.eq("is_active", true);
    if (search) query = query.ilike("title", `%${search}%`);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    return { data: data ?? [], total: count ?? 0 };
  }

  static async getMerchById(id: string): Promise<EcoMerch | null> {
    const { data, error } = await supabase
      .from("eco_merchandise")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  static async createMerch(payload: Partial<EcoMerch> & { image_file?: File }) {
    let image_url: string | null = null;

    try {
      if (payload.image_file) {
        image_url = await uploadFile({
          bucket: ENV.BUCKET_MERCHANDISE,
          folder: "items",
          file: payload.image_file,
        });
      }

      const { data, error } = await supabase
        .from("eco_merchandise")
        .insert({
          title: payload.title,
          description: payload.description,
          stock: payload.stock,
          cost_eco_coin: payload.cost_eco_coin,
          is_active: payload.is_active ?? true,
          image_url,
        })
        .select()
        .single();

      if (error) throw error;
      return data as EcoMerch;
    } catch (err) {
      if (image_url) {
        await deleteFile({
          bucket: ENV.BUCKET_MERCHANDISE,
          publicUrl: image_url,
        });
      }
      throw err;
    }
  }

  static async updateMerch(
    id: string,
    payload: Partial<EcoMerch> & { image_file?: File; remove_image?: boolean }
  ) {
    const oldMerch = await this.getMerchById(id);
    if (!oldMerch) throw new Error("Merchandise not found");

    let image_url = oldMerch.image_url ?? null;

    if (payload.remove_image && oldMerch.image_url) {
      await deleteFile({
        bucket: ENV.BUCKET_MERCHANDISE,
        publicUrl: oldMerch.image_url,
      });
      image_url = null;
    }

    if (payload.image_file) {
      if (oldMerch.image_url) {
        await deleteFile({
          bucket: ENV.BUCKET_MERCHANDISE,
          publicUrl: oldMerch.image_url,
        });
      }
      image_url = await uploadFile({
        bucket: ENV.BUCKET_MERCHANDISE,
        folder: "items",
        file: payload.image_file,
      });
    }

    const updateData: Record<string, any> = {
      updated_at: new Date().toISOString(),
      image_url,
    };

    if (payload.title !== undefined) updateData.title = payload.title;
    if (payload.description !== undefined)
      updateData.description = payload.description;
    if (payload.stock !== undefined) updateData.stock = payload.stock;
    if (payload.cost_eco_coin !== undefined)
      updateData.cost_eco_coin = payload.cost_eco_coin;
    if (payload.is_active !== undefined)
      updateData.is_active = payload.is_active;

    const { data, error } = await supabase
      .from("eco_merchandise")
      .update(updateData)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return data as EcoMerch;
  }

  static async deleteMerch(id: string) {
    const merch = await this.getMerchById(id);
    console.log(merch);
    
    if (!merch) throw new Error("Merchandise not found");

    if (merch.image_url) {
      await deleteFile({
        bucket: ENV.BUCKET_MERCHANDISE,
        publicUrl: merch.image_url,
      });
    }

    const { error } = await supabase
      .from("eco_merchandise")
      .delete()
      .eq("id", id);
    if (error) throw error;
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

  static async getMyOrders(
    userId: string,
    params?: { page?: number; limit?: number; search?: string }
  ): Promise<{ data: MerchOrder[]; total: number }> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 6;
    const search = params?.search ?? "";

    let query = supabase
      .from("eco_merchandise_orders")
      .select("*, eco_merchandise(*)", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (search) query = query.ilike("eco_merchandise.title", `%${search}%`);

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
