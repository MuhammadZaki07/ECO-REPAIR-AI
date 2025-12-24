import { EcoWalletService } from "@/services/EcoWalletService";
import { useCallback, useEffect, useState } from "react";

export const useEcoWallet = (userId?: string) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWallet = useCallback(async () => {
    if (!userId) {
      setBalance(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const wallet = await EcoWalletService.getWallet(userId);
      setBalance(wallet.balance);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  return {
    balance,
    loading,
    error,
    refetch: fetchWallet,
  };
};
