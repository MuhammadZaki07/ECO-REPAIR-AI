import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/badge";

const ForumDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reply, setReply] = useState("");

  return (
    <div className="p-5 space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
        <ChevronLeft className="w-4 h-4 mr-2" /> Kembali ke Forum
      </Button>

      {/* HEADER PERTANYAAN */}
      <Card className="border-none shadow-sm bg-background">
        <CardHeader className="flex flex-row items-center gap-3">
          <Avatar>
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">BudiSetyawan</span>
              <Badge variant="secondary" className="text-[10px]">Smartphone</Badge>
            </div>
            <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold">Layar iPhone 11 bergaris hijau setelah jatuh, apakah harus ganti modul?</h1>
          <p className="text-muted-foreground leading-relaxed">
            Kejadian tadi pagi, HP jatuh dari meja. Awalnya tidak ada apa-apa, tapi satu jam kemudian muncul garis hijau vertikal. Saya sudah coba restart paksa tapi tidak hilang. Apakah ini masalah hardware (LCD) atau hanya soket yang longgar? Mohon bantuannya bagi yang pernah ngalamin.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4 pt-4">
        <h3 className="font-bold flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> Jawaban (2)
        </h3>

        {/* LIST JAWABAN ORANG LAIN */}
        <div className="space-y-4">
          <Card className="border-none bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-emerald-700">Andi Tech</span>
                  <Badge className="bg-emerald-500 text-[9px]">Expert Fixer</Badge>
                </div>
                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-white">
                   <CheckCircle2 className="w-3 h-3 mr-1" /> Solusi Berhasil
                </Badge>
              </div>
              <p className="text-sm">Berdasarkan pengalaman saya, kalau garisnya vertikal penuh itu biasanya panel LCD-nya sudah kena (hardware). Tapi tidak ada salahnya coba re-seat kabel fleksibel dulu sebelum beli part baru.</p>
            </CardContent>
          </Card>
        </div>

        {/* FORM UNTUK USER MENJAWAB */}
        <div className="pt-6">
          <Card className="border-2 border-dashed bg-muted/30">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold">Bantu Budi Setyawan</span>
              </div>
              <Textarea 
                placeholder="Tulis saran perbaikanmu di sini..." 
                className="bg-background min-h-[120px]"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <div className="flex justify-end">
                <Button disabled={!reply} className="rounded-full px-6">
                  <Send className="w-4 h-4 mr-2" /> Kirim Jawaban
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForumDetailPage;