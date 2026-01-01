import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Trophy,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  Code,
  Star,
  MailQuestion,
  GiftIcon,
  ShoppingBagIcon,
  HeartIcon,
  MessageSquare,
  CheckCircle2,
  ThumbsUp,
  Activity,
} from "lucide-react";
import DashboardGreeting from "@/pages/user/dashboard/components/DashboardGreeting";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { Github } from "@aliimam/icons";
import { Link } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { IconArrowGuide, IconCategory } from "@tabler/icons-react";
import { useForums } from "@/hooks/useForums";
import { formatNumber } from "@/utils/number";
import { useUsers } from "@/hooks/useUsers";
import { useGuides } from "@/hooks/useGuides";
import { useVouchers } from "@/hooks/useVouchers";
import { useMerch } from "@/hooks/useMerchandise";
import { useDonation } from "@/hooks/useDonation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  forumCardsConfig,
  forumChartConfigs,
} from "@/config/forumDashboardConfig";
import { ErrorState } from "@/components/state/ErrorState";
import LoadingForumPage from "../forums/components/loading";

interface DashboardStats {
  totalParticipants: number;
  submittedProjects: number;
  approvedProjects: number;
  pendingReview: number;
  averageScore: number;
  topScore: number;
  growthRate: number;
  completionRate: number;
}

export default function AdminDashboard() {
  const { categories } = useCategories();
  const { forums } = useForums("all");
  const { users } = useUsers();
  const { guides } = useGuides();
  const { adminVouchers } = useVouchers();
  const { merch } = useMerch();
  const { campaigns } = useDonation();

  const {
    dashboard,
    dashboardLoading,
    dashboardError,
    timeframe,
    setTimeframe,
  } = useForums("all");

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

  const { activity, likes, questions, solutions } = forumChartConfigs;
  const topContributor = dashboard.cards.top_contributor;

  return (
    <div className="h-screen p-4 md:p-8 container">
      <DashboardGreeting />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-">
          <Card className="transition-shadow h-full relative bg-transparent flex flex-col justify-center">
            <DottedGlowBackground
              className="pointer-events-none mask-radial-to-70% mask-radial-at-center"
              opacity={1}
              gap={10}
              radius={1.6}
              colorLightVar="--color-blue-500"
              glowColorLightVar="--color-blue-600"
              colorDarkVar="--color-blue-500"
              glowColorDarkVar="--color-sky-800"
              backgroundOpacity={0}
              speedMin={0.3}
              speedMax={1.6}
              speedScale={1}
            />
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-mono">
                Muhammad Zaki Ulumudin
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground font-mono">
                Fullstack Web Developer | Eco-Repair AI Project Participant
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-center">
              <Link
                to={"https://github.com/MuhammadZaki07"}
                target="_blank"
                className="mx-auto flex items-center gap-2 hover:underline"
              >
                <Github /> Github
              </Link>
              <p className="mt-2 font-mono">
                Hello judges! Thank you for reviewing my project. I hope you
                enjoy exploring Eco-Repair AI!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card className="bg-transparent">
            <CardHeader className="">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90 uppercase">
                  Total Categories
                </CardTitle>
                <IconCategory className="h-5 w-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">
                {categories?.length.toLocaleString()}
              </div>
              <p className="text-sm opacity-80">
                {categories?.length > 0
                  ? `Including all active topics and subcategories`
                  : `No categories available yet`}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-transparent">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center gap-3">
                <CardTitle className="text-base">Top Contributor</CardTitle>
                <Award className="h-5 w-5" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={topContributor?.avatar_url ?? "/avatar-placeholder.png"}
                  alt={topContributor?.username}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div className="flex flex-col gap-2">
                  <span className="font-semibold tracking-wide">
                    {topContributor?.username}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    <Badge className="bg-yellow-300">
                      {formatNumber(topContributor?.points)} pts
                    </Badge>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent">
            <CardHeader className="">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90 uppercase">
                  Total Forums
                </CardTitle>
                <MailQuestion className="h-5 w-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">
                {forums?.length.toLocaleString()}
              </div>
              <p className="text-sm opacity-80">
                {forums?.length > 0
                  ? `Showing all active discussion topics`
                  : `No forums available yet`}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-transparent">
            <CardHeader className="">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90 uppercase">
                  Total Users
                </CardTitle>
                <Users className="h-5 w-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">
                {users?.length.toLocaleString()}
              </div>
              <p className="text-sm opacity-80">
                {users?.length > 0
                  ? `All registered participants`
                  : `No users registered yet`}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
        <Card className="bg-transparent">
          <CardHeader className="">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90 uppercase">
                Total Guides
              </CardTitle>
              <IconArrowGuide className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {guides?.length.toLocaleString()}
            </div>
            <p className="text-sm opacity-80">
              {guides?.length > 0
                ? `Showing all active guides`
                : `No guides available yet`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-transparent">
          <CardHeader className="">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90 uppercase">
                Total Vouchers
              </CardTitle>
              <GiftIcon className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {adminVouchers?.length.toLocaleString()}
            </div>
            <p className="text-sm opacity-80">
              {adminVouchers?.length > 0
                ? `Displaying all available vouchers`
                : `No vouchers available yet`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-transparent">
          <CardHeader className="">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90 uppercase">
                Total Merchandise
              </CardTitle>
              <ShoppingBagIcon className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {merch?.length.toLocaleString()}
            </div>
            <p className="text-sm opacity-80">
              {merch?.length > 0
                ? `Displaying all available merchandise`
                : `No merchandise available yet`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-transparent">
          <CardHeader className="">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90 uppercase">
                Total Donations
              </CardTitle>
              <HeartIcon className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {campaigns?.length.toLocaleString()}
            </div>
            <p className="text-sm opacity-80">
              {campaigns?.length > 0
                ? `Displaying all active donation campaigns`
                : `No donation campaigns available yet`}
            </p>
          </CardContent>
        </Card>
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

            <TabsTrigger value="likes" className="flex items-center gap-2 px-3">
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
                  <CardTitle className="text-2xl">{questions.title}</CardTitle>
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
                  <CardTitle className="text-2xl">{solutions.title}</CardTitle>
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
  );
}
