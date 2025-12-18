import { CoreCapabilitiesSection } from "@/pages/landing/section/CoreCapabilitiesSection";
import { FeaturesSection } from "@/pages/landing/section/FeaturesSection";
import { FinalCTASection } from "@/pages/landing/section/FinalCTASection";
import { HeroSection } from "@/pages/landing/section/HeroSection";
import { ImpactStatsSection } from "@/pages/landing/section/ImpactStatsSection";
import { RewardSystemSection } from "@/pages/landing/section/RewardSystemSection";
import { StepSection } from "@/pages/landing/section/StepSection";

function LandingPage() {
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
