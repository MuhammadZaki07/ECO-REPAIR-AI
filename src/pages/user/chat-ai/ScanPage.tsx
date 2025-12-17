import { useState } from "react";
import { ChatContainer } from "./components/chat/ChatContainer";
import { ChatInput } from "./components/chat/ChatInput";
import type { ChatMessageProps } from "@/types/chat-ai";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/context/AuthContext";
import { useCreateDiagnosis } from "@/hooks/useDiagnosis";
import { supabase } from "@/lib/supabase/client";

const DUMMY_AI_RESPONSE = {
  title: "Hasil Diagnosis Perangkat",
  summary:
    "Halo! Dari informasi yang kamu kirim, ada indikasi masalah ringan yang masih bisa ditangani sendiri. Ikuti langkah berikut ya.",
  sections: [
    {
      tag: "RISK!",
      label: "Risiko Jika Dibiarkan",
      items: [
        {
          title: "Kerusakan Bertambah",
          description:
            "Jika tidak segera ditangani, masalah ringan bisa berkembang menjadi kerusakan yang lebih serius.",
        },
      ],
    },
    {
      tag: "TOOLS",
      label: "Alat yang Dibutuhkan",
      items: [
        {
          title: "Obeng kecil",
          description:
            "Digunakan untuk membuka casing perangkat bila diperlukan.",
        },
      ],
    },
    {
      tag: "STEPS",
      label: "Langkah Perbaikan",
      items: [
        {
          title: "Periksa kondisi fisik",
          description:
            "Pastikan tidak ada bagian yang retak, longgar, atau terbakar.",
        },
        {
          title: "Restart perangkat",
          description:
            "Matikan perangkat sepenuhnya lalu nyalakan kembali setelah beberapa menit.",
        },
      ],
    },
    {
      tag: "PARTS",
      label: "Komponen yang Perlu Dicek",
      items: [
        {
          title: "Kabel daya",
          description:
            "Pastikan kabel tidak terkelupas dan terhubung dengan baik.",
        },
      ],
    },
  ],
};

export default function ScanPage() {
  const { user, loading: isAuthLoading } = useAuthContext();
  const currentUserId = user?.id;
  const isLoggedIn = !!user;
  const SUPABASE_BASE_URL = import.meta.env.VITE_SUPABASE_EDGE_FUNCTION_URL;
  const { create } = useCreateDiagnosis();
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isAILoading, setIsAILoading] = useState(false);

  const handleSendDumy = async () => {
    if (!input.trim() && files.length === 0) return;
    if (!isLoggedIn || !currentUserId) {
      alert("Anda harus login untuk membuat diagnosis.");
      return;
    }

    const userText = input;
    const imagePreview = files.length > 0 ? URL.createObjectURL(files[0]) : null;
    setMessages(prev => [...prev, { id: Date.now(), type: "user", text: userText, image: imagePreview }]);
    setInput("");
    setFiles([]);
    setIsAILoading(true);

    setTimeout(async () => {
      let aiDataResult;
      try {
        aiDataResult = JSON.parse(JSON.stringify(DUMMY_AI_RESPONSE));
      } catch {
        aiDataResult = { title: "Terjadi Kesalahan", summary: "Dummy AI gagal diparse.", sections: [] };
      }
      setMessages(prev => [...prev, { id: Date.now() + 1, type: "ai", data: aiDataResult }]);
      if (aiDataResult) await create(currentUserId, userText, aiDataResult);
      setIsAILoading(false);
    }, 1500);
  };

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;
    if (!isLoggedIn || !currentUserId) {
      alert("Anda harus login untuk membuat diagnosis dan menyimpan riwayat.");
      return;
    }

    const currentInput = input;
    setMessages(prev => [...prev, { id: Date.now(), type: "user", text: currentInput, image: files.length > 0 ? URL.createObjectURL(files[0]) : null }]);
    setInput("");
    setFiles([]);
    setIsAILoading(true);

    let imageBase64: string | null = null;
    if (files.length > 0) {
      const reader = new FileReader();
      imageBase64 = await new Promise(resolve => {
        reader.onloadend = () => resolve(reader.result?.toString().split(",")[1] || "");
        reader.readAsDataURL(files[0]);
      });
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${SUPABASE_BASE_URL}/functions/v1/generate-diagnosis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ description: currentInput, imageBase64 }),
      });

      const result = await res.json();
      if (!result.success) {
        setMessages(prev => [...prev, { id: Date.now() + 1, type: "ai", data: { title: "", summary: "Maaf ya server AI lagi sibuk. Coba lagi beberapa saat nanti.", sections: [] } }]);
        return;
      }

      const aiDataResult = result.data;
      setMessages(prev => [...prev, { id: Date.now() + 1, type: "ai", data: aiDataResult }]);
      await create(currentUserId, currentInput, aiDataResult);
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: "ai", data: { title: "", summary: "Koneksi ke AI gagal Cek internet kamu atau coba lagi nanti.", sections: [] } }]);
    } finally {
      setIsAILoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex flex-col gap-4 p-6 pt-24 max-w-xl mx-auto">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-5/6 rounded-xl" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen p-10 pt-20">
        <p className="text-center text-xl">
          Silakan <span className="font-bold">login</span> untuk menggunakan fitur diagnosis.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen p-3 pt-20 bg-neutral-100 dark:bg-black overflow-hidden">
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
