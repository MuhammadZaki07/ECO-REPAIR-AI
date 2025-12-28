import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Forum } from "@/types/forum";
import { ForumService } from "@/services/forumService";
import { supabase } from "@/lib/supabase/client";
import type { SerializedEditorState } from "lexical";
import { ENV } from "@/env";

export const useForums = (
  tab: "all" | "my" | "trending" | "solved",
  userId?: string
) => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = ENV.PAGE_SIZE;

  const forumsQuery = useQuery({
    queryKey: ["forums", tab, page, search, userId],
    queryFn: async () => {
      switch (tab) {
        case "all":
          return ForumService.getForums({ page, pageSize, search });
        case "my":
          if (!userId) return { data: [], total: 0 };
          return ForumService.getForumsByUser(userId, {
            page,
            pageSize,
            search,
          });
        case "trending":
          return ForumService.getTrendingForums({ page, pageSize });
        case "solved":
          return ForumService.getSolvedForums({ page, pageSize });
      }
    },
    keepPreviousData: true,
    enabled: tab !== "my" || !!userId,
  });

  const createForum = useMutation({
    mutationFn: ({
      userId,
      title,
      category_id,
      editorState,
    }: {
      userId: string;
      title: string;
      category_id: number | string;
      editorState: SerializedEditorState;
    }) =>
      ForumService.createForum(
        userId,
        title.trim(),
        category_id,
        editorState
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forums"] });
    },
  });

  const updateForum = useMutation({
    mutationFn: ({
      forumId,
      title,
      category_id,
      editorState,
    }: {
      forumId: string;
      title: string;
      category_id: number | string;
      editorState: SerializedEditorState;
    }) =>
      ForumService.updateForum(
        forumId,
        title.trim(),
        category_id,
        editorState
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forums"] });
    },
  });

  const deleteForum = useMutation({
    mutationFn: (forumId: string) =>
      ForumService.deleteForum(forumId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forums"] });
    },
  });

  useEffect(() => {
    const replySub = supabase
      .channel("forum_replies")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "forum_replies" },
        (payload) => {
          queryClient.setQueriesData(
            { queryKey: ["forums"] },
            (old: any) => {
              if (!old?.data) return old;
              return {
                ...old,
                data: old.data.map((f: Forum) =>
                  f.id === payload.new.forum_id
                    ? { ...f, replies_count: f.replies_count + 1 }
                    : f
                ),
              };
            }
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
          queryClient.setQueriesData(
            { queryKey: ["forums"] },
            (old: any) => {
              if (!old?.data) return old;
              return {
                ...old,
                data: old.data.map((f: Forum) =>
                  f.id === payload.new.forum_id
                    ? { ...f, likes_count: f.likes_count + 1 }
                    : f
                ),
              };
            }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(replySub);
      supabase.removeChannel(likeSub);
    };
  }, [queryClient]);

  return {
    forums: forumsQuery.data?.data ?? [],
    total: forumsQuery.data?.total ?? 0,
    loading: forumsQuery.isLoading,
    error: forumsQuery.error,

    page,
    pageSize,
    search,
    setPage,
    setSearch,

    refetch: forumsQuery.refetch,

    createForum: createForum.mutateAsync,
    updateForum: updateForum.mutateAsync,
    deleteForum: deleteForum.mutateAsync,
  };
};
