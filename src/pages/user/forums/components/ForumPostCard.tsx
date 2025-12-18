import { Button } from "@/components/liquid-glass-button";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ForumPostListProps } from "@/types/forum";
import {
  CheckCircle2,
  Clock,
  Leaf,
  MessageSquare,
  Search,
  TrendingUp,
} from "lucide-react";

function ForumPostList({
  activeTab,
  setActiveTab,
  posts,
  contributors,
}: ForumPostListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid grid-cols-3 w-full sm:w-[300px] bg-background">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="trending">Populer</TabsTrigger>
              <TabsTrigger value="solved">Selesai</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-10 rounded-full bg-background"
              placeholder="Cari diskusi..."
            />
          </div>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              onClick={() => (window.location.href = `/user/forums/${post.id}`)}
              className="border shadow-none"
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="rounded-md font-medium">
                      {post.category}
                    </Badge>
                    {post.status === "solved" && (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none flex gap-1 items-center">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.time}
                  </span>
                </div>

                <h3 className="text-lg cursor-pointer hover:underline font-bold group-hover:text-emerald-600 transition-colors mb-2 leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {post.preview}
                </p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-[10px] bg-muted">
                          {post.author[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-semibold">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1 text-xs">
                        <MessageSquare className="w-4 h-4" /> {post.replies}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingUp className="w-4 h-4" /> {post.likes}
                      </div>
                    </div>
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Top
              Contributors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contributors.map((user, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground w-4">
                    {i + 1}
                  </span>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  {user.points} XP
                </Badge>
              </div>
            ))}
            <Button
              variant="ghost"
              className="w-full text-xs text-emerald-600 mt-2"
            >
              Lihat Leaderboard
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-emerald-600 text-white overflow-hidden relative">
          <CardContent className="p-6">
            <Leaf className="absolute -right-4 -bottom-4 w-24 h-24 opacity-20 rotate-12" />
            <h4 className="font-bold mb-2">Tips Hari Ini</h4>
            <p className="text-xs text-emerald-50 leading-relaxed">
              Membersihkan debu pada kipas laptop secara rutin dapat
              memperpanjang umur komponen hingga 2 tahun!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ForumPostList;
