import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { useGuides } from "@/hooks/useGuides";
import { searchRepairVideos } from "@/services/guides/youtubeService";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Wrench,
  BookOpen,
  AlertTriangle,
  ChevronLeft,
  Calendar,
  ListOrdered,
  ExternalLink,
  Search,
} from "lucide-react";

const getTagStyle = (tag: string) => {
  if (tag === "PARTS") return "bg-blue-100 text-blue-800 border-blue-200";
  if (tag === "TOOLS") return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const DiagnosisDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: diagnosis, isLoading, error } = useDiagnosis(id);
  
  // Ambil kata kunci pertama dari judul untuk pencarian guide (misal: "Laptop" dari "Laptop Screen Crack")
  const searchKeyword = diagnosis?.ai_response_json?.title?.split(" ")[0] || "";

  // SEKARANG MASUKKAN searchKeyword ke dalam useGuides
  const {
    data: guides = [],
    isLoading: isGuidesLoading,
    error: guidesError,
  } = useGuides(searchKeyword);

  const [activeTab, setActiveTab] = useState("parts");
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [isYoutubeLoading, setIsYoutubeLoading] = useState(false);

  useEffect(() => {
    if (diagnosis?.ai_response_json?.title) {
      const fetchVideos = async () => {
        setIsYoutubeLoading(true);
        const videos = await searchRepairVideos(diagnosis.ai_response_json.title);
        setYoutubeVideos(videos);
        setIsYoutubeLoading(false);
      };
      fetchVideos();
    }
  }, [diagnosis?.ai_response_json?.title]);

  if (isLoading) {
    return (
      <div className="p-5 space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !diagnosis?.ai_response_json) {
    return (
      <Card className="p-6 text-center text-red-700">
        <AlertTriangle className="mx-auto mb-3" />
        <p>Gagal memuat detail diagnosis</p>
        <Button onClick={() => navigate("/user/history")} className="mt-4">
          <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
        </Button>
      </Card>
    );
  }

  const aiData = diagnosis.ai_response_json;
  const sections = aiData.sections ?? [];
  const partsAndTools = sections
    .filter((s) => s.tag === "PARTS" || s.tag === "TOOLS")
    .flatMap((s) => s.items.map((i) => ({ ...i, tag: s.tag })));
  const steps = sections.find((s) => s.tag === "STEPS")?.items ?? [];
  const risks = sections.find((s) => s.tag === "RISK!")?.items ?? [];

  return (
    <div className="p-5 space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ChevronLeft className="w-4 h-4 mr-2" /> Kembali
      </Button>

      <h1 className="text-3xl font-bold break-words">{aiData.title}</h1>

      <div className="flex items-center text-sm text-muted-foreground">
        <Calendar className="w-4 h-4 mr-2" />
        {formatDate(diagnosis.created_at)}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Diagnosis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="border-l-4 border-neutral-500 pl-3">
            {aiData.summary || "Ringkasan tidak tersedia"}
          </p>
          {risks.length > 0 && (
            <Card className="p-4 bg-neutral-900 border-red-900/50 flex flex-col gap-1">
              <h4 className="font-bold flex items-center mb-2 text-red-500">
                <AlertTriangle className="w-4 h-4 mr-2" /> Resiko
              </h4>
              <ul className="list-disc ml-5 text-sm space-y-1 text-neutral-300">
                {risks.map((r, i) => (
                  <li key={i}>
                    <b>{r.title}</b>: {r.description}
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {steps.length > 0 && (
            <div>
              <h4 className="font-bold flex items-center mb-2">
                <ListOrdered className="w-4 h-4 mr-2" /> Langkah Perbaikan
              </h4>
              <ol className="list-decimal ml-5 text-sm space-y-2">
                {steps.map((s, i) => (
                  <li key={i}>
                    <b>{s.title}</b>: {s.description}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 my-4">
          <TabsTrigger value="parts">
            <Wrench className="w-4 h-4 mr-2" /> Kebutuhan
          </TabsTrigger>
          <TabsTrigger value="guides">
            <BookOpen className="w-4 h-4 mr-2" /> Panduan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="parts">
          <Card>
            <CardContent className="pt-6 space-y-3">
              {partsAndTools.length > 0 ? partsAndTools.map((item, i) => (
                <div key={i} className="border p-3 rounded-lg flex items-center gap-3">
                  <Badge variant="outline" className={getTagStyle(item.tag)}>
                    {item.tag}
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )) : <p className="text-xs text-center text-muted-foreground">Tidak ada data alat/bahan.</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="w-5 h-5 mr-2 text-primary" /> Panduan Perbaikan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SECTION 1: INTERNAL GUIDES */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Panduan Terkait "{searchKeyword}"
                </h4>
                {isGuidesLoading ? (
                  <Skeleton className="h-20 w-full" />
                ) : guides.length > 0 ? (
                  guides.map((g) => (
                    <div
                      key={g.id}
                      className="border rounded-lg p-3 hover:bg-accent cursor-pointer transition"
                      onClick={() => navigate(`/guides/${g.id}`)}
                    >
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium">{g.title}</p>
                        <Badge variant="secondary" className="text-[10px]">
                          {g.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{g.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="border border-dashed rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Tidak ada panduan internal untuk "{searchKeyword}".
                    </p>
                  </div>
                )}
              </div>

              {/* SECTION 2: YOUTUBE */}
              <div className="space-y-3 border-t pt-6">
                <h4 className="flex items-center text-sm font-semibold text-red-600">
                  <div className="bg-red-600 text-white p-1 rounded mr-2">
                    <Wrench className="w-3 h-3" />
                  </div>
                  Video Tutorial
                </h4>
                {isYoutubeLoading ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="aspect-video w-full" />
                    <Skeleton className="aspect-video w-full" />
                  </div>
                ) : youtubeVideos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {youtubeVideos.map((video) => (
                      <div
                        key={video.id}
                        className="group cursor-pointer"
                        onClick={() => window.open(video.url, "_blank")}
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                          <img src={video.thumbnail} className="w-full h-full object-cover" alt="thumb" />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <p className="mt-2 text-[10px] font-medium line-clamp-2">{video.title}</p>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-xs text-muted-foreground italic">Video tidak ditemukan.</p>}
              </div>

              {/* SECTION 3: WEB SEARCH */}
              <div className="space-y-3 border-t pt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => window.open(`https://www.google.com/search?q=repair+guide+${encodeURIComponent(aiData.title)}`, "_blank")}
                >
                  <Search className="w-3 h-3 mr-2" /> Cari Lebih Lengkap di Google
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiagnosisDetailPage;