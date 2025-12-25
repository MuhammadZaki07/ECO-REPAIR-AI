export interface EcoLevel {
  id: number;
  name: string;
  required_ec_coin: number;
}

export interface UserLevel {
  user_id: string;
  level_id?: {
    name: string;
    badge: string;
    min_total_eco: string;
  };
  level_name?: string;
  updated_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge: string;
  created_at: string;
}
