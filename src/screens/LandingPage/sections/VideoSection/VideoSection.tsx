
import { Button } from "../../../../components/ui/button";

export const VideoSection = (): JSX.Element => {
  return (
    <section
      className="relative w-full flex items-end justify-center py-12 sm:py-16 lg:py-[70px] px-4 sm:px-8 lg:px-12 bg-cover bg-center bg-no-repeat min-h-[400px] sm:min-h-[500px] lg:min-h-[659px]"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(../video--text.png)",
      }}
    >
      <div className="flex flex-col items-center gap-6 sm:gap-8 max-w-[602px] w-full">
        <div className="flex flex-col items-start gap-4 w-full">
          <h2 className="w-full font-semi-bold-display-large font-[number:var(--semi-bold-display-large-font-weight)] text-white text-[length:var(--semi-bold-display-large-font-size)] text-center tracking-[var(--semi-bold-display-large-letter-spacing)] leading-[var(--semi-bold-display-large-line-height)] [font-style:var(--semi-bold-display-large-font-style)] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
            THE ULTIMATE CHOICE FOR PREMIUM HAIR EXTENSION
          </h2>
        </div>

        <Button
          variant="outline"
          className="border-[1.5px] border-solid border-white bg-transparent hover:bg-white/10 w-full sm:w-[236px] h-auto p-4 sm:p-5 rounded-lg"
        >
          <span className="font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-textinverse-text text-[length:var(--bold-title-medium-font-size)] tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
            ABOUT US
          </span>
        </Button>
      </div>
    </section>
  );
};
