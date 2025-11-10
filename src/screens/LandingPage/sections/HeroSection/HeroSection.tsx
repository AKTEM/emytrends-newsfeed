
import { Link } from "react-router-dom";
import { HeaderWithDropdown } from "../../../../components/shared/HeaderWithDropdown";
import { Button } from "../../../../components/ui/button";

export const HeroSection = (): JSX.Element => {
  return (
    <div className="relative w-full bg-textsecondary-text">
      <HeaderWithDropdown />

      <div className="relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="relative h-[400px] sm:h-[500px] lg:h-auto">
            <img
              className="w-full h-full object-cover"
              alt="Hair model"
              src="/42450479-77ad-4d93-916d-ed46d010f27c.png"
            />
          </div>

          <div className="flex flex-col items-start justify-center gap-6 sm:gap-8 lg:gap-10 px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col items-start gap-2 sm:gap-3 lg:gap-4 w-full">
              <h1 className="[font-family:'Helvetica_Neue-Medium',Helvetica] font-medium text-white text-3xl sm:text-4xl md:text-5xl lg:text-[68px] tracking-[0.34px] leading-tight sm:leading-tight lg:leading-[104px]">
                REDEFINE
                <br />
                BEAUTY WITH EVERY STRAND
              </h1>

              <p className="font-medium-heading-small font-[number:var(--medium-heading-small-font-weight)] text-white text-[length:var(--medium-heading-small-font-size)] tracking-[var(--medium-heading-small-letter-spacing)] leading-[var(--medium-heading-small-line-height)] [font-style:var(--medium-heading-small-font-style)] text-sm sm:text-base lg:text-lg">
                Explore luxurious wigs and extensions
              </p>
            </div>

            <Link to="/shop/all" className="w-full sm:w-auto">
              <Button className="bg-tertiarytertiary-0 hover:bg-tertiarytertiary-0/90 text-textinverse-text font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-[length:var(--bold-title-medium-font-size)] tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)] px-5 py-4 sm:py-5 h-auto rounded-lg w-full">
                SHOP NOW
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
