import { useState, useEffect, useCallback } from "react";
import type { Forum } from "@/types/forum";
import { supabase } from "@/lib/supabase/client";
import type { SerializedEditorState } from "lexical";
import { ForumService } from "@/services/forumService";

export const useForums = (
  tab: "all" | "my" | "trending" | "solved",
  userId?: string
) => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchForums = useCallback(async () => {
    if (tab === "my" && !userId) return;
    setLoading(true);
    try {
      let data: Forum[] = [];
      switch (tab) {
        case "all":
          data = await ForumService.getForums();
          break;
        case "my":
          data = await ForumService.getForumsByUser(userId!);
          break;
        case "trending":
          data = await ForumService.getTrendingForums();
          break;
        case "solved":
          data = await ForumService.getSolvedForums();
          break;
      }
      setForums(data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [tab, userId]);

  const createForum = useCallback(
    async (
      userId: string,
      title: string,
      category_id: number | string,
      editorState: SerializedEditorState
    ) => {
      const forum = await ForumService.createForum(
        userId,
        title.trim(),
        category_id,
        editorState
      );
      setForums((prev) => [forum, ...prev]);
      return forum;
    },
    []
  );

  const updateForum = useCallback(
    async (
      forumId: string,
      title: string,
      category_id: number | string,
      editorState: SerializedEditorState
    ) => {
      const updated = await ForumService.updateForum(
        forumId,
        title.trim(),
        category_id,
        editorState
      );
      setForums((prev) => prev.map((f) => (f.id === forumId ? updated : f)));
      return updated;
    },
    []
  );

  const deleteForum = useCallback(async (forumId: string) => {
    await ForumService.deleteForum(forumId);
    setForums((prev) => prev.filter((f) => f.id !== forumId));
  }, []);

  useEffect(() => {
    fetchForums();

    const replySub = supabase
      .channel("forum_replies")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "forum_replies" },
        (payload) => {
          setForums((prev) =>
            prev.map((f) =>
              f.id === payload.new.forum_id
                ? { ...f, replies_count: f.replies_count + 1 }
                : f
            )
          );
        }
      )
      .subscribe();

    const likeSub = supabase
      .channel("forum_likes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "forum_likes" },
        (payload) => {
          setForums((prev) =>
            prev.map((f) =>
              f.id === payload.new.forum_id
                ? { ...f, likes_count: f.likes_count + 1 }
                : f
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(replySub);
      supabase.removeChannel(likeSub);
    };
  }, [fetchForums]);

  return {
    forums,
    loading,
    error,
    refetch: fetchForums,
    createForum,
    updateForum,
    deleteForum,
  };
};
