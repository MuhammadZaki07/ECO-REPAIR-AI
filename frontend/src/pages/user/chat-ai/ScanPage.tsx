import { useState } from "react";
import { Header } from "./components/Header";
import { ChatContainer } from "./components/chat/ChatContainer";
import { ChatInput } from "./components/chat/ChatInput";
import type { ChatMessageProps } from "@/types/chat-ai";

const DUMMY_MESSAGES_INITIAL: ChatMessageProps[] = [
  {
    id: 1,
    type: "user",
    text: "Saya punya masalah dengan charger laptop. Lampu indikatornya mati total. Ini fotonya.",
  },
  {
    id: 2,
    type: "ai",
    text: "Analisis: Berdasarkan foto dan deskripsi, kemungkinan besar terjadi kegagalan pada kapasitor primer atau fuse putus. Perbaikan ini memerlukan keahlian solder dan alat ukur. Prioritaskan keselamatan!",
    steps: [
      {
        label: "Identifikasi Risiko Utama",
        detail:
          "Jangan pernah membuka charger jika masih terhubung ke listrik. Kapasitor internal masih dapat menyimpan muatan berbahaya. Selalu buang muatan kapasitor primer terlebih dahulu.",
        tag: "RISK!",
      },
      {
        label: "Alat yang Dibutuhkan",
        detail: "Solder station, Multimeter, Solder Wick, dan obeng set T8.",
        tag: "TOOLS",
      },
      {
        label: "Langkah Pembongkaran",
        detail:
          "Buka casing charger dengan hati-hati menggunakan alat pemisah plastik. Jangan merusak papan sirkuit di dalamnya.",
        tag: "STEPS",
      },
      {
        label: "Komponen Pengganti",
        detail: "Siapkan fuse 5A/250V dan kapasitor 400V/68uF low ESR.",
        tag: "PARTS",
      },
    ],
  },
];

export default function ScanPage() {
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    DUMMY_MESSAGES_INITIAL
  );
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [isAILoading, setIsAILoading] = useState(false);
  const [diagnosisStage, setDiagnosisStage] = useState(1);
  const [ecoCoinReward, setEcoCoinReward] = useState<number | null>(500);
  const [isClaimed, setIsClaimed] = useState(false);

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;

    const userMessage: ChatMessageProps = {
      id: Date.now(),
      type: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setFiles([]);
    setDiagnosisStage(0);
    setIsClaimed(false);
    setIsAILoading(true);

    // Convert image to Base64
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
        text: data.analysisSummary || "Tidak ada ringkasan.",
        steps: data.steps || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
      setDiagnosisStage(1);
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

  const handleClaimCoins = () => {
    alert(`Sukses! ${ecoCoinReward} Eco Coins ditambahkan ke saldo Anda.`);
    setIsClaimed(true);
  };

  return (
    <div className="flex h-screen p-3 pt-20 dark:bg-black bg-neutral-100">
      <div className="flex-1 flex flex-col h-full">
        <Header />
        <ChatContainer
          messages={messages}
          isAILoading={isAILoading}
          diagnosisStage={diagnosisStage}
          ecoCoinReward={ecoCoinReward}
          isClaimed={isClaimed}
          onClaim={handleClaimCoins}
        />
        <ChatInput
          input={input}
          files={files}
          setFiles={setFiles}
          setInput={setInput}
          handleSend={handleSend}
          loading={isAILoading}
        />
      </div>
    </div>
  );
}
