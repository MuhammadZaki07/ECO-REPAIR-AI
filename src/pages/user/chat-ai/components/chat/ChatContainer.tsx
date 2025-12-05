// src/app/user/scan/components/chat/ChatContainer.tsx

import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { EcoCoinRewardCard } from "./EcoCoinRewardCard";
import type { ChatMessageProps } from "@/types/chat-ai";

interface ChatContainerProps {
  messages: ChatMessageProps[];
  isAILoading: boolean;
  diagnosisStage: number; // 1 = Diagnosis Selesai, 0 = Input
  ecoCoinReward: number | null;
  isClaimed: boolean;
  onClaim: () => void;
}

export const ChatContainer = ({
  messages,
  isAILoading,
  diagnosisStage,
  ecoCoinReward,
  isClaimed,
  onClaim,
}: ChatContainerProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAILoading]);

  return (
    <div className="relative h-full w-full overflow-y-auto custom-scroll px-10 py-6 space-y-4 dark:bg-black">
      
      {messages.map((msg) => (
        <ChatMessage key={msg.id} {...msg} />
      ))}

      {isAILoading && (
        <div className="flex justify-start">
             <div className="w-fit max-w-xs p-3 rounded-lg bg-neutral-900/60 backdrop-blur-xl border-neutral-700 ml-12 animate-pulse">
                <span className="text-emerald-400 font-medium">EcoRepair AI sedang menganalisis...</span>
            </div>
        </div>
      )}

      {/* TAMPILKAN KARTU REWARD ECO COIN SECARA KONDISIONAL */}
      {diagnosisStage === 1 && ecoCoinReward && !isClaimed && (
        <EcoCoinRewardCard reward={ecoCoinReward} onClaim={onClaim} />
      )}
      
      {/* Pesan Selesai Klaim */}
      {isClaimed && (
        <div className="flex justify-center mt-6">
            <p className="text-neutral-400 italic text-sm">✅ Koin berhasil diklaim. Cek saldo Anda di halaman Eco Coin!</p>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};