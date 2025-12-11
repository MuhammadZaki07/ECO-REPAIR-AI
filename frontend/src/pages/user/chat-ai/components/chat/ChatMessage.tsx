import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, User, ShieldAlert, Wrench, Cog, Cpu } from "lucide-react";
import React from "react";
import type { RepairStep, ChatMessageProps } from "@/types/chat-ai";

export const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  text,
  steps,
  image,
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

  // ===== USER BUBBLE =====
  if (type === "user") {
    return (
      <div className="flex justify-end mb-5">
        <div className="max-w-[70%] flex flex-col gap-2">
          {image && (
            <img src={image} className="w-40 rounded-xl border shadow-sm" />
          )}
          {text && (
            <div className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
              {text.split("\n").map((line, i) => (
                <p key={i} className="text-sm text-black dark:text-white mb-1">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="ml-2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center border">
          <User size={16} />
        </div>
      </div>
    );
  }

  // ===== AI BUBBLE =====
  return (
    <div className="flex justify-start mb-6">
      <div className="mr-3 w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
        <Sparkles className="size-5" />
      </div>

      <Card className="max-w-[80%] bg-neutral-900/60 backdrop-blur-xl border-neutral-700">
        <CardContent className="p-4 space-y-4">
          {/* AI TEXT */}
          {/* AI TEXT */}
          <p className="text-white font-normal leading-relaxed whitespace-pre-wrap">
            {text.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={j}>{part.slice(2, -2)}</strong>;
                  }
                  return part;
                })}
                <br />
              </React.Fragment>
            ))}
          </p>

          {/* STEPS */}
          {steps && steps.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-neutral-700/50">
              <h4 className="text-sm font-semibold text-emerald-400">
                Panduan Perbaikan Terstruktur:
              </h4>
              <ul className="list-disc pl-5 text-neutral-300 space-y-1 text-sm">
                {steps.map((s, i) => (
                  <li key={i}>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 px-2 py-0.5 border ${
                          tagStyle[s.tag]
                        }`}
                      >
                        {tagIcon[s.tag]}
                        {s.tag}
                      </Badge>
                      <span className="font-semibold">{s.label}</span>
                    </div>
                    <p className="text-neutral-300 text-sm ml-9 whitespace-pre-wrap">
                      {s.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
