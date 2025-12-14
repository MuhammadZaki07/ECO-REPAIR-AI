import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ChatMessageProps } from "@/types/chat-ai";

export const ChatMessage = ({ type, text, image, data }: ChatMessageProps) => {
  if (type === "user") {
    return (
      <div className="flex justify-end">
        <Card className="max-w-lg bg-primary text-primary-foreground">
          <CardContent className="p-4 space-y-2">
            {text && <p>{text}</p>}

            {image && (
              <img
                src={image}
                alt="User upload"
                className="rounded-lg max-h-60 object-cover border border-white/20"
              />
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  const typeBadge: Record<string, string> = {
    analysis: "bg-blue-500/20 text-blue-400",
    impact: "bg-green-500/20 text-green-400",
    application: "bg-emerald-500/20 text-emerald-400",
    risk: "bg-red-500/20 text-red-400",
    next: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <div className="flex justify-start">
      <Card className="max-w-3xl bg-neutral-900/80 border-neutral-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg">{data.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {data.summary}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {data.sections.map((section) => (
            <div key={section.label} className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={typeBadge[section.type]}
                >
                  {section.label}
                </Badge>
              </div>

              <Separator />

              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-lg bg-black/30 p-3"
                  >
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {data.sections.length === 0 && (
            <p className="italic text-sm text-muted-foreground">
              Analisis belum tersedia atau data tidak cukup.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
