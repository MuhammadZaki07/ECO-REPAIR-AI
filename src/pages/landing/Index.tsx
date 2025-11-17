import FeaturesSection from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/Hero";
import ProcessSection from "@/components/sections/ProcessSection";

function LandingPage() {
  return (
    <section className="h-full w-full">
      <HeroSection />
      <FeaturesSection/>
      <ProcessSection/>
    </section>
  );
}

export default LandingPage;
