import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/liquid-glass-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  MessageSquare,
  MoreHorizontal,
  TrendingUp,
  Search,
} from "lucide-react";
import { useForums } from "@/hooks/useForums";
import { DynamicSkeleton } from "@/components/skeletons";
import { ErrorState } from "@/components/state/ErrorState";
import { EmptyState } from "@/components/state/EmptyState";
import { lexicalToHtml } from "@/helpers/lexicalToHtml";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ModalForums from "./ModalForums";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import LeaderboardPanel from "./LeaderboardPanel";
import { ENV } from "@/env";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { getInitial } from "@/utils/getInitial";

function ForumPostList({
  onReady,
}: {
  onReady?: (refetch: () => void) => void;
}) {
  const [activeTab, setActiveTab] = useState("my");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingForum, setEditingForum] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<{
    [key: string]: boolean;
  }>({});
  const { toast } = useToast();
  const {userData} = useAuthContext()

  const forumsHook = useForums(
    activeTab,
    activeTab === "my" ? userData?.id ?? undefined : undefined
  );

  useEffect(() => {
    forumsHook.setPage(page);
  }, [page]);

  useEffect(() => {
    forumsHook.setSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    onReady?.(forumsHook.refetch);
    setPage(1);
  }, [forumsHook.refetch, activeTab, searchTerm]);

  const totalPages = Math.ceil(forumsHook.total / ENV.PAGE_SIZE);

  const openEditModal = (forum: any) => {
    setEditingForum(forum);
    setModalOpen(true);
  };

  const openDeleteDialog = (forum: any) => {
    setDeleteDialogOpen((prev) => ({ ...prev, [forum.id]: true }));
  };

  const handleDelete = async () => {
    if (!editingForum) return;
    try {
      await forumsHook.deleteForum(editingForum.id);
      setDeleteDialogOpen((prev) => ({
        ...prev,
        [editingForum.id]: false,
      }));
      setEditingForum(null);
      toast({
        title: "Forum deleted",
        description: "The forum has been successfully deleted.",
      });
      forumsHook.refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid grid-cols-4 lg:w-full w-[350px]">
              <TabsTrigger value="my">My Questions</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="solved">Solved</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2 items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10 rounded-full bg-background"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

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
            {forumsHook.forums.map((forum) => (
              <Card key={forum.id} className="border shadow-none">
                <CardContent>
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

                    {activeTab === "my" && forum.user_id === userData?.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="p-1">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditModal(forum)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(forum)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>

                  <Link to={`/user/forums/${forum.id}`}>
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

            {totalPages > 1 && (
              <div className="flex justify-end gap-5 items-center mt-4">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </Button>
                <span className="text-sm text-muted-foreground">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <LeaderboardPanel />

      <ModalForums
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        forumId={editingForum?.id}
        initialTitle={editingForum?.title}
        initialDescription={editingForum?.content}
        initialCategoryId={editingForum?.category?.id}
        onSuccess={() => {
          setModalOpen(false);
          setEditingForum(null);
          forumsHook.refetch();
        }}
      />

      <AlertDialog
        open={!!editingForum && !!deleteDialogOpen[editingForum.id]}
        onOpenChange={(open) =>
          editingForum &&
          setDeleteDialogOpen((prev) => ({
            ...prev,
            [editingForum.id]: open,
          }))
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Forum?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this forum? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-300"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ForumPostList;
