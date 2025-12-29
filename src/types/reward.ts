export type RewardType = "voucher" | "merchandise";
export interface Reward {
  id: string;
  type: RewardType;
  title: string;
  description?: string;
  cost_eco_coin: number;
  stock?: number | null;
  is_active: boolean;
  created_at: string;
}
