import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import type { ForumStatsProps } from "@/types/forum";

function ForumStats({ stats }: ForumStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <Card key={index} className="border dark:border-none shadow-none">
          <CardHeader className="flex flex-row items-center gap-4 p-5">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${item.colorClass}`}
            >
              <item.icon className="w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{item.value}</CardTitle>
              <CardDescription className="text-[10px] uppercase font-semibold">
                {item.label}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default ForumStats;
