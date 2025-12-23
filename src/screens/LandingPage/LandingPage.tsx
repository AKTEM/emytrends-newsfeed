import { FooterSection } from "./sections/FooterSection";
import { HairExtensionsSection } from "./sections/HairExtensionsSection";
import { HeroSection } from "./sections/HeroSection";
import { TreatmentAndToolsSection } from "./sections/TreatmentAndToolsSection";
import { TrendingSection } from "./sections/TrendingSection";
import { VideoSection } from "./sections/VideoSection";
import { PromoBanner } from "../../components/shared/PromoBanner";

export const LandingPage = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-h-screen relative flex flex-col">
      <header className="w-full bg-neutralneutral-1 sticky top-0 z-50">
        <PromoBanner />
      </header>

      <HeroSection />
      <TrendingSection />
      <VideoSection />
      <HairExtensionsSection />
      <TreatmentAndToolsSection />
      <FooterSection />
    </div>
  );
};
