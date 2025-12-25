import { supabase } from "@/lib/supabase/client";
import type { EcoDonationCampaign, EcoDonationRecord } from "@/types/donations";

export class DonationService {
  static async getCampaigns({
    search,
    page = 1,
    pageSize = 6,
  }: {
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ data: EcoDonationCampaign[]; total: number }> {
    let query = supabase
      .from("eco_donation_campaigns")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await query.range(from, to);
    if (error) throw error;

    return { data: data ?? [], total: count ?? 0 };
  }

  static async getCampaignByIdWithDonors(campaignId: string): Promise<
    EcoDonationCampaign & {
      donors: {
        id: string;
        auth_id: string | null;
        username: string | null;
        first_name: string | null;
        last_name: string | null;
        avatar_url: string | null;
        role: string | null;
        created_at: string;
        updated_at: string;
        bio: string | null;
        location: string | null;
        amount: number;
      }[];
    }
  > {
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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return { ...campaignData, donors };
  }

  static async getUserRecords(userId: string): Promise<EcoDonationRecord[]> {
    const { data, error } = await supabase
      .from("eco_donation_records")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  static async donate(userId: string, campaignId: string, amount: number) {
    const { error } = await supabase.rpc("donate_to_campaign", {
      p_campaign_id: campaignId,
      p_user_id: userId,
      p_amount: amount,
    });
    if (error) throw error;
    return true;
  }
}
