import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { ChatMessage } from "./ChatMessage";
import { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { ChatContainerProps } from "@/types/chat-ai";
import { TypingAnimation } from "@/components/ui/typing-animation";

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  loading,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const isEmpty = messages.length === 0;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {!isEmpty && (
        <>
          <DottedGlowBackground
            className="absolute inset-0 pointer-events-none"
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

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-neutral-100 via-neutral-100/0 to-neutral-100 dark:from-background/80 dark:via-background/0 dark:to-background/80" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-neutral-100 via-neutral-100/0 to-neutral-100 dark:from-background/80 dark:via-background/0 dark:to-background/80" />

          <span className="absolute inset-0 flex items-center justify-center text-[clamp(4rem,15vw,8rem)] font-bold text-primary/15 select-none pointer-events-none text-center">
            Eco Repair Ai
          </span>
        </>
      )}

      <div className="relative z-10 h-full w-full max-w-7xl custom-scroll mx-auto flex flex-col px-40 pt-18 pb-5 overflow-y-auto space-y-3">
        {isEmpty && (
          <TypingAnimation
            className="text-center font-bold text-5xl text-neutral-700 dark:text-white"
            duration={30}
            showCursor
            blinkCursor
            cursorStyle="line"
          >
            Welcome to Eco Repair AI
          </TypingAnimation>
        )}

        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            id={msg.id}
            type={msg.type}
            text={msg.text}
            image={msg.image}
            data={msg.data}
          />
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="mr-3 w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-700 flex items-center justify-center" />
            <div className="space-y-2 py-2">
              <Skeleton className="h-4 w-48 bg-neutral-800" />
              <Skeleton className="h-4 w-32 bg-neutral-800" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
