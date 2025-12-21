import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { ForumService } from "@/services/forumService";
import type { Forum, ForumReply } from "@/types/forum";

export const useForumDetailRealtime = (
  forumId: string | number,
  userId?: string
) => {
  const [forum, setForum] = useState<Forum | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (forumId === "my") {
      setForum(null);
      setReplies([]);
      return;
    }
    setLoading(true);
    try {
      const data = await ForumService.getForumByIdWithUserLikes(
        forumId.toString(),
        userId
      );
      setForum(data);
      setReplies(data.replies);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [forumId, userId]);

  const [stats, setStats] = useState({
    reputation: 0,
    totalReplies: 0,
    totalSolutions: 0,
    openQuestions: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoadingStats(true);

    const fetchStats = async () => {
      try {
        const { data: replyData, error: replyError } = await supabase
          .from("forum_replies")
          .select("id, is_solution, forum_id")
          .eq("user_id", userId);
        if (replyError) throw replyError;
        const totalReplies = replyData?.length || 0;
        const totalSolutions =
          replyData?.filter((r) => r.is_solution).length || 0;

        const { data: openQuestions, error: openError } = await supabase
          .from("forums")
          .select("id")
          .eq("user_id", userId)
          .neq("status", "solved");
        if (openError) throw openError;
        const openQuestionsCount = openQuestions?.length || 0;

        setStats({
          reputation: 0,
          totalReplies,
          totalSolutions,
          openQuestions: openQuestionsCount,
        });
      } catch {
        setStats({
          reputation: 0,
          totalReplies: 0,
          totalSolutions: 0,
          openQuestions: 0,
        });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [userId]);

  const addReply = useCallback(
    async (userId: string, content: string) => {
      await ForumService.postReply(forumId.toString(), userId, content);
      fetchData();
    },
    [forumId, fetchData]
  );

  const toggleLikeForum = useCallback(async () => {
    if (!forum || !userId) return;
    await ForumService.toggleForumLike(forum.id, userId);
    fetchData();
  }, [forum, userId, fetchData]);

  const toggleLikeReply = useCallback(
    async (replyId: string) => {
      if (!userId) return;
      await ForumService.toggleReplyLike(replyId, userId);
      fetchData();
    },
    [userId, fetchData]
  );

  const updateReply = useCallback(
    async (replyId: string, content: string) => {
      await ForumService.updateReply(replyId, content);
      fetchData();
    },
    [fetchData]
  );

  const deleteReply = useCallback(
    async (replyId: string) => {
      await ForumService.deleteReply(replyId);
      fetchData();
    },
    [fetchData]
  );

  useEffect(() => {
    if (!forumId) return;
    fetchData();

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
        fetchData
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
        fetchData
      )
      .subscribe();

    return () => {
      supabase.removeChannel(replySub);
      supabase.removeChannel(likeSub);
    };
  }, [forumId, fetchData]);

  return {
    forum,
    replies,
    addReply,
    updateReply,
    deleteReply,
    stats,
    loadingStats,
    toggleLikeForum,
    toggleLikeReply,
    loading,
    error,
    refetch: fetchData,
  };
};
