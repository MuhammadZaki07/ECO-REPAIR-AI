import { IconBolt, IconClipboardList, IconCoins, IconUsers, IconMapPin } from "@tabler/icons-react";
import { SkeletonFive, SkeletonFour, SkeletonOne, SkeletonThree, SkeletonTwo } from "./skeletons";

export const items = [
  {
    title: "AI Multi-Modal Diagnosis",
    description: "Unggah foto kerusakan, dan dapatkan analisis visual (Vision AI) dan panduan perbaikan (LLM) secara instan.",
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconBolt className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Repair History Tracking",
    description: "Lacak semua barang yang telah Anda selamatkan dan ukur kontribusi Anda terhadap lingkungan.",
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconClipboardList className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Eco-Coin Gamification",
    description: "Hasilkan Eco-Coin dari setiap perbaikan sukses. Tukarkan dengan reward nyata di Redemption Center.",
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconCoins className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Community Success Stories",
    description: "Bagikan foto 'Before' dan 'After' perbaikan Anda, dapatkan apresiasi, dan bantu menginspirasi Eco-Fixer lainnya.",
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconUsers className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Local SparePart Hub Locator",
    description: "Temukan sumber suku cadang bekas, pusat daur ulang, dan bengkel terdekat di peta terintegrasi.",
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconMapPin className="h-4 w-4 text-neutral-500" />,
  },
];
