import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Send,
  CheckCircle2,
  MessageSquare,
  Heart,
  ThumbsUp,
  Edit2,
  Trash2,
  Verified,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/badge";
import { useForumDetailRealtime } from "@/hooks/useForumDetailRealtime";
import { formatDateID } from "@/utils/date";
import { lexicalToHtml } from "@/helpers/lexicalToHtml";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { DynamicSkeleton } from "@/components/skeletons";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import { IconHeartFilled, IconThumbUpFilled } from "@tabler/icons-react";

const ONE_HOUR = 60 * 60 * 1000;
const replySchema = z.string().min(1, "Reply cannot be empty");

const ForumDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userData } = useAuthContext();
  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState("");
  const [editReplyId, setEditReplyId] = useState<string | null>(null);
  const [editReplyContent, setEditReplyContent] = useState("");

  if (!id) return null;

  const {
    forum,
    replies,
    loading,
    addReply,
    toggleLikeForum,
    toggleLikeReply,
    updateReply,
    deleteReply,
    refetch,
  } = useForumDetailRealtime(id, userData?.id);

  if (loading)
    return (
      <DynamicSkeleton
        className="w-full flex flex-col gap-4"
        preset="LIST"
        count={10}
      />
    );

  if (!forum) return <div className="p-5">Forum not found</div>;

  const authorName =
    forum.author.first_name || forum.author.username || "Anonymous";

  const handleSubmit = async () => {
    try {
      replySchema.parse(reply);
      setReplyError("");
      if (!userData) return;
      await addReply(userData.id, reply);
      setReply("");
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setReplyError(err.errors[0].message);
      }
    }
  };

  const handleEditSubmit = async (replyId: string) => {
    try {
      replySchema.parse(editReplyContent);
      setReplyError("");
      if (!updateReply) return;
      await updateReply(replyId, editReplyContent);
      setEditReplyId(null);
      setEditReplyContent("");
      await refetch();
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setReplyError(err.errors[0].message);
      }
    }
  };

  const canEditDelete = (r: (typeof replies)[0]) =>
    userData &&
    r.user_id === userData.id &&
    new Date().getTime() - new Date(r.created_at).getTime() < ONE_HOUR;

  return (
    <div className="p-5 space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Forum
      </Button>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <Avatar>
            {forum.author.avatar_url ? (
              <AvatarImage src={forum.author.avatar_url} />
            ) : (
              <AvatarFallback>{authorName[0]}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">{authorName}</span>
              <Badge variant="secondary" className="text-[10px]">
                {forum.category.name}
              </Badge>
              {forum.status === "solved" && (
                <Verified className="text-emerald-600" />
              )}
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => userData && toggleLikeForum(userData.id)}
                disabled={!userData}
              >
                {forum.user_has_liked ? (
                  <IconHeartFilled className="w-4 h-4 text-red-500" />
                ) : (
                  <Heart className="w-4 h-4 text-red-500" />
                )}
                <span className="text-sm">{forum.likes_count ?? 0}</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDateID(forum.created_at)}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold">{forum.title}</h1>
          <p
            className="text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: lexicalToHtml(forum.content) }}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> Replies ({replies.length})
        </h3>

        {replies.map((r) => {
          const authorName = r.author?.username || "User";
          const highlightSolution = r.is_solution
            ? "bg-emerald-50 dark:bg-emerald-950/20"
            : "";

          return (
            <Card key={r.id} className={highlightSolution}>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      {r.author?.avatar_url ? (
                        <AvatarImage src={r.author.avatar_url} />
                      ) : (
                        <AvatarFallback className="text-[10px]">
                          {authorName[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-sm font-semibold">{authorName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {r.is_solution && (
                      <Badge className="bg-emerald-600 text-white text-[10px]">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Solution
                      </Badge>
                    )}

                    {canEditDelete(r) && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditReplyId(r.id);
                            setEditReplyContent(r.content);
                          }}
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Reply?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This reply cannot be restored once deleted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex justify-end gap-2 mt-4">
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 text-white hover:bg-red-300"
                                onClick={async () => {
                                  await deleteReply?.(r.id);
                                  await refetch();
                                }}
                              >
                                Delete
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 gap-1"
                      onClick={() => userData && toggleLikeReply(r.id)}
                    >
                      {r.user_has_liked ? (
                        <IconThumbUpFilled />
                      ) : (
                        <ThumbsUp className="w-3 h-3" />
                      )}
                      {r.likes_count ?? 0}
                    </Button>
                  </div>
                </div>

                {editReplyId === r.id ? (
                  <div>
                    <Textarea
                      value={editReplyContent}
                      onChange={(e) => {
                        setEditReplyContent(e.target.value);
                        if (replyError) {
                          try {
                            replySchema.parse(e.target.value);
                            setReplyError("");
                          } catch {}
                        }
                      }}
                      className={replyError ? "border-red-500" : ""}
                    />
                    {replyError && (
                      <p className="text-red-500 text-sm mt-1">
                        {replyError}
                      </p>
                    )}
                    <div className="flex justify-end mt-2 gap-2">
                      <Button onClick={() => handleEditSubmit(r.id)}>
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setEditReplyId(null);
                          setEditReplyContent("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{r.content}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card
        className={`border-2 p-4 ${
          replyError ? "border-red-500" : "border-dashed border-muted/30"
        }`}
      >
        <Textarea
          placeholder="Write your repair suggestion..."
          value={reply}
          onChange={(e) => {
            setReply(e.target.value);
            if (replyError) {
              try {
                replySchema.parse(e.target.value);
                setReplyError("");
              } catch {}
            }
          }}
        />
        {replyError && (
          <p className="text-red-500 text-sm mt-1">{replyError}</p>
        )}
        <div className="flex justify-end mt-2">
          <Button disabled={!reply.trim()} onClick={handleSubmit}>
             Send Reply
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ForumDetailPage;
