import DashboardGreeting from "./components/DashboardGreeting";
import DashboardStats from "./components/DashboardStats";
import EcoWalletCard from "./components/EcoWalletCard";
import ForumCard from "./components/RecentDiagnosis";
import { useDiagnosisHistory } from "@/hooks/useDiagnosis";
import { useAuthContext } from "@/hooks/context/AuthContext";
import { ENV } from "@/env";
import { useLeaderboard } from "@/hooks/useLeaderboard";

export default function DashboardPage() {
  const { user, userData } = useAuthContext();
  const { userXP, loadingUserXP } = useLeaderboard(userData?.id);

  const { total, isLoading } = useDiagnosisHistory({
    userId: user?.id ?? "",
    pageSize: ENV.PAGE_SIZE,
  });

  const loading = isLoading && loadingUserXP;

  return (
    <div className="lg:p-6 lg:m-0 overflow-x-hidden space-y-10 text-white">
      <DashboardGreeting />

      <DashboardStats
        loading={loading}
        totalEarned={userXP}
        diagnosisCount={total ?? 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ForumCard />
        </div>

        <EcoWalletCard />
      </div>
    </div>
  );
}
