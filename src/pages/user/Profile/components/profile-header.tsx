import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Mail, Calendar, MapPin } from "lucide-react";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { formatDateID } from "@/utils/date";

export default function ProfileHeader() {
  const { user, userData } = useAuthContext();

  if (!user) return null;

  const fullName = user.user_metadata.full_name || "";
  const [firstName, lastName] = fullName.split(" ");
  const email = user.email;
  const avatarUrl = user.user_metadata.avatar_url || "";
  const location = userData?.location || "—";
  const joinedAt = formatDateID(user.created_at);
  const role = userData?.role;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {avatarUrl ? (
                <AvatarImage loading="lazy" src={avatarUrl} alt={fullName} />
              ) : (
                <AvatarFallback className="text-2xl">
                  {firstName?.[0] || "U"}
                  {lastName?.[0] || "N"}
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{fullName}</h1>
              <Badge variant="secondary">{role}</Badge>
            </div>
            <p className="text-muted-foreground">{userData?.bio || "—"}</p>

            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {email}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Joined {joinedAt}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
