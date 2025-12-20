import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { ForumService } from "@/services/forumService";
import type { Forum, ForumReply } from "@/types/forum";

export const useForumDetailRealtime = (forumId: string | number) => {
  const [forum, setForum] = useState<Forum | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const forumData = await ForumService.getForumById(forumId.toString());
      setForum(forumData ?? null);
      const repliesData = await ForumService.getReplies(forumId.toString());
      setReplies(repliesData ?? []);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [forumId]);

  const addReply = useCallback(
    async (userId: string, content: string) => {
      const reply = await ForumService.postReply(
        forumId.toString(),
        userId,
        content
      );
      setReplies((prev) => [...prev, reply]);
      return reply;
    },
    [forumId]
  );

  const toggleLikeForum = useCallback(
    async (userId: string) => {
      if (!forum) return;
      try {
        const updatedForum = await ForumService.toggleForumLike(
          forum.id,
          userId
        );
        setForum(updatedForum);
      } catch (e) {
        console.error(e);
      }
    },
    [forum]
  );

  const toggleLikeReply = useCallback(
    async (replyId: string, userId: string) => {
      try {
        const diff = await ForumService.toggleReplyLike(replyId, userId);
        setReplies((prev) =>
          prev.map((r) =>
            r.id === replyId
              ? { ...r, likes_count: Math.max((r.likes_count ?? 0) + diff, 0) }
              : r
          )
        );
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

  const updateReply = useCallback(async (replyId: string, content: string) => {
    const updated = await ForumService.updateReply(replyId, content);
    setReplies((prev) => prev.map((r) => (r.id === replyId ? updated : r)));
    return updated;
  }, []);

  const deleteReply = useCallback(async (replyId: string) => {
    await ForumService.deleteReply(replyId);
    setReplies((prev) => prev.filter((r) => r.id !== replyId));
  }, []);

  useEffect(() => {
    if (!forumId) return;
    fetchData();

    const replySub = supabase
      .channel(`forum_replies_${forumId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "forum_replies",
          filter: `forum_id=eq.${forumId}`,
        },
        (payload) => setReplies((prev) => [...prev, payload.new])
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
    toggleLikeForum,
    toggleLikeReply,
    loading,
    error,
    refetch: fetchData,
  };
};
