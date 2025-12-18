import { useState } from "react";
import { MessageSquare, Trophy, CheckCircle2, Leaf } from "lucide-react";
import AskQuestionDialog from "./components/AskQuestionDialog";
import ForumStats from "./components/ForumStats";
import ForumPostList from "./components/ForumPostCard";
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

  const forumStats = [
    {
      label: "Reputasi",
      value: "1,250 XP",
      icon: Trophy,
      colorClass: "text-emerald-600",
    },
    {
      label: "Jawaban Anda",
      value: "42",
      icon: MessageSquare,
      colorClass: "text-purple-600",
    },
    {
      label: "Solusi Berhasil",
      value: "14",
      icon: CheckCircle2,
      colorClass: "text-blue-600",
    },
    {
      label: "E-Waste",
      value: "5.2 Kg",
      icon: Leaf,
      colorClass: "text-orange-600",
    },
  ];

  return (
    <div className="p-6 mx-auto space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forum Komunitas</h1>
          <p className="text-muted-foreground mt-1">
            Berbagi ilmu perbaikan dan selamatkan bumi dari limbah elektronik.
          </p>
        </div>
        <AskQuestionDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <ForumStats stats={forumStats} />

      <ForumPostList
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        posts={MOCK_POSTS}
        contributors={TOP_CONTRIBUTORS}
      />
    </div>
  );
};

export default DashboardForums;
