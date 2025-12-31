import type { SerializedEditorState } from "lexical";
import type { ZodType } from "zod";
export interface Guide {
  id: string;
  created_at: string;
  title: string;
  content?: string;
  category?: string;
  image_url?: string;
}

export interface GuidePayload {
  title: string;
  category_id: number;
  content: SerializedEditorState;
  image_file?: File | null;
  remove_image?: boolean;
}

export interface GuideForm {
  title: string;
  category_id: number | null;
  content?: any;
  image_file?: File | null;
  remove_image?: boolean;
}

export interface GuideModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialData?: Guide | null;
  onSubmit: (data: GuideForm) => void;
  onSuccess?: () => void;
  schema: ZodType<GuideForm>;
  categories?: { id: number; name: string }[];
}
