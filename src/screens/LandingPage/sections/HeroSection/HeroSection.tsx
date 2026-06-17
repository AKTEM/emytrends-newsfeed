import { Link } from "react-router-dom";
import { HeaderWithDropdown } from "../../../../components/shared/HeaderWithDropdown";
import { Button } from "../../../../components/ui/button";
import heroDesktop from "../../../../assets/hero_kurt.png.asset.json";
import heroPortrait from "../../../../assets/hero_portrait.jpg.asset.json";

export const HeroSection = (): JSX.Element => {
  const TextBlock = (
    <>
      <div className="flex flex-col items-start gap-2 sm:gap-3 lg:gap-4 w-full">
        <h1 className="[font-family:'Helvetica_Neue-Medium',Helvetica] font-medium text-white text-3xl sm:text-4xl md:text-5xl lg:text-[68px] tracking-[0.34px] leading-tight lg:leading-[104px]">
          REDEFINE
          <br />
          BEAUTY WITH EVERY STRAND
        </h1>
        <p className="font-medium-heading-small text-white text-sm sm:text-base lg:text-lg">
          Explore luxurious wigs and extensions
        </p>
      </div>
      <Link to="/shop/all" className="w-full sm:w-auto">
        <Button className="bg-tertiarytertiary-0 hover:bg-tertiarytertiary-0/90 text-textinverse-text font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-[length:var(--bold-title-medium-font-size)] tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] px-5 py-4 sm:py-5 h-auto rounded-lg w-full">
          SHOP NOW
        </Button>
      </Link>
    </>
  );

  return (
    <div className="relative w-full bg-textsecondary-text">
      <HeaderWithDropdown />

      {/* Desktop: full-width image with text overlay */}
      <div
        className="hidden lg:block relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroDesktop.url})`,
          minHeight: "640px",
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col items-start justify-center gap-10 px-16 py-20 max-w-[640px] min-h-[640px]">
          {TextBlock}
        </div>
      </div>

      {/* Mobile: portrait image on top, text block below */}
      <div className="lg:hidden">
        <img
          src={heroPortrait.url}
          alt="Kuthair founder portrait"
          className="w-full h-auto object-cover"
        />
        <div className="flex flex-col items-start gap-6 sm:gap-8 px-6 sm:px-10 py-12 sm:py-16">
          {TextBlock}
        </div>
      </div>
    </div>
  );
};
