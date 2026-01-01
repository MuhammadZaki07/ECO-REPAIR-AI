import { ENV } from "@/env";
import { deleteFile, uploadFile } from "@/lib/storage.helper";
import { supabase } from "@/lib/supabase/client";
import type { EcoDonationCampaign, EcoDonationRecord } from "@/types/donations";

export class DonationService {
  static async getCampaigns(params: {
    search?: string;
    page: number;
    pageSize: number;
    is_active?: boolean;
    sortBy?: "created_at" | "title";
    sortOrder?: "asc" | "desc";
  }) {
    const {
      search = "",
      page,
      pageSize,
      is_active,
      sortBy = "created_at",
      sortOrder = "desc",
    } = params;

    let query = supabase
      .from("eco_donation_campaigns")
      .select("*", { count: "exact" });

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    if (typeof is_active === "boolean") {
      query = query.eq("is_active", is_active);
    }

    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await query.range(from, to);

    if (error) throw error;

    return {
      data: data as EcoDonationCampaign[],
      total: count ?? 0,
    };
  }

  static async getCampaignByIdWithDonors(campaignId: string) {
    const { data, error } = await supabase
      .from("eco_donation_campaigns")
      .select(
        `
        *,
        eco_donation_records!left(
          amount,
          users:users(*)
        )
      `
      )
      .eq("id", campaignId)
      .maybeSingle();

    if (error) throw error;

    const donors = (data?.eco_donation_records ?? []).map((r: any) => ({
      ...r.users,
      amount: r.amount,
    }));

    const { eco_donation_records, ...campaignData } = data ?? {
      id: campaignId,
      title: "",
      description: "",
      goal_eco_coin: 0,
      current_eco_coin: 0,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return { ...campaignData, donors };
  }

  static async getCampaignById(campaignId: string) {
    const { data, error } = await supabase
      .from("eco_donation_campaigns")
      .select("*")
      .eq("id", campaignId)
      .single();

    if (error) throw error;
    return data;
  }

  static async createCampaign(payload: {
    title: string;
    description?: string;
    goal_eco_coin: number;
    is_active?: boolean;
    image?: File | null;
  }) {
    let imageUrl: string | null = null;

    if (payload.image) {
      imageUrl = await uploadFile({
        bucket: ENV.BUCKET_CAMPAIGNS,
        folder: ENV.FOLDER_CAMPAIGNS,
        file: payload.image,
      });
    }

    const { data, error } = await supabase
      .from("eco_donation_campaigns")
      .insert({
        title: payload.title,
        description: payload.description ?? "",
        goal_eco_coin: payload.goal_eco_coin,
        is_active: payload.is_active ?? true,
        image_url: imageUrl,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateCampaign(
    campaignId: string,
    payload: {
      title?: string;
      description?: string;
      goal_eco_coin?: number;
      is_active?: boolean;
      image?: File | null;
      remove_image?: boolean;
    }
  ) {
    let imageUrl: string | null | undefined = undefined;

    if (payload.image || payload.remove_image) {
      const { data: existing, error } = await supabase
        .from("eco_donation_campaigns")
        .select("image_url")
        .eq("id", campaignId)
        .single();

      if (error) throw error;

      if (existing?.image_url) {
        await deleteFile({
          bucket: ENV.BUCKET_CAMPAIGNS,
          publicUrl: existing.image_url,
        });
      }
    }

    if (payload.image) {
      imageUrl = await uploadFile({
        bucket: ENV.BUCKET_CAMPAIGNS,
        folder: ENV.FOLDER_CAMPAIGNS,
        file: payload.image,
      });
    }

    if (payload.remove_image && !payload.image) {
      imageUrl = null;
    }

    const updateData = {
      title: payload.title,
      description: payload.description,
      goal_eco_coin: payload.goal_eco_coin,
      is_active: payload.is_active,
      image_url: imageUrl,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("eco_donation_campaigns")
      .update(updateData)
      .eq("id", campaignId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteCampaign(campaignId: string) {
    const { data: existing } = await supabase
      .from("eco_donation_campaigns")
      .select("image_url")
      .eq("id", campaignId)
      .single();

    if (existing?.image_url) {
      await deleteFile({
        bucket: ENV.BUCKET_CAMPAIGNS,
        publicUrl: existing.image_url,
      });
    }

    const { error } = await supabase
      .from("eco_donation_campaigns")
      .delete()
      .eq("id", campaignId);

    if (error) throw error;
    return true;
  }

  static async getUserRecords(userId: string) {
    const { data, error } = await supabase
      .from("eco_donation_records")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as EcoDonationRecord[];
  }

  static async donate(userId: string, campaignId: string, amount: number) {
    const { error } = await supabase.rpc("donate_to_campaign", {
      p_user_id: userId,
      p_campaign_id: campaignId,
      p_amount: amount,
    });

    if (error) throw error;
  }
}
