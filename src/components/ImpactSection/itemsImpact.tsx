import { IconBolt, IconCoins, IconMapPin, IconRecycle, IconUsers } from "@tabler/icons-react";

export const itemsImpact = (t : any) => [
  {
    value: 2800,
    suffix: "+",
    label: t("impact_section.stats.items_saved"),
    icon: <IconRecycle className="w-10 h-10 dark:text-primary mb-4" />
  },
  {
    value: 1950,
    suffix: "K+",
    label: t("impact_section.stats.eco_coins_distributed"),
    icon: <IconCoins className="w-10 h-10 dark:text-primary mb-4" />
  },
  {
    value: 1500,
    suffix: "+",
    label: t("impact_section.stats.eco_fixers_joined"),
    icon: <IconUsers className="w-10 h-10 dark:text-primary mb-4" />
  },
  {
    value: 250,
    suffix: "+",
    label: t("impact_section.stats.sparepart_hubs_registered"),
    icon: <IconMapPin className="w-10 h-10 dark:text-primary mb-4" />
  },
  {
    value: 5300,
    suffix: "+",
    label: t("impact_section.stats.total_ai_diagnoses"),
    icon: <IconBolt className="w-10 h-10 dark:text-primary mb-4" />
  }
];
