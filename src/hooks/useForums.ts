import { useState, useEffect, useCallback } from 'react';
import type { Forum, ForumReply, ForumLike } from '@/types/forum';
import { supabase } from '@/lib/supabase/client';

export const useForums = () => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchForums = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from<Forum>('forums')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setForums(data || []);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchForums();

    // real-time listener untuk replies count & likes count
    const replySub = supabase
      .channel('forum_replies')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'forum_replies' }, (payload) => {
        setForums((prev) =>
          prev.map((f) =>
            f.id === payload.new.forum_id
              ? { ...f, replies_count: f.replies_count + 1 }
              : f
          )
        );
      })
      .subscribe();

    const likeSub = supabase
      .channel('forum_likes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'forum_likes' }, (payload) => {
        setForums((prev) =>
          prev.map((f) =>
            f.id === payload.new.forum_id
              ? { ...f, likes_count: f.likes_count + 1 }
              : f
          )
        );
      })
      .subscribe();

    return () => {
      supabase.removeChannel(replySub);
      supabase.removeChannel(likeSub);
    };
  }, [fetchForums]);

  return { forums, loading, error, refetch: fetchForums };
};

export const useForumDetailRealtime = (forumId: string) => {
  const [forum, setForum] = useState<Forum | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: forumData, error: forumError } = await supabase
        .from<Forum>('forums')
        .select('*')
        .eq('id', forumId)
        .single();
      if (forumError) throw forumError;
      setForum(forumData);

      const { data: repliesData, error: repliesError } = await supabase
        .from<ForumReply>('forum_replies')
        .select('*')
        .eq('forum_id', forumId)
        .order('created_at', { ascending: true });
      if (repliesError) throw repliesError;
      setReplies(repliesData || []);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [forumId]);

  const addReply = useCallback(async (userId: string, content: string) => {
    const { data, error } = await supabase
      .from<ForumReply>('forum_replies')
      .insert([{ forum_id: forumId, user_id: userId, content }])
      .select()
      .single();
    if (error) throw error;
    setReplies((prev) => [...prev, data]);
    return data;
  }, [forumId]);

  const likeForum = useCallback(async (userId: string) => {
    if (!forum) return;
    const { data, error } = await supabase
      .from<ForumLike>('forum_likes')
      .insert([{ forum_id: forumId, user_id }])
      .select()
      .single();
    if (error) throw error;
    setForum((prev) => prev ? { ...prev, likes_count: prev.likes_count + 1 } : prev);
    return data;
  }, [forum, forumId]);

  const likeReply = useCallback(async (replyId: string, userId: string) => {
    const { data, error } = await supabase
      .from<ForumLike>('forum_reply_likes')
      .insert([{ reply_id: replyId, user_id }])
      .select()
      .single();
    if (error) throw error;
    setReplies((prev) =>
      prev.map((r) => r.id === replyId ? { ...r, likes_count: (r.likes_count || 0) + 1 } : r)
    );
    return data;
  }, []);

  useEffect(() => {
    if (!forumId) return;
    fetchData();

    const replySub = supabase
      .channel('forum_replies_detail')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'forum_replies', filter: `forum_id=eq.${forumId}` }, (payload) => {
        setReplies((prev) => [...prev, payload.new]);
      })
      .subscribe();

    const likeSub = supabase
      .channel('forum_likes_detail')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'forum_likes', filter: `forum_id=eq.${forumId}` }, (payload) => {
        setForum((prev) => prev ? { ...prev, likes_count: prev.likes_count + 1 } : prev);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(replySub);
      supabase.removeChannel(likeSub);
    };
  }, [forumId, fetchData]);

  return { forum, replies, loading, error, refetch: fetchData, addReply, likeForum, likeReply };
};
