import { useState } from "react";
import { ChatContainer } from "./components/chat/ChatContainer";
import { ChatInput } from "./components/chat/ChatInput";
import type { ChatMessageProps } from "@/types/chat-ai";

export default function ScanPage() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isAILoading, setIsAILoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;

    const userMessage: ChatMessageProps = {
      id: Date.now(),
      type: "user",
      text: input,
      image: files.length > 0 ? URL.createObjectURL(files[0]) : null,
    };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setFiles([]);
    setIsAILoading(true);

    let imageBase64: string | null = null;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      imageBase64 = await new Promise((resolve) => {
        reader.onloadend = () =>
          resolve(reader.result?.toString().split(",")[1] || "");
        reader.readAsDataURL(file);
      });
    }

    try {
      const res = await fetch("http://localhost:3001/api/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: input,
          imageBase64,
        }),
      });

      const data = await res.json();

      const aiMessage: ChatMessageProps = {
        id: Date.now() + 1,
        type: "ai",
        text: data.aiResponse || "AI tidak memberikan respons.",
        steps: [],
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          text: "Terjadi error saat memproses AI.",
        },
      ]);
    }

    setIsAILoading(false);
  };

  return (
    <div className="flex h-screen p-3 pt-20 dark:bg-black bg-neutral-100">
      <div className="flex-1 flex flex-col h-full">
        <ChatContainer messages={messages} loading={isAILoading} />
        <ChatInput
          input={input}
          files={files}
          setFiles={setFiles}
          setInput={setInput}
          handleSend={handleSend}
          loading={isAILoading}
          hasMessages={messages.length > 0}
        />
      </div>
    </div>
  );
}
