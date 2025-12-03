// src/pages/ScanPage.tsx (FINAL VERSION - Integrated)

"";

import React, { useState, useCallback, useRef } from "react";
import {
  IconUpload,
  IconSend,
  IconPlus,
  IconX,
  IconBolt,
  IconRefresh,
  IconChevronDown,
  IconPaperclip,
  IconCode,
  IconWorld,
  IconHistory,
  IconWand,
  IconDeviceLaptop,
  IconUser,
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; // Asumsi classnames utility
import { Header } from "@/components/layout/header/header";

// --- TIPE DATA & SIMULASI ---
interface Step {
  label: string;
  detail: string;
  tag?: string;
  color?: string;
}
interface ChatMessage {
  id: number;
  type: "ai" | "user";
  text: string;
  structured: boolean;
  steps?: Step[];
}

const SIMULATION_HISTORY: ChatMessage[] = [
  {
    id: 1,
    type: "ai",
    text: "Halo! Saya EcoRepair AI. Saya siap membantu diagnosis. Silakan unggah foto kerusakan atau jelaskan masalahnya untuk memulai.",
    structured: false,
  },
  {
    id: 3,
    type: "ai",
    text: "Analisis: Kerusakan insulasi pada kabel terkonfirmasi. Kami menyarankan perbaikan mandiri. Berikut panduan terstruktur:",
    structured: true,
    steps: [
      {
        label: "Identifikasi Resiko",
        detail:
          "Cabut perangkat dari sumber listrik! Risiko Sengatan Listrik dan Bahaya Kebakaran.",
        tag: "RISK!",
        color: "border-red-500",
      },
      {
        label: "Alat yang Dibutuhkan",
        detail:
          "Isolasi listrik berkualitas tinggi, Heat shrink tube (3mm), Korek api/heat gun, Gunting/cutter.",
        tag: "TOOLS",
        color: "border-[#4ade80]",
      },
      {
        label: "Panduan Perbaikan",
        detail:
          "Potong bagian kabel yang terkelupas, bersihkan area, rekatkan kembali dengan isolasi, dan amankan dengan heat shrink tube.",
        tag: "STEPS",
        color: "border-yellow-400",
      },
    ],
  },
  {
    id: 5,
    type: "ai",
    text: "Anda bisa mendapatkan Heat shrink tube di toko elektronik manapun. Namun, kami merekomendasikan **EcoFix Hub terdekat** di Jl. Merdeka No. 10.",
    structured: false,
  },
];

// --- 1. KOMPONEN: ChatBubble (Menggunakan Card untuk tampilan modern) ---
const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isAI = message.type === "ai";
  return (
    <div className={cn("flex", isAI ? "justify-start" : "justify-end")}>
      <Card
        className={cn(
          "max-w-xl p-3 mt-3 shadow-lg transition-all duration-300 border-none",
          isAI
            ? "bg-secondary border border-primary/20 text-foreground rounded-tl-none" // AI Bubble
            : "bg-muted/30 text-foreground rounded-tr-none" // User Bubble
        )}
      >
        {isAI && (
          <div className="flex items-center mb-2">
            <IconBolt className="w-5 h-5 text-primary mr-2" />
            <span className="font-semibold text-primary">EcoRepair AI</span>
          </div>
        )}
        <p className="text-sm leading-relaxed">{message.text}</p>
        {message.structured && message.steps && (
          <div className="mt-4 pt-3 border-t border-border/50 space-y-3">
            <h4 className="text-md font-bold text-foreground mb-2">
              Langkah Perbaikan Disarankan:
            </h4>
            {message.steps.map((step, index) => (
              <Card
                key={index}
                className={cn(
                  "p-3 bg-background/50 border",
                  step.color || "border-border"
                )}
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm text-foreground/90">
                    {index + 1}. {step.label}
                  </h4>
                  {step.tag && (
                    <span
                      className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full",
                        step.tag === "RISK!"
                          ? "bg-red-900/50 text-red-400"
                          : "bg-primary/20 text-primary"
                      )}
                    >
                      {step.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-foreground/70 mt-1">{step.detail}</p>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

// --- 2. KOMPONEN: InitialUploadPrompt ---
const InitialUploadPrompt: React.FC<{
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onUpload }) => (
  <Card className="p-8 flex flex-col items-center justify-center border-2 border-dashed border-primary/50 bg-background/5 hover:bg-background/10 cursor-pointer h-64">
    <label
      htmlFor="initial-image-upload"
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <IconUpload className="w-12 h-12 text-primary" />
      <p className="mt-3 text-lg font-semibold text-foreground">
        Unggah Foto Kerusakan
      </p>
      <p className="text-sm text-foreground/70 mt-1 text-center">
        Drag & drop atau klik di sini.
      </p>
      <input
        id="initial-image-upload"
        type="file"
        className="hidden"
        onChange={onUpload}
      />
    </label>
  </Card>
);

// --- KOMPONEN UTAMA: ScanPage ---

export function ScanPage() {
  // --- State Logic (Diadopsi dari kode Anda + Simulasi) ---
  const [input, setInput] = useState(""); // Menggunakan 'input' seperti kode Anda
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [diagnosisStage, setDiagnosisStage] = useState(0);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(
    SIMULATION_HISTORY.slice(0, 1)
  );
  const chatEndRef = useRef<HTMLDivElement>(null);

  // State Setting dari kode Anda
  const [selectedModel, setSelectedModel] = useState("Local");
  const [selectedAgent, setSelectedAgent] = useState("Agent");
  const [selectedPerformance, setSelectedPerformance] = useState("High");
  const [autoMode, setAutoMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  React.useEffect(scrollToBottom, [chatHistory]);

  // --- FUNGSI UTAMA ---
  const handleNewDiagnosis = () => {
    setDiagnosisStage(0);
    setChatHistory(SIMULATION_HISTORY.slice(0, 1));
    setImagePreview(null);
    setInput(""); // Reset input
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      if (diagnosisStage === 0) startDiagnosis(true);
    }
  };

  // Fungsi startDiagnosis digantikan oleh handleSubmit yang disesuaikan
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();

    // Cek jika ini adalah tahap diagnosis awal (Stage 0)
    if (diagnosisStage === 0) {
      if (!input.trim() && !imagePreview) return;

      const userPrompt: ChatMessage = {
        id: 2,
        type: "user",
        text: imagePreview ? `[Photo Uploaded]. ${input}` : input,
        structured: false,
      };

      const newHistory = [
        ...chatHistory,
        userPrompt,
        SIMULATION_HISTORY[1], // AI Structured Response (ID 3)
      ];

      setChatHistory(newHistory);
      setDiagnosisStage(1);
      setInput("");
    }

    // Cek jika ini adalah tahap Follow-up (Stage 1)
    else if (diagnosisStage === 1) {
      const userFollowUp: ChatMessage = {
        id: 4,
        type: "user",
        text: "Di mana saya bisa menemukan Heat shrink tube di Jakarta?",
        structured: false,
      };

      const newHistory = [
        ...chatHistory,
        userFollowUp,
        SIMULATION_HISTORY[2], // AI Follow-up Response (ID 5)
      ];

      setChatHistory(newHistory);
      setDiagnosisStage(2);
      setInput("Simulasi Selesai. Klik 'Diagnosis Baru' untuk mengulang.");
    }
  };

  // Tentukan aksi untuk tombol kirim (Menggunakan fungsi handleSubmit yang sama)
  const handleSendAction = handleSubmit;

  return (
    <div className="relative w-full h-full">
      <Header headerAI/>
      <div className="max-w-7xl mx-auto mt-10 px-6 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          {/* JUDUL DAN TOMBOL NEW DIAGNOSIS */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-white">Diagnosis Context</h1>
            {diagnosisStage > 0 && (
              <Button
                onClick={handleNewDiagnosis}
                variant="outline"
                className="flex items-center space-x-1 px-3 py-2 text-sm text-white/80 border-white/20 bg-transparent hover:bg-white/10"
              >
                <IconRefresh className="w-4 h-4 text-primary" />
                <span>Diagnosis Baru</span>
              </Button>
            )}
          </div>

          {/* Multi-Modal Uploader / Preview */}
          {diagnosisStage === 0 && !imagePreview ? (
            <InitialUploadPrompt onUpload={handleImageUpload} />
          ) : (
            <Card className="relative h-64 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl">
              <CardContent className="p-0 w-full h-full relative flex items-center justify-center">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview Kerusakan"
                      className="object-contain max-h-full rounded-lg"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full bg-black/70 text-white hover:bg-black/90"
                      onClick={() => setImagePreview(null)}
                    >
                      <IconX className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <p className="text-white/50 text-sm">
                    [Placeholder Foto Belum Diunggah]
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Panel Settings Lanjutan (Diambil dari kode Anda) */}
          <div className="flex items-center gap-2 pt-2 text-white/70">
            {[
              {
                icon: <IconDeviceLaptop className="size-3" />,
                value: selectedModel,
                setValue: setSelectedModel,
                items: ["Local", "Cloud"],
              },
              {
                icon: <IconUser className="size-3" />,
                value: selectedAgent,
                setValue: setSelectedAgent,
                items: ["Agent", "Assistant"],
              },
              {
                icon: <IconBolt className="size-3" />,
                value: selectedPerformance,
                setValue: setSelectedPerformance,
                items: ["High", "Medium", "Low"],
              },
            ].map((dropdown, idx) => (
              <DropdownMenu key={idx}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 rounded-full border border-border bg-transparent hover:bg-accent text-xs"
                  >
                    {dropdown.icon}
                    <span>{dropdown.value}</span>
                    <IconChevronDown className="size-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="max-w-xs rounded-xl p-1.5 bg-background border-border"
                >
                  <DropdownMenuGroup className="space-y-1">
                    {dropdown.items.map((item) => (
                      <DropdownMenuItem
                        key={item}
                        className="rounded-[calc(1rem-6px)] text-xs"
                        onClick={() => dropdown.setValue(item)}
                      >
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 order-1 lg:order-2">
          <Card className="bg-neutral-950 h-[85vh] flex flex-col border border-white/10 rounded-xl">
            <ScrollArea className="flex-1 p-6 space-y-6 overflow-y-hidden">
              {chatHistory.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              <div ref={chatEndRef} />
            </ScrollArea>

            <div className="p-4 border-t border-white/10">
              <div className="bg-black border border-border rounded-xl overflow-hidden shadow-2xl">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleImageUpload}
                />

                <div className="px-3 pt-3 pb-2 grow">
                  <form onSubmit={handleSubmit}>
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        diagnosisStage === 2
                          ? "Diagnosis Selesai. Gunakan tombol 'Diagnosis Baru'."
                          : "Tanyakan panduan atau unggah foto lain..."
                      }
                      className="w-full bg-transparent dark:bg-black p-0 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder-muted-foreground resize-none border-none outline-none text-sm min-h-10 max-h-[25vh]"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                      disabled={diagnosisStage === 2}
                    />
                  </form>
                </div>

                <div className="mb-2 px-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {/* Dropdown Tools */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 rounded-full border border-border hover:bg-accent"
                        >
                          <IconPlus className="size-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="max-w-xs rounded-xl p-1.5"
                      >
                        <DropdownMenuGroup className="space-y-1">
                          <DropdownMenuItem
                            className="rounded-[calc(1rem-6px)] text-xs"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <IconPaperclip
                              size={16}
                              className="opacity-60 mr-2"
                            />
                            Attach Files
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-[calc(1rem-6px)] text-xs">
                            <IconCode size={16} className="opacity-60 mr-2" />
                            Code Interpreter
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-[calc(1rem-6px)] text-xs">
                            <IconWorld size={16} className="opacity-60 mr-2" />
                            Web Search
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-[calc(1rem-6px)] text-xs">
                            <IconHistory
                              size={16}
                              className="opacity-60 mr-2"
                            />
                            Chat History
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Auto Mode Toggle */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAutoMode(!autoMode)}
                      className={cn(
                        "h-7 px-2 rounded-full border border-border hover:bg-accent",
                        {
                          "bg-primary/10 text-primary border-primary/30":
                            autoMode,
                          "text-muted-foreground": !autoMode,
                        }
                      )}
                    >
                      <IconWand className="size-3" />
                      <span className="text-xs">Auto</span>
                    </Button>
                  </div>

                  {/* Send Button */}
                  <Button
                    onClick={handleSendAction} // Menggunakan handleSendAction
                    disabled={
                      diagnosisStage === 2 ||
                      (!input.trim() && diagnosisStage === 0)
                    }
                    className={cn(
                      "size-7 p-0 rounded-full bg-primary disabled:opacity-50 disabled:cursor-not-allowed",
                      diagnosisStage === 0
                        ? "bg-primary"
                        : "bg-green-500 hover:bg-green-600"
                    )}
                  >
                    <IconSend className="size-3 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
