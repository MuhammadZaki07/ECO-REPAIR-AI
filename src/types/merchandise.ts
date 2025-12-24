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