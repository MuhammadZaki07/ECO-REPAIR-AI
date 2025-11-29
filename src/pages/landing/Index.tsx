import { CoreCapabilitiesSection } from "@/components/sections/CoreCapabilitiesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactStatsSection } from "@/components/sections/ImpactStatsSection";
import { RewardSystemSection } from "@/components/sections/RewardSystemSection";
import { StepSection } from "@/components/sections/StepSection";
import { useAuthContext } from "@/context/AuthContext";

function LandingPage() {
  const {user} = useAuthContext()
  console.log(user);
  return (
    <section className="h-full w-full">
      <HeroSection />
      <FeaturesSection />
      <StepSection />
      <RewardSystemSection />
      <CoreCapabilitiesSection />
      <ImpactStatsSection />
      <FinalCTASection />
    </section>
  );
}

export default LandingPage;