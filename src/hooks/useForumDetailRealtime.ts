import { useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { ForumService } from "@/services/forumService";
import type { Forum, ForumReply } from "@/types/forum";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useForumDetailRealtime = (
  forumId: string | number,
  userId?: string
) => {
  const queryClient = useQueryClient();
  const forumKey = ["forum-detail", forumId, userId];
  const statsKey = ["forum-stats", userId];

  /* =========================
   * Forum + Replies
   * ========================= */
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<Forum | null>({
    queryKey: forumKey,
    queryFn: async () => {
      if (forumId === "my") return null;
      return ForumService.getForumByIdWithUserLikes(
        forumId.toString(),
        userId
      );
    },
    enabled: !!forumId,
  });

  /* =========================
   * User Stats
   * ========================= */
  const {
    data: stats = {
      reputation: 0,
      totalReplies: 0,
      totalSolutions: 0,
      openQuestions: 0,
    },
    isLoading: loadingStats,
  } = useQuery({
    queryKey: statsKey,
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return null;

      const { data: replies } = await supabase
        .from("forum_replies")
        .select("is_solution")
        .eq("user_id", userId);

      const { data: openQuestions } = await supabase
        .from("forums")
        .select("id")
        .eq("user_id", userId)
        .neq("status", "solved");

      return {
        reputation: 0,
        totalReplies: replies?.length ?? 0,
        totalSolutions:
          replies?.filter((r) => r.is_solution).length ?? 0,
        openQuestions: openQuestions?.length ?? 0,
      };
    },
  });

  /* =========================
   * Mutations
   * ========================= */
  const invalidateForum = () =>
    queryClient.invalidateQueries({ queryKey: forumKey });

  const addReply = useMutation({
    mutationFn: ({ userId, content }: { userId: string; content: string }) =>
      ForumService.postReply(forumId.toString(), userId, content),
    onSuccess: invalidateForum,
  });

  const updateReply = useMutation({
    mutationFn: ({ replyId, content }: { replyId: string; content: string }) =>
      ForumService.updateReply(replyId, content),
    onSuccess: invalidateForum,
  });

  const deleteReply = useMutation({
    mutationFn: (replyId: string) =>
      ForumService.deleteReply(replyId),
    onSuccess: invalidateForum,
  });

  const toggleLikeForum = useMutation({
    mutationFn: () => {
      if (!data || !userId) return;
      return ForumService.toggleForumLike(data.id, userId);
    },
    onSuccess: invalidateForum,
  });

  const toggleLikeReply = useMutation({
    mutationFn: (replyId: string) => {
      if (!userId) return;
      return ForumService.toggleReplyLike(replyId, userId);
    },
    onSuccess: invalidateForum,
  });

  /* =========================
   * Realtime Supabase
   * ========================= */
  useEffect(() => {
    if (!forumId) return;

    const replySub = supabase
      .channel(`forum_replies_${forumId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "forum_replies",
          filter: `forum_id=eq.${forumId}`,
        },
        invalidateForum
      )
      .subscribe();

    const likeSub = supabase
      .channel(`forum_likes_${forumId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "forum_likes",
          filter: `forum_id=eq.${forumId}`,
        },
        invalidateForum
      )
      .subscribe();

    return () => {
      supabase.removeChannel(replySub);
      supabase.removeChannel(likeSub);
    };
  }, [forumId]);

  return {
    forum: data,
    replies: data?.replies ?? [],
    loading,
    error,

    stats,
    loadingStats,

    addReply: addReply.mutateAsync,
    updateReply: updateReply.mutateAsync,
    deleteReply: deleteReply.mutateAsync,
    toggleLikeForum: toggleLikeForum.mutateAsync,
    toggleLikeReply: toggleLikeReply.mutateAsync,

    refetch,
  };
};
