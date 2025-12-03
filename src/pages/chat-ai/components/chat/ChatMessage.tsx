import { Sparkles, User } from "lucide-react";
import React from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  return (
    <div
      className={`flex items-start mb-3 ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {role === "assistant" && (
        <div className="w-10 h-10 rounded-full bg-black border flex items-center justify-center text-white font-bold mr-2 shrink-0">
          <Sparkles className="size-5" strokeWidth={1.5} />
        </div>
      )}

      <div
        className={`max-w-[80%] text-black dark:text-white px-4 py-3 backdrop-blur-xl rounded-lg dark:bg-white/5 bg-black/5 shadow-lg border dark:border-white/50
    ${
      role === "user"
        ? "flex items-center justify-end"
        : "flex items-center justify-start"
    }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>

      {role === "user" && (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold ml-2 shrink-0">
          <User strokeWidth={0.8}/>
        </div>
      )}
    </div>
  );
};
