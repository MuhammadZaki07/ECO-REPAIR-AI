import React, { useState } from 'react';
import { Sidebar } from './components/sidebar/Sidebar';
import { Header } from './components/Header';
import { ChatContainer } from './components/chat/ChatContainer';
import { ChatInput } from './components/chat/ChatInput';


export default function ChatGPTClonePage() {
  const [messages, setMessages] = useState([{ id: 1, role: 'assistant', content: 'Halo! Saya asisten AI Anda.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSend = () => { /* logic sama */ };
  const handleNewChat = () => { /* logic new chat */ };

  return (
    <div className="flex h-screen">
      {sidebarOpen && <Sidebar onNewChat={handleNewChat} />}
      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <ChatContainer messages={messages} loading={loading} />
        <ChatInput input={input} setInput={setInput} handleSend={handleSend} loading={loading} />
      </div>
    </div>
  );
}
