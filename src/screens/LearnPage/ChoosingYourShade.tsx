
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { Footer } from "../../components/shared/Footer";
import { Button } from "../../components/ui/button";
import { ShadeHelpModal } from "../../components/modals/ShadeHelpModal";
import { useState } from "react";

export const ChoosingYourShadePage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shadeProducts = [
    { title: "MEDIUM", image: "/img-20250902-wa0002.png" },
    { title: "MEDIUM", image: "/img-20250902-wa0002.png" },
    { title: "MEDIUM", image: "/img-20250902-wa0002.png" },
    { title: "MEDIUM", image: "/img-20250902-wa0002.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="w-full bg-neutralneutral-1 sticky top-0 z-40">
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

      <HeaderWithDropdown />

      <div className="w-full bg-[#F6F3EF] py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primaryprimary-2 mb-3">
                CHOOSING YOUR SHADE
              </h1>
              <p className="text-base sm:text-lg text-primaryprimary-2">
                Seamless Blending, Effortless Glamour
              </p>
            </div>
            <div className="lg:flex-shrink-0">
              <img
                src="/42450479-77ad-4d93-916d-ed46d010f27c.png"
                alt="Hair model"
                className="w-full lg:w-64 h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col gap-12 lg:gap-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <img
                  src="/image-31.png"
                  alt="Hair close-up"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primaryprimary-2">
                  DISCOVER YOUR IDEAL SHADE
                </h2>

                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-primaryprimary-2 mb-2">
                      Step 1
                    </h3>
                    <h4 className="text-base sm:text-lg font-bold text-primaryprimary-2 mb-3">
                      Analyze Your Roots
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
                      <li>
                        <strong>The Foundation</strong>
                        <br />
                        Examine your natural root color in natural daylight. Note:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Undertones: Warm (golden/red) vs. Cool (ashy/neutral)</li>
                          <li>Variations: Gray regrowth or shadow roots?</li>
                        </ul>
                        Pro Tip: "Snap a photo of your roots against a white sheet for accurate digital matching."
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-primaryprimary-2 mb-2">
                      Step 2
                    </h3>
                    <h4 className="text-base sm:text-lg font-bold text-primaryprimary-2 mb-3">
                      Map Your Hair's Color Story
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
                      <li>
                        <strong>Beyond the Base</strong>
                        <br />
                        Identify dominant tones in your mid-lengths to ends:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Solid Color: Choose extensions within 1 shade of your all-over color.</li>
                          <li>Multi-Tonal: Opt for pre-blended extensions (e.g., "Caramel Latté" for balayage).</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Highlights/Lowlights:</strong> Match the lightest tone for seamless blending.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-primaryprimary-2 mb-2">
                      Step 3
                    </h3>
                    <h4 className="text-base sm:text-lg font-bold text-primaryprimary-2 mb-3">
                      Test & Transform
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
                      <li>
                        <strong>Virtual to Reality</strong>
                        <ul className="list-disc pl-5 mt-1">
                          <li>a. Use our Shade Finder Tool (upload a hair selfie for AI recommendations).</li>
                          <li>b. Order color swatches ($5, redeemable against purchase).</li>
                          <li>c. Bold Change? Consult our Color Melt Service for custom ombre.</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>

                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-tertiarytertiary-0 hover:bg-tertiarytertiary-0/90 text-white w-full sm:w-auto px-8 py-6 text-base sm:text-lg"
                >
                  GET HELP
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primaryprimary-2">
                  SHADES & TONES
                </h2>
                <Button
                  variant="outline"
                  className="border-tertiarytertiary-0 text-tertiarytertiary-0 hover:bg-tertiarytertiary-0 hover:text-white"
                >
                  SHOP ALL
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {shadeProducts.map((product, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="aspect-[3/4] overflow-hidden rounded-lg">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-bold text-primaryprimary-2">{product.title}</h3>
                      <p className="text-sm text-gray-600">
                        Subtle enhancement for effortless everyday elegance. Perfect for adding weightless volume to lobs or revitalizing thin ends while maintaining natural movement.
                      </p>
                      <Button className="bg-tertiarytertiary-0 hover:bg-tertiarytertiary-0/90 text-white w-full">
                        SHOP NOW
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <ShadeHelpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
