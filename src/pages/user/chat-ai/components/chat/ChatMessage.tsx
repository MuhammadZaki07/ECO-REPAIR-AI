// src/app/user/scan/components/chat/ChatMessage.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, User, ShieldAlert, Wrench, Cog, Cpu, type JSX } from "lucide-react";
import React from "react";
import type { RepairStep, ChatMessageProps } from "@/types/chat-ai"; // Import interfaces

export const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  text,
  steps,
}) => {
  const tagStyle: Record<RepairStep["tag"], string> = {
    "RISK!": "bg-red-500/20 text-red-400 border-red-400",
    TOOLS: "bg-yellow-500/20 text-yellow-400 border-yellow-400",
    PARTS: "bg-blue-500/20 text-blue-400 border-blue-400",
    STEPS: "bg-emerald-500/20 text-emerald-400 border-emerald-400",
  };

  const tagIcon: Record<RepairStep["tag"], JSX.Element> = {
    "RISK!": <ShieldAlert className="size-3.5" />,
    TOOLS: <Wrench className="size-3.5" />,
    PARTS: <Cog className="size-3.5" />,
    STEPS: <Cpu className="size-3.5" />,
  };

  // USER BUBBLE
  if (type === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[70%] px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border dark:border-neutral-800">
          <p className="text-sm text-black dark:text-white">{text}</p>
        </div>
        <div className="ml-2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center border">
          <User size={16} />
        </div>
      </div>
    );
  }

  // AI BUBBLE + STRUCTURED STEPS
  return (
    <div className="flex justify-start mb-4">
      <div className="mr-3 w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
        <Sparkles className="size-5" />
      </div>

      <Card className="max-w-[80%] bg-neutral-900/60 backdrop-blur-xl border-neutral-700">
        <CardContent className="p-4 space-y-3">
          <p className="text-white font-medium leading-relaxed">{text}</p>
          
          {/* STRUCTURED STEPS CONTAINER */}
          {steps && (
            <div className="space-y-3 pt-3 border-t border-neutral-700/50">
              <h4 className="text-sm font-semibold text-emerald-400">Panduan Perbaikan Terstruktur:</h4>
              
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-neutral-800/40 border border-neutral-700"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1 px-2 py-0.5 border ${tagStyle[s.tag]}`}
                    >
                      {tagIcon[s.tag]}
                      {s.tag}
                    </Badge>
                    <span className="text-white font-semibold text-sm">
                      {s.label}
                    </span>
                  </div>
                  <p className="text-neutral-300 text-xs">{s.detail}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};