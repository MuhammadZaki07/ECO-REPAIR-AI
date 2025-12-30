import { Skeleton } from "@/components/ui/skeleton";

function LoadingForumPage() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="w-52 rounded-lg h-[20px]" />
      <Skeleton className="w-80 rounded-lg h-[20px]" />
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-full rounded-lg h-40" />
        ))}
      </div>
      <Skeleton className="w-full rounded-lg h-[350px]" />
    </div>
  );
}

export default LoadingForumPage;
