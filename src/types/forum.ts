import type { SerializedEditorState } from "lexical";
import type { LucideIcon } from "lucide-react";

export type Forum = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  status: "open" | "solved";
  replies_count: number;
  likes_count: number | null;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string | null;
  };

  author: {
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
};

export type ForumReply = {
  id: string;
  forum_id: string;
  user_id: string;
  content: string;
  is_solution: boolean;
  created_at: string;
  updated_at: string;
  likes_count: string;
  author?: {
    username: string | null;
    avatar_url: string | null;
  };
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

type ForumPost = {
  id: number | string;
  title: string;
  preview: string;
  category: string;
  status: ForumStatus | string;
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
  activeTab?: string;
  setActiveTab?: (value: string) => void;
  posts?: ForumPost[];
  contributors?: Contributor[];
  onReady?: (refetch: () => void) => void;
};

export type ModalForumsProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  forumId?: string;
  initialTitle?: string;
  initialDescription?: SerializedEditorState;
  initialCategoryId?: number | string | null;
  onSuccess?: () => void;
};
