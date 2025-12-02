import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingLoader } from '../TypingLoader';

interface ChatContainerProps {
  messages: { id: number; role: 'user' | 'assistant'; content: string }[];
  loading: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ messages, loading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map(msg => <ChatMessage key={msg.id} role={msg.role} content={msg.content} />)}
        {loading && <TypingLoader />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
