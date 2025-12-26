import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { useGuides } from "@/hooks/useGuides";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";

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
import { YouTubeService } from "@/services/youtubeService";
import { formatDateID } from "@/utils/date";
import { DynamicSkeleton } from "@/components/skeletons";
import { ErrorState } from "@/components/state/ErrorState";
import { EmptyState } from "@/components/state/EmptyState";
import { useToast } from "@/hooks/use-toast";
import ContainerLoading from "@/components/state/LoadingState";
import { Skeleton } from "@/components/ui/skeleton";

const getTagStyle = (tag: string) => {
  if (tag === "PARTS") return "bg-blue-100 text-blue-800 border-blue-200";
  if (tag === "TOOLS") return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
};

const DiagnosisDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("parts");
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [isYoutubeLoading, setIsYoutubeLoading] = useState(false);
  const { data: diagnosis, isLoading, error } = useDiagnosis(id);
  const searchKeyword = diagnosis?.ai_response_json?.title?.split(" ")[0] ?? "";

  const { toast } = useToast();

  const {
    data: guides = [],
    isLoading: isGuidesLoading,
    error: guidesError,
  } = useGuides(searchKeyword);

  useEffect(() => {
    if (!diagnosis?.ai_response_json?.title) return;

    const fetchVideos = async () => {
      setIsYoutubeLoading(true);
      try {
        const videos = await YouTubeService.searchRepairVideos(
          diagnosis.ai_response_json.title
        );
        setYoutubeVideos(videos);
      } catch (err: any) {
        toast({
          title: "Failed to load videos",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setIsYoutubeLoading(false);
      }
    };

    fetchVideos();
  }, [diagnosis?.ai_response_json?.title]);

  if (isLoading) {
    return (
      <ContainerLoading>
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-42" />
        <Skeleton className="h-[700px] w-full" />
      </ContainerLoading>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Something went wrong"
        description={error?.message}
        actionLabel="Go back"
        onAction={() => navigate("/user/history")}
      />
    );
  }

  if (!diagnosis?.ai_response_json) {
    return (
      <EmptyState
        title="No data available"
        description="Diagnosis details are not available."
      />
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
    <div className="lg:p-5 space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ChevronLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      <h1 className="text-3xl font-bold">{aiData.title}</h1>

      <div className="flex items-center text-sm text-muted-foreground">
        <Calendar className="w-4 h-4 mr-2" />
        {formatDateID(diagnosis.created_at)}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Diagnosis Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="border-l-4 border-neutral-500 pl-3">
            {aiData.summary || "Summary not available"}
          </p>

          {risks.length > 0 && (
            <Card className="p-4 flex flex-col gap-1">
              <h4 className="font-bold flex items-center mb-2 text-red-500">
                <AlertTriangle className="w-4 h-4 mr-2" /> Risks
              </h4>
              <ul className="list-disc ml-5 text-sm space-y-1 ">
                {risks.map((r, i) => (
                  <li key={i}>
                    <b className="text-neutral-900 dark:text-neutral-100">
                      {r.title}
                    </b>
                    : {r.description}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {steps.length > 0 && (
            <div>
              <h4 className="font-bold flex items-center mb-2">
                <ListOrdered className="w-4 h-4 mr-2" /> Repair Steps
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
            <Wrench className="w-4 h-4 mr-2" /> Requirements
          </TabsTrigger>
          <TabsTrigger value="guides">
            <BookOpen className="w-4 h-4 mr-2" /> Guides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="parts">
          <Card>
            <CardContent className="pt-6 space-y-3">
              {partsAndTools.length > 0 ? (
                partsAndTools.map((item, i) => (
                  <div
                    key={i}
                    className="border p-3 rounded-lg flex items-center gap-3"
                  >
                    <Badge variant="outline" className={getTagStyle(item.tag)}>
                      {item.tag}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="No data"
                  description="No parts or tools information available."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="w-5 h-5 mr-2 text-primary" /> Repair Guides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Related Guides for "{searchKeyword}"
                </h4>

                {isGuidesLoading ? (
                  <DynamicSkeleton preset="LIST" count={3} />
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
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {g.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No data"
                    description={`No internal guides found for ${searchKeyword}.`}
                  />
                )}
              </div>

              <div className="space-y-3 border-t pt-6">
                <h4 className="flex items-center text-sm font-semibold text-red-600">
                  <div className="bg-red-600 text-white p-1 rounded mr-2">
                    <Wrench className="w-3 h-3" />
                  </div>
                  Video Tutorials
                </h4>

                {isYoutubeLoading ? (
                  <DynamicSkeleton
                    className="grid grid-cols-3 gap-3"
                    preset="CARD_GRID"
                    count={3}
                  />
                ) : youtubeVideos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {youtubeVideos.map((video) => (
                      <div
                        key={video.id}
                        className="group cursor-pointer"
                        onClick={() => window.open(video.url, "_blank")}
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                          <img
                            src={video.thumbnail}
                            className="w-full h-full object-cover"
                            alt="thumbnail"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition">
                            <ExternalLink className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <p className="mt-2 text-[10px] font-medium line-clamp-2">
                          {video.title}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState description="No videos found." />
                )}
              </div>

              <div className="flex justify-center border-t pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/search?q=repair+guide+${encodeURIComponent(
                        aiData.title
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <Search className="w-3 h-3 mr-2" /> Search More on Google
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
