import { cn } from "@/lib/utils";
import * as Icons from "@tabler/icons-react";
import featuresData from "@/data/features.json";

export default function FeaturesSection() {
  return (
    <section className="relative z-10 py-10 md:py-12 lg:py-20 w-full dark:bg-black bg-neutral-50">
      <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold dark:text-white text-black tracking-tight">
          Core <span className="text-primary">Features</span> of Our Platform
        </h2>
        <p className="mt-4 text-lg dark:text-white/70 text-neutral-800/50 max-w-3xl mx-auto">
          Discover the key functionalities that empower Eco-Fixers to repair
          smarter, earn Eco-Coins, and contribute to a sustainable circular
          economy.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto lg:py-20 md:py-12">
        {featuresData.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: string;
  index: number;
}) => {
  const IconComponent = Icons[icon as keyof typeof Icons] as unknown as (
    props: React.ComponentProps<typeof Icon>
  ) => JSX.Element;

  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}

      <div className="mb-4 relative z-10 px-10 text-primary dark:text-primary">
        {IconComponent && <IconComponent className="w-8 h-8" />}
      </div>

      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#aaff00] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
