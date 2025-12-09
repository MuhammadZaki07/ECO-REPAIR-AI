import { IconBolt, IconClipboardList, IconCoins, IconUsers, IconMapPin } from "@tabler/icons-react";
import { SkeletonFive, SkeletonFour, SkeletonOne, SkeletonThree, SkeletonTwo } from "./skeletons";

export const items = (t) => [
  {
    title: t("core_section.bento.items.ai_diagnosis.title"),
    description: t("core_section.bento.items.ai_diagnosis.description"),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconBolt className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: t("core_section.bento.items.repair_history.title"),
    description: t("core_section.bento.items.repair_history.description"),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconClipboardList className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: t("core_section.bento.items.eco_coin.title"),
    description: t("core_section.bento.items.eco_coin.description"),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconCoins className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: t("core_section.bento.items.community_stories.title"),
    description: t("core_section.bento.items.community_stories.description"),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconUsers className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: t("core_section.bento.items.sparepart_locator.title"),
    description: t("core_section.bento.items.sparepart_locator.description"),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconMapPin className="h-4 w-4 text-neutral-500" />,
  },
];
