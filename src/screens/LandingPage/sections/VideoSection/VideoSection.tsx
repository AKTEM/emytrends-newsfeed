import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const VideoSection = (): JSX.Element => {
  return (
    <section className="relative w-full flex items-end justify-start py-12 sm:py-16 lg:py-[70px] min-h-[400px] sm:min-h-[500px] lg:min-h-[659px] overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/kuthair-video.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-start gap-6 sm:gap-8 max-w-[602px] w-full px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start gap-4 w-full">
          <h2 className="w-full font-semibold text-white text-xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight text-left">
            THE ULTIMATE CHOICE FOR PREMIUM HAIR EXTENSION
          </h2>
        </div>

        <Link to="/our-world">
          <Button
            variant="outline"
            className="border-[1.5px] border-solid border-white bg-transparent hover:bg-white/10 w-auto sm:w-[236px] h-auto px-5 py-3 sm:p-5 rounded-lg"
          >
            <span className="text-white font-bold text-sm sm:text-base">
              ABOUT US
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
};
