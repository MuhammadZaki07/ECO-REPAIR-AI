export interface AISectionItem {
  title: string;
  description: string;
}

export interface AISection {
  type: "analysis" | "impact" | "application" | "risk" | "next";
  label: string;
  items: AISectionItem[];
}

export interface AIResponse {
  title: string;
  summary: string;
  sections: AISection[];
}

export interface ChatMessageProps {
  id: number;
  type: "user" | "ai";
  text?: string;
  image?: string | null;
  data?: AIResponse;
}

export interface ChatContainerProps {
  messages: ChatMessageProps[];
  loading: boolean;
}
