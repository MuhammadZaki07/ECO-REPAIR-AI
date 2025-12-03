import React, { useState } from "react";
import { Sidebar } from "../../../components/ui/sidebar-user/Sidebar";
import { Header } from "./components/Header";
import { ChatContainer } from "./components/chat/ChatContainer";
import { ChatInput } from "./components/chat/ChatInput";

export default function ScanPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Halo! Saya asisten AI Anda." },
    { id: 2, role: "user", content: "Hai! Bisa bantu jelaskan fitur terbaru?" },
    {
      id: 3,
      role: "assistant",
      content: "Tentu! Sekarang ada background dotted glow di chat.",
    },
    { id: 4, role: "user", content: "Wah keren, bisa tunjukkan contohnya?" },
    {
      id: 5,
      role: "assistant",
      content: "Ini contohnya, chat terlihat lebih modern dengan efek glass.",
    },
    { id: 1, role: "assistant", content: "Halo! Saya asisten AI Anda." },
    { id: 2, role: "user", content: "Hai! Bisa bantu jelaskan fitur terbaru?" },
    {
      id: 3,
      role: "assistant",
      content: "Tentu! Sekarang ada background dotted glow di chat.",
    },
    { id: 4, role: "user", content: "Wah keren, bisa tunjukkan contohnya?" },
    {
      id: 5,
      role: "assistant",
      content: "Ini contohnya, chat terlihat lebih modern dengan efek glass.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSend = () => {
    /* logic sama */
  };
  const handleNewChat = () => {
    /* logic new chat */
  };

  return (
    <div className="flex h-screen p-3 pt-20 dark:bg-black bg-neutral-100">
      {/* {sidebarOpen && <Sidebar onNewChat={handleNewChat} />} */}
      <div className="flex-1 flex flex-col">
        <Header
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <ChatContainer messages={messages} loading={loading} />
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
}
