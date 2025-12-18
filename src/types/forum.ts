export type Forum = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category?: string | null;
  status: 'open' | 'solved';
  replies_count: number;
  likes_count?: number;
  created_at: string;
  updated_at: string;
};

export type ForumReply = {
  id: string;
  forum_id: string;
  user_id: string;
  content: string;
  is_solution: boolean;
  created_at: string;
  updated_at: string;
};

export type ForumLike = {
  id: string;
  forum_id?: string;
  reply_id?: string;
  user_id: string;
  created_at: string;
};
