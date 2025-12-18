import type { LucideIcon } from "lucide-react";

export type Forum = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category?: string | null;
  status: "open" | "solved";
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

export type ForumStatItem = {
  label: string;
  value: string;
  icon: LucideIcon;
  colorClass: string;
};

export type ForumStatsProps = {
  stats: ForumStatItem[];
};

export type ForumStatus = "solved" | "open";

export type ForumPost = {
  id: number | string;
  title: string;
  preview: string;
  category: string;
  status: ForumStatus;
  time: string;
  author: string;
  replies: number | string;
  likes: number | string;
};

export type Contributor = {
  name: string;
  avatar: string;
  points: string;
};

export type ForumPostListProps = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  posts: ForumPost[];
  contributors: Contributor[];
};
