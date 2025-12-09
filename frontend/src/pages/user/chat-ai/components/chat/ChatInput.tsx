import React, { useRef } from "react";
import { Send, Paperclip, X, Loader2, FileText, FileImage } from "lucide-react";
import { IconFileTypeXls, IconFileWord, IconPdf } from "@tabler/icons-react";

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  handleSend: () => void;
  loading: boolean;

  files: File[];
  setFiles: (val: File[]) => void;
}

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
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

  return (
    <div className="px-4 py-4">
      <div className="max-w-3xl mx-auto space-y-3">
        {files.length === 1 && (
          <div className="relative inline-block">
            <button
              onClick={clearAll}
              className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700"
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
                {getFileIcon(files[0].type) ? (
                  <>
                    {getFileIcon(files[0].type)}
                  </>
                ) : (
                  <FileText size={22} className="mb-1" />
                )}
                <span className="truncate w-full">{files[0].name}</span>
              </div>
            )}
          </div>
        )}

        {files.length > 1 && (
          <div className="relative p-3 border rounded-xl bg-neutral-100 dark:bg-neutral-900 space-y-2">
            <button
              onClick={clearAll}
              className="absolute top-2 cursor-pointer right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700"
            >
              <X size={14} />
            </button>

            <div className="flex flex-wrap gap-3">
              {files.map((f, i) => (
                <div key={i} className="relative">
                  <button
                    onClick={() => removeOne(i)}
                    className="absolute -top-2 -right-2 cursor-pointer bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
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
                      {getFileIcon(f.type) ? (
                        <>
                          {getFileIcon(files[0].type)}
                        </>
                      ) : (
                        <FileText size={16} className="mb-1" />
                      )}
                      <span className="truncate w-full">{f.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 dark:bg-black bg-neutral-200 border rounded-2xl px-4 py-3 shadow-sm">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-800 transition"
          >
            <Paperclip size={20} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept="image/*,application/*"
            onChange={handleFileChange}
          />

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan Anda..."
            rows={1}
            className="flex-1 bg-transparent border-none outline-none resize-none text-sm max-h-32"
            style={{ minHeight: "24px" }}
          />

          <button
            onClick={handleSend}
            disabled={(input.trim() === "" && files.length === 0) || loading}
            className={`p-2 px-3 rounded-xl transition-all ${
              !loading && (input.trim() || files.length > 0)
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow"
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

        <p className="text-xs text-[var(--muted-foreground)] text-center">
          Tekan Enter untuk kirim, Shift + Enter untuk baris baru
        </p>
      </div>
    </div>
  );
};
