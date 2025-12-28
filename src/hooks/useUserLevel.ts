import { useQuery } from "@tanstack/react-query";
import { UserLevelService } from "@/services/UserLevelService";
import type { UserBadge, UserLevel } from "@/types/levelUser";

export const useUserLevel = (userId?: string) => {
  const {
    data,
    isLoading: loading,
    refetch,
  } = useQuery<{
    level: UserLevel | null;
    badges: UserBadge[];
  }>({
    queryKey: ["user-level", userId],
    queryFn: async () => {
      if (!userId) {
        return { level: null, badges: [] };
      }

      const [level, badges] = await Promise.all([
        UserLevelService.getUserLevel(userId),
        UserLevelService.getUserBadges(userId),
      ]);

      return { level, badges };
    },
    enabled: !!userId,
  });

  return {
    level: data?.level ?? null,
    badges: data?.badges ?? [],
    loading,
    refetch,
  };
};
