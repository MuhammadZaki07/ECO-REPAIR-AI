import React, { useRef } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;
  loading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSend, loading }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 dark:bg-black bg-neutral-200 border rounded-2xl px-4 py-3 shadow-sm">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan Anda..."
            rows={1}
            className="flex-1 bg-transparent border-none outline-none resize-none text-[var(--foreground)] placeholder-[var(--muted-foreground)] text-sm max-h-32"
            style={{ minHeight: '24px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`p-2 rounded-xl transition-all ${
              input.trim() && !loading
                ? 'bg-[var(--primary)] hover:brightness-110 text-[var(--primary-foreground)] shadow-md'
                : 'bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-[var(--muted-foreground)] text-center mt-2">
          Tekan Enter untuk kirim, Shift + Enter untuk baris baru
        </p>
      </div>
    </div>
  );
};
