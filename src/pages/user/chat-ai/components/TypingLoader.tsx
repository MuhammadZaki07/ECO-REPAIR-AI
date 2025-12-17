import React from 'react';

export const TypingLoader = () => (
  <div className="flex justify-start">
    <div className="bg-[var(--card)] text-[var(--card-foreground)] px-4 py-3 rounded-2xl rounded-tl-md shadow-sm flex items-center gap-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce delay-150"></div>
        <div className="w-2 h-2 bg-[var(--muted)] rounded-full animate-bounce delay-300"></div>
      </div>
      <span className="text-sm text-[var(--muted-foreground)]">Typing...</span>
    </div>
  </div>
);
