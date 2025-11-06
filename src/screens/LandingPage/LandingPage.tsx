import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { FooterSection } from "./sections/FooterSection";
import { HairExtensionsSection } from "./sections/HairExtensionsSection";
import { HeroSection } from "./sections/HeroSection";
import { TreatmentAndToolsSection } from "./sections/TreatmentAndToolsSection";
import { TrendingSection } from "./sections/TrendingSection";
import { VideoSection } from "./sections/VideoSection";

export const LandingPage = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-h-screen relative flex flex-col">
      <header className="w-full bg-neutralneutral-1 sticky top-0 z-50">
        <div className="flex h-10 items-center justify-between px-4 sm:px-8 lg:px-12 py-2 w-full max-w-[1264px] mx-auto">
          <ChevronLeftIcon className="w-3 h-6 flex-shrink-0 hidden sm:block" />

          <div className="inline-flex items-center justify-center gap-6 flex-1 px-2">
            <div className="font-medium-body-large font-[number:var(--medium-body-large-font-weight)] text-textprimary-text text-[length:var(--medium-body-large-font-size)] tracking-[var(--medium-body-large-letter-spacing)] leading-[var(--medium-body-large-line-height)] text-center [font-style:var(--medium-body-large-font-style)] text-xs sm:text-sm md:text-base">
              Get 50% Discount On Every Item Purchased On Christmas Day
            </div>
          </div>

          <ChevronRightIcon className="w-3 h-6 flex-shrink-0 hidden sm:block" />
        </div>
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
