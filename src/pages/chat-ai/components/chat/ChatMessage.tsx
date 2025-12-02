import React from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] px-4 py-3 shadow-sm ${
        role === 'user'
          ? 'bg-[var(--primary)] text-[var(--primary-foreground)] rounded-2xl rounded-tr-md'
          : 'bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl rounded-tl-md'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};
