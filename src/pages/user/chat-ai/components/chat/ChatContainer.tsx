import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { ChatMessage } from "./ChatMessage";
import { useEffect, useRef } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface ChatContainerProps {
  messages: Message[];
  loading: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  loading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden 
  bg-black/5 dark:bg-black"
    >
      <DottedGlowBackground
        className="absolute inset-0 pointer-events-none w-full h-full"
        opacity={0.8}
        gap={10}
        radius={1.6}
        colorLightVar="--primary"
        glowColorLightVar="--primary-glow"
        colorDarkVar="--primary"
        glowColorDarkVar="--primary-glow"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />

      <div
        className="absolute inset-0 pointer-events-none
  bg-gradient-to-b
    from-neutral-100 via-neutral-100/0 to-neutral-100
  dark:from-black/80 dark:via-black/0 dark:to-black/80"
      />

      <div
        className="absolute inset-0 pointer-events-none
  bg-gradient-to-r
    from-neutral-100 via-neutral-100/0 to-neutral-100
  dark:from-black/80 dark:via-black/0 dark:to-black/80"
      />

      <span
        className="absolute inset-0 flex items-center justify-center 
    text-[clamp(4rem,15vw,8rem)] font-bold text-white/10 select-none pointer-events-none text-center"
      >
        Eco Repair Ai
      </span>

      <div className="relative z-10 h-full w-full max-w-7xl custom-scroll mx-auto flex flex-col px-40 pt-18 pb-5 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <ChatMessage role={msg.role} key={msg.id} {...msg} />
        ))}
        {loading && <div className="text-white">Typing...</div>}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
