import { useState } from "react";
import {
  Search,
  MessageSquare,
  Trophy,
  Plus,
  CheckCircle2,
  Clock,
  TrendingUp,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MOCK_POSTS = [
  {
    id: 1,
    title:
      "Layar iPhone 11 bergaris hijau setelah jatuh, apakah harus ganti modul?",
    author: "BudiSetyawan",
    category: "Smartphone",
    replies: 15,
    likes: 24,
    time: "2 jam yang lalu",
    status: "solved",
    preview:
      "Saya sudah mencoba restart paksa tapi garis tetap ada. Apakah ada kemungkinan hanya konektor yang longgar?",
  },
  {
    id: 2,
    title: "Rekomendasi obeng set untuk bongkar laptop Thinkpad seri T",
    author: "SitiRepair",
    category: "Laptop",
    replies: 8,
    likes: 12,
    time: "5 jam yang lalu",
    status: "open",
    preview:
      "Rencana mau bersihin fan sendiri. Butuh ukuran mata obeng apa saja ya supaya tidak slek?",
  },
  {
    id: 3,
    title: "Cara aman membuang baterai lithium bekas yang sudah kembung",
    author: "EcoWarrior",
    category: "Eco-Tips",
    replies: 32,
    likes: 89,
    time: "1 hari yang lalu",
    status: "open",
    preview:
      "Jangan dibuang ke tempat sampah biasa! Berikut adalah daftar drop-point limbah B3 di Jakarta...",
  },
];

const TOP_CONTRIBUTORS = [
  { name: "Andi Tech", points: "2.4k", avatar: "AT" },
  { name: "Susi Fix", points: "1.8k", avatar: "SF" },
  { name: "Gema Repair", points: "1.2k", avatar: "GR" },
];

const DashboardForums = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forum Komunitas</h1>
          <p className="text-muted-foreground mt-1">
            Berbagi ilmu perbaikan dan selamatkan bumi dari limbah elektronik.
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-lg px-6">
              <Plus className="w-4 h-4 mr-2" /> Tanya Masalah
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Tanya Komunitas</DialogTitle>
              <DialogDescription>
                Jelaskan masalah perangkatmu. Para ahli dan sesama user akan
                membantumu mencari solusi.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Masalah</Label>
                <Input id="title" placeholder="Misal: Baterai HP cepat habis" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Lengkap</Label>
                <Textarea
                  id="description"
                  placeholder="Ceritakan detail kerusakannya..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsOpen(false)}>
                Kirim Pertanyaan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border dark:border-none shadow-none">
          <CardHeader className="flex flex-row items-center gap-4 p-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg text-emerald-600">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">1,250 XP</CardTitle>
              <CardDescription className="text-[10px] uppercase font-semibold">
                Reputasi
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        {/* BARU: Kontribusi User (Bantu Orang) */}
        <Card className="border dark:border-none shadow-none">
          <CardHeader className="flex flex-row items-center gap-4 p-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg text-purple-600">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">42</CardTitle>
              <CardDescription className="text-[10px] uppercase font-semibold">
                Jawaban Anda
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        {/* Masalah Teratasi */}
        <Card className="border dark:border-none shadow-none">
          <CardHeader className="flex flex-row items-center gap-4 p-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg text-blue-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">14</CardTitle>
              <CardDescription className="text-[10px] uppercase font-semibold">
                Solusi Berhasil
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        {/* E-Waste Terselamatkan */}
        <Card className="border dark:border-none shadow-none">
          <CardHeader className="flex flex-row items-center gap-4 p-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg text-orange-600">
              <Leaf className="w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">5.2 Kg</CardTitle>
              <CardDescription className="text-[10px] uppercase font-semibold">
                E-Waste
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

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
            {MOCK_POSTS.map((post) => (
              <Card key={post.id} onClick={() => window.location.href= `/user/forums/${post.id}`} className="border shadow-none">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-md font-medium"
                      >
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

                  <h3 className="text-lg font-bold group-hover:text-emerald-600 transition-colors mb-2 leading-tight">
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
              {TOP_CONTRIBUTORS.map((user, i) => (
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
    </div>
  );
};

export default DashboardForums;
