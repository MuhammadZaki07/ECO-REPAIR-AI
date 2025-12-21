import React, { useRef, useLayoutEffect } from "react";
import { Send, Paperclip, X, Loader2, FileText } from "lucide-react";
import { IconFileTypeXls, IconFileWord, IconPdf } from "@tabler/icons-react";
import type { ChatInputProps } from "@/types/chat-ai";

const getFileIcon = (type: string) => {
  if (type.includes("pdf")) return <IconPdf />;
  if (type.includes("word") || type.includes("doc")) return <IconFileWord />;
  if (type.includes("sheet") || type.includes("excel") || type.includes("xls"))
    return <IconFileTypeXls />;
  return null;
};

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSend,
  loading,
  files,
  setFiles,
  hasMessages,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "24px";
    el.style.height = el.scrollHeight + "px";
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (loading) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const filtered = selected.filter(
      (f) => f.type.startsWith("image/") || f.type.startsWith("application/")
    );
    const total = [...files, ...filtered].slice(0, 5);
    setFiles(total);
  };

  const removeOne = (i: number) =>
    setFiles(files.filter((_, idx) => idx !== i));

  const clearAll = () => setFiles([]);

  const isImage = (f: File) => f.type.startsWith("image/");

  const showButtonsBelow = () => {
    const h = textareaRef.current?.scrollHeight || 24;
    return h > 36;
  };

  return (
    <div className="px-4 py-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {files.length === 1 && (
          <div className="relative inline-block">
            <button
              onClick={clearAll}
              className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow"
            >
              <X size={13} />
            </button>

            {isImage(files[0]) ? (
              <img
                src={URL.createObjectURL(files[0])}
                className="w-24 h-24 object-cover rounded-lg"
              />
            ) : (
              <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex flex-col items-center justify-center p-2 text-[10px] text-center">
                {getFileIcon(files[0].type) || <FileText size={22} />}
                <span className="truncate w-full">{files[0].name}</span>
              </div>
            )}
          </div>
        )}

        {files.length > 1 && (
          <div className="relative p-3 border rounded-xl bg-neutral-100 dark:bg-neutral-900 space-y-2">
            <button
              onClick={clearAll}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
            >
              <X size={14} />
            </button>

            <div className="flex flex-wrap gap-3">
              {files.map((f, i) => (
                <div key={i} className="relative">
                  <button
                    onClick={() => removeOne(i)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full"
                  >
                    <X size={12} />
                  </button>

                  {isImage(f) ? (
                    <img
                      src={URL.createObjectURL(f)}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-800 rounded-lg flex flex-col items-center justify-center p-1 text-[9px] text-center">
                      {getFileIcon(f.type) || <FileText size={16} />}
                      <span className="truncate w-full">{f.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 bg-neutral-200 dark:bg-black border rounded-2xl px-4 py-3 shadow-sm">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Type your message..."
            rows={1}
            className={`w-full bg-transparent border-none outline-none resize-none text-sm max-h-40 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />

          <div
            className={`flex w-full justify-between items-center transition-all ${
              showButtonsBelow() ? "flex-row" : "flex-row"
            }`}
          >
            <div className={`flex items-center gap-2 transition-all`}>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className={`p-2 rounded-lg transition ${
                  loading
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                <Paperclip size={20} />
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={(input.trim() === "" && files.length === 0) || loading}
              className={`p-2 px-3 rounded-xl transition-all ${
                !loading && (input.trim() || files.length > 0)
                  ? "text-white bg-sidebar shadow"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed"
              }`}
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept="image/*,application/*"
            onChange={handleFileChange}
          />
        </div>

        <p className="text-xs text-[var(--muted-foreground)] text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};
