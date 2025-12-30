import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Line,
  AreaChart,
  Area,
  LineChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  Activity,
  Award,
} from "lucide-react";
import { useForums } from "@/hooks/useForums";
import { Badge } from "@/components/ui/badge";
import LoadingForumPage from "./components/loading";
import { ErrorState } from "@/components/state/ErrorState";
import {
  forumCardsConfig,
  forumChartConfigs,
} from "@/config/forumDashboardConfig";
import { formatNumber } from "@/utils/number";

export default function ForumDashboard() {
  const { dashboard, dashboardLoading, dashboardError , timeframe , setTimeframe } = useForums("all");

  if (dashboardLoading) return <LoadingForumPage />;

  if (dashboardError || !dashboard)
    return (
      <ErrorState
        title="Failed to load dashboard"
        description="Forum data is unavailable. Try refreshing or check your connection."
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );

  const cards = forumCardsConfig(dashboard);
  const { activity, likes, questions, solutions } = forumChartConfigs;
  const topContributor = dashboard.cards.top_contributor;
  const hasTopContributor = !!topContributor?.user_id;

  return (
    <div className="h-screen w-full">
      <div className="w-full mx-auto space-y-8 lg:p-4">
        <div className="relative overflow-hidden">
          <div className="relative space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Forum Analytics
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Real-time insights into community engagement, user activity, and
              content performance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
          {cards.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.id}
                className="relative overflow-hidden shadow-none"
              >
                <CardHeader className="relative pb-3">
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg p-2.5 bg-muted">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold tracking-tight">
                      {formatNumber(stat.value)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {hasTopContributor && (
            <Card className="relative overflow-hidden shadow-none">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg p-2.5 bg-muted">
                    <Award className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">Top Contributor</CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4">
                  <img
                    src={topContributor.avatar_url ?? "/avatar-placeholder.png"}
                    alt={topContributor.username}
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div className="flex flex-col gap-2">
                    <span className="font-semibold tracking-wide">
                      {topContributor.username}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <Badge className="bg-yellow-300">
                        {formatNumber(topContributor.points)} pts
                      </Badge>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="questions" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TabsList className="w-full flex gap-1 overflow-x-auto whitespace-nowrap rounded-lg">
              <TabsTrigger
                value="questions"
                className="flex items-center gap-2 px-3"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Q&A</span>
              </TabsTrigger>

              <TabsTrigger
                value="solutions"
                className="flex items-center gap-2 px-3"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Solutions</span>
              </TabsTrigger>

              <TabsTrigger
                value="likes"
                className="flex items-center gap-2 px-3"
              >
                <ThumbsUp className="h-4 w-4" />
                <span className="hidden sm:inline">Engagement</span>
              </TabsTrigger>

              <TabsTrigger
                value="activity"
                className="flex items-center gap-2 px-3"
              >
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
            </TabsList>

            <Select
              value={timeframe}
              onValueChange={(v) => setTimeframe(v as any)}
            >
              <SelectTrigger className="lg:w-70 w-full">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 1 days</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="questions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">
                      {questions.title}
                    </CardTitle>
                    <CardDescription>{questions.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="h-[350px] w-full"
                  config={questions.chartConfig}
                >
                  <ResponsiveContainer width="100%">
                    <AreaChart data={dashboard.charts.questions_by_date}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />

                      <Area
                        type="monotone"
                        dataKey="questions"
                        stroke="var(--color-questions)"
                        fill="var(--color-questions)"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="answers"
                        stroke="var(--color-answers)"
                        fill="var(--color-answers)"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="solutions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">
                      {solutions.title}
                    </CardTitle>
                    <CardDescription>{solutions.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="h-[350px] w-full"
                  config={solutions.chartConfig}
                >
                  <ResponsiveContainer width="100%">
                    <BarChart data={dashboard.charts.solutions_by_date}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />

                      <Bar dataKey="solutions" fill="var(--color-solutions)" />
                      <Bar dataKey="pending" fill="var(--color-pending)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="likes" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">{likes.title}</CardTitle>
                    <CardDescription>{likes.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="h-[350px] w-full"
                  config={likes.chartConfig}
                >
                  <ResponsiveContainer width="100%">
                    <LineChart data={dashboard.charts.likes_by_date}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />

                      <Line
                        type="monotone"
                        dataKey="question_likes"
                        stroke="var(--color-question_likes)"
                      />
                      <Line
                        type="monotone"
                        dataKey="reply_likes"
                        stroke="var(--color-reply_likes)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl">{activity.title}</CardTitle>
                    <CardDescription>{activity.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  className="h-[350px] w-full"
                  config={activity.chartConfig}
                >
                  <ResponsiveContainer width="100%">
                    <BarChart data={dashboard.charts.activity_by_date}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="posts" fill="var(--color-posts)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
