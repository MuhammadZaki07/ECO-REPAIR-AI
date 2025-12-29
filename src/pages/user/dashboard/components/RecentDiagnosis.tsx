import { DynamicSkeleton } from "@/components/skeletons";
import { EmptyState } from "@/components/state/EmptyState";
import { ErrorState } from "@/components/state/ErrorState";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ENV } from "@/env";
import { lexicalToHtml } from "@/utils/lexicalToHtml";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { useForums } from "@/hooks/useForums";
import { getInitial } from "@/utils/getInitial";
import { CheckCircle2, MessageSquare, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForumCard() {
  const { userData } = useAuthContext();
  const [activeTab, setActiveTab] = useState("my");
  const forumsHook = useForums(
    activeTab,
    activeTab === "my" ? userData?.id ?? undefined : undefined
  );
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-4 lg:w-full w-[355px] overflow-x-auto dark:bg-black">
            <TabsTrigger value="my">My Questions</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="solved">Solved</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Separator />
      {forumsHook.loading ? (
        <DynamicSkeleton
          preset="LIST"
          count={ENV.PAGE_SIZE}
          className="w-full space-y-4"
        />
      ) : forumsHook.error ? (
        <ErrorState
          title="Something went wrong"
          description={forumsHook.error.message}
          actionLabel="Try again"
          onAction={forumsHook.refetch}
        />
      ) : forumsHook.forums.length === 0 ? (
        <EmptyState
          title="No discussions yet"
          description="Try changing the search keyword or switching tabs."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {forumsHook.forums.slice(0, 5).map((forum) => (
            <Card
              key={forum.id}
              className="border shadow-none dark:bg-transparent"
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="rounded-md font-medium">
                      {forum.category?.name ?? "Unknown"}
                    </Badge>
                    {forum.status === "solved" ? (
                      <Badge className="bg-green-100 text-green-700 border-none flex gap-1 items-center">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </Badge>
                    ) : (
                      <Badge className="flex gap-1 items-center">Open</Badge>
                    )}
                  </div>
                </div>

                <Link to={`/user/forums/${forum.id}`} target="_blank">
                  <h3 className="text-lg font-bold hover:underline mb-2 leading-tight">
                    {forum.title}
                  </h3>
                  <p
                    className="text-sm text-muted-foreground line-clamp-2 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: lexicalToHtml(forum.content),
                    }}
                  />
                </Link>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      {forum?.author?.avatar_url ? (
                        <AvatarImage
                          src={forum.author.avatar_url}
                          alt={getInitial(forum?.author?.username)}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      ) : (
                        <AvatarFallback className="text-[10px] font-semibold bg-muted">
                          {getInitial(forum?.author?.username)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-xs font-semibold">
                      {forum?.author?.username}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1 text-xs">
                      <MessageSquare className="w-4 h-4" />{" "}
                      {forum.replies_count ?? 0}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <TrendingUp className="w-4 h-4" />{" "}
                      {forum.likes_count ?? 0}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
