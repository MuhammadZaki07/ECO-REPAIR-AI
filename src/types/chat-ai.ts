export interface AIStepItem {
  title: string;
  description: string;
}

export interface AIStepSection {
  tag: "RISK!" | "TOOLS" | "STEPS" | "PARTS"; 
  label: string;
  items: AIStepItem[];
}

export interface AIResponse {
  title: string;
  summary: string;
  sections: AIStepSection[];
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
