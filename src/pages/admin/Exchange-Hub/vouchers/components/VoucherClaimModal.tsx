import { useVoucherClaims } from "@/hooks/useVoucherClaims";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { VoucherClaimModalProps } from "@/types/voucher";
import { Users, Ticket, Calendar, X } from "lucide-react";

export default function VoucherClaimModal({
  isOpen,
  setIsOpen,
  voucherId,
}: VoucherClaimModalProps) {
  const { data: claims = [], isLoading } = useVoucherClaims(voucherId);

  const AvatarGroup = () => {
    const maxVisible = 5;
    const visibleClaims = claims.slice(0, maxVisible);
    const remainingCount = claims.length - maxVisible;

    return (
      <div className="flex items-center -space-x-3">
        {visibleClaims.map((claim, index) => (
          <Avatar
            key={claim.user_id}
            className="w-10 h-10 border-2 border-background ring-2 ring-primary/10 hover:z-10 hover:scale-110 transition-transform duration-200"
          >
            {claim.user.avatar_url ? (
              <AvatarImage
                src={claim.user.avatar_url}
                alt={claim.user.username}
              />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                {claim.user.username?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            )}
          </Avatar>
        ))}
        {remainingCount > 0 && (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/50 border-2 border-background flex items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground">
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    );
  };

  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-8 w-28" />
        </div>
      ))}
    </div>
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="sm:max-w-4xl w-full lg:max-w-2xl p-0 flex flex-col max-h-[90vh]">
        <div className="relative p-6 border-b">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full hover:bg-background/80"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <AlertDialogTitle className="text-2xl font-bold">
                Voucher Claims
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base">
              List of users who have claimed this voucher
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <Card className="border-none dark:bg-gradient-to-br from-background via-primary/5 to-background backdrop-blur-sm">
            <CardContent className="p-">
              <div className="flex items-center justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Claims
                      </p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        {isLoading ? "..." : claims.length}
                      </p>
                    </div>
                  </div>
                </div>

                {!isLoading && claims.length > 0 && (
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Users who claim
                    </p>
                    <AvatarGroup />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">Claim Details</h3>
              {!isLoading && claims.length > 0 && (
                <Badge variant="secondary" className="rounded-full">
                  {claims.length} users
                </Badge>
              )}
            </div>

            <ScrollArea className="h-[400px] rounded-lg border bg-muted/20">
              <div className="p-4 space-y-2">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : claims.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-4 rounded-full bg-muted mb-4">
                      <Ticket
                        strokeWidth={1}
                        className="h-8 w-8 text-muted-foreground"
                      />
                    </div>
                    <p className="font-medium text-lg">No claims yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      This voucher has not been claimed by any user
                    </p>
                  </div>
                ) : (
                  claims.map((claim, index) => (
                    <div key={claim.user_id}>
                      <div className="group p-4 rounded-lg bg-background transition-all duration-200 border border-primary/20 hover:shadow-md">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="w-12 h-12 ring-2 ring-primary/30 transition-all">
                              {claim.user.avatar_url ? (
                                <AvatarImage
                                  src={claim.user.avatar_url}
                                  alt={claim.user.username}
                                />
                              ) : (
                                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                                  {claim.user.username?.[0]?.toUpperCase() ??
                                    "U"}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-lg">
                              {index + 1}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                              {claim.user.username}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className="rounded-full font-mono text-xs"
                              >
                                {claim.voucher_code}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 text-muted-foreground">
                            <Calendar className="w-4" />
                            <div className="flex flex-col gap-2 text-right">
                              <p className="font-medium text-foreground">
                                {new Date(claim.claimed_at).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                              <p className="text-xs">
                                {new Date(claim.claimed_at).toLocaleTimeString(
                                  "id-ID",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < claims.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="p-6 border-t bg-muted/20 flex-shrink-0 flex justify-end">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="min-w-[120px]"
          >
            Close
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
