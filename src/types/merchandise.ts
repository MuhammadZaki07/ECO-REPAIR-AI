export interface UIMerch {
  id: string;
  title: string;
  cost: number;
  stock: number;
  description?: string;
  ecoImpact?: string;
}

export interface EcoMerch {
  id: string;
  title: string;
  description?: string | null;
  cost_eco_coin: number;
  stock: number;
  image_url?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface MerchOrder {
  id: string;
  merchandise_id: string;
  user_id: string;
  address: string;
  note?: string;
  status: string;
  step: number;
  created_at: string;
  updated_at: string;
  merchandise: EcoMerch;
}