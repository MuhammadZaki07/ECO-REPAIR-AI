import { useState, useEffect, useCallback } from "react";
import { UserLevelService, type UserLevel, type UserBadge } from "@/services/UserLevelService";

export const useUserLevel = (userId?: string) => {
  const [level, setLevel] = useState<UserLevel | null>(null);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLevelAndBadges = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const lvl = await UserLevelService.getUserLevel(userId);
      const bds = await UserLevelService.getUserBadges(userId);
      setLevel(lvl);
      setBadges(bds);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchLevelAndBadges();
  }, [fetchLevelAndBadges]);

  return {
    level,
    badges,
    loading,
    refetch: fetchLevelAndBadges,
  };
};
