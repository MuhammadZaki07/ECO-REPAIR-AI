import { useGuideDetail } from "@/hooks/useGuideDetail";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";
import { formatDateID } from "@/utils/date";
import { lexicalToHtml } from "@/utils/lexicalToHtml";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/state/EmptyState";
import { DynamicSkeleton } from "@/components/skeletons";

function GuideDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: guide, isLoading, error } = useGuideDetail(id);

  if (isLoading) {
    return <DynamicSkeleton preset="DETAIL_PAGE"/>;
  }

  if (error || !guide) {
    return (
      <EmptyState
        title="Guide Not Found"
        description="The guide you are looking for does not exist or has been removed."
        className="p-6"
      />
    );
  }

  return (
    <div className="lg:p-5 space-y-6 max-w-5xl w-full mx-auto">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 px-0"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} />
        Back
      </Button>

      {guide.image_url && (
        <img
          src={guide.image_url}
          alt={guide.title}
          className="w-full max-h-[520px] object-cover rounded-lg border"
        />
      )}

      <h1 className="lg:text-6xl text-2xl font-bold leading-tight">
        {guide.title}
      </h1>

      <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
        {guide?.categories?.name && (
          <Badge variant="secondary">{guide?.categories?.name}</Badge>
        )}
        <span>
          <Calendar />
        </span>
        <span>{formatDateID(guide.created_at)}</span>
      </div>
      <Separator />
      <div className="max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: lexicalToHtml(guide.content) ?? "",
          }}
        />
      </div>
    </div>
  );
}

export default GuideDetailPage;
