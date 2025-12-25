import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Sparkles, User, ShieldAlert, Wrench, Cog, Cpu } from "lucide-react";
import React, { useState, type JSX } from "react";
import type { ChatMessageProps, AIStepSection } from "@/types/chat-ai";

export const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  text,
  image,
  data,
}) => {
  const [typingDone, setTypingDone] = useState(false);

  const tagStyle: Record<AIStepSection["tag"], string> = {
    "RISK!": "border-red-400 text-red-400 bg-red-500/30",
    TOOLS: "border-yellow-400 text-yellow-400 bg-yellow-500/30",
    PARTS: "border-blue-400 text-blue-400 bg-blue-500/30",
    STEPS: "border-green-400 text-green-400 bg-green-500/30",
  };

  const tagIcon: Record<AIStepSection["tag"], JSX.Element> = {
    "RISK!": <ShieldAlert className="size-3.5" />,
    TOOLS: <Wrench className="size-3.5" />,
    PARTS: <Cog className="size-3.5" />,
    STEPS: <Cpu className="size-3.5" />,
  };

  const renderParsedText = (content?: string) => {
    if (!content) return null;

    return content.split("\n").map((line, i) => (
      <p key={i} className="leading-relaxed">
        {line
          .split(/(\*\*[^*]+\*\*)/g)
          .map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j}>{part.slice(2, -2)}</strong>
            ) : (
              <span key={j}>{part}</span>
            )
          )}
      </p>
    ));
  };

  if (type === "user") {
    return (
      <div className="flex justify-end gap-2 mb-6">
        <div className="max-w-[70%] space-y-2">
          {image && (
            <img
              src={image}
              alt="User upload"
              className="w-40 rounded-xl border shadow-sm"
            />
          )}

          {text && (
            <div className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
              <div className="text-[1rem] text-black dark:text-white space-y-1">
                {renderParsedText(text)}
              </div>
            </div>
          )}
        </div>

        <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center border">
          <User size={16} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3 mb-8">
      <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
        <Sparkles className="size-5" />
      </div>

      <Card className="max-w-[85%] bg-transparent border-none p-0 pb-5">
        <CardContent className="p- space-y-4 text-neutral-100">
          {data?.title && (
            <h3 className="text-lg font-bold text-white">{data.title}</h3>
          )}

          {!typingDone ? (
            <TypingAnimation
              className="leading-relaxed text-neutral-100"
              duration={18}
              showCursor
              blinkCursor
              cursorStyle="line"
              onComplete={() => setTypingDone(true)}
            >
              {data?.summary ?? ""}
            </TypingAnimation>
          ) : (
            <div className="space-y-2">{renderParsedText(data?.summary)}</div>
          )}

          {typingDone && data?.sections?.length ? (
            <div className="space-y-4 pt-3 border-t border-neutral-700/50">
              {data.sections.map((section, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1 px-2 py-0.5 ${
                        tagStyle[section.tag]
                      }`}
                    >
                      {tagIcon[section.tag]}
                      {section.tag}
                    </Badge>

                    <span className="font-semibold text-white">
                      {section.label}
                    </span>
                  </div>

                  <ul className="space-y-2 pl-1">
                    {section.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="p-3 rounded-lg bg-neutral-900 border border-neutral-700"
                      >
                        <p className="font-medium text-white text-sm">
                          {item.title}
                        </p>
                        <p className="text-neutral-300 text-xs mt-1 whitespace-pre-wrap">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
