import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthContext } from "@/hooks/context/AuthContext";

interface MiningStatus {
  progress: number;
  can_claim: boolean;
  last_claim_date: string | null;
}

export function useDailyMining() {
  const { user } = useAuthContext();
  const [status, setStatus] = useState<MiningStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase.rpc(
      "get_daily_mining_status",
      { p_auth_id: user.id }
    );

    if (error) setError(error.message);
    else setStatus(data);

    setLoading(false);
  };

  const claim = async () => {
    if (!user) return;
    setClaiming(true);

    const { error } = await supabase.rpc(
      "claim_daily_mining_reward",
      { p_auth_id: user.id }
    );

    if (error) {
      setError(error.message);
    } else {
      await fetchStatus(); 
    }

    setClaiming(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return {
    status,
    loading,
    claiming,
    error,
    claim,
    refetch: fetchStatus,
  };
}
