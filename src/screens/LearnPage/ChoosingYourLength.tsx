
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { Footer } from "../../components/shared/Footer";
import { Button } from "../../components/ui/button";
import { LengthHelpModal } from "../../components/modals/LengthHelpModal";
import { useState } from "react";

export const ChoosingYourLengthPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lengthProducts = [
    { title: "MEDIUM", image: "/img-20250902-wa0002.png" },
    { title: "LONG", image: "/img-20250902-wa0004.png" },
    { title: "DRAMATIC", image: "/img-20250902-wa0005.png" },
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
                CHOOSING YOUR LENGTH
              </h1>
              <p className="text-base sm:text-lg text-primaryprimary-2">
                Tailored to Elevate Your Natural Beauty
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
                  DISCOVER YOUR IDEAL LENGTH
                </h2>

                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-primaryprimary-2 mb-2">
                      Step 1
                    </h3>
                    <h4 className="text-base sm:text-lg font-bold text-primaryprimary-2 mb-3">
                      Define Your Hair Goals
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
                      <li>
                        <strong>Seek Inspiration</strong>
                        <br />
                        Browse our KUTHAIR Lookbook featuring real clients with different face shapes and heights. Pin your favorite styles - whether it's "Boho Layers" or "Sleek Siren."
                        <br />
                        Pro Tip: "Extensions should complement your lifestyle. Love updos? Opt for 18-20" for effortless volume."
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-primaryprimary-2 mb-2">
                      Step 2
                    </h3>
                    <h4 className="text-base sm:text-lg font-bold text-primaryprimary-2 mb-3">
                      Measure Like a Stylist
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
                      <li>
                        <strong>The Crown-to-Tip Method</strong>
                        <ol className="list-decimal pl-5 mt-1">
                          <li>Part hair at the crown (where your head curves downward).</li>
                          <li>Use a silk ribbon (not tape!) to measure to your desired endpoint:</li>
                        </ol>
                        <ul className="list-disc pl-5 mt-1">
                          <li>Chin to Shoulders: 14-16" (subtle enhancement)</li>
                          <li>Collarbone to Mid-Back: 18-22" (signature glamour)</li>
                          <li>Waist+ Length: 24"+ (drama-ready)</li>
                        </ul>
                        Note: "Extensions appear 10% shorter when blended with natural hair."
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-primaryprimary-2 mb-2">
                      Step 3
                    </h3>
                    <h4 className="text-base sm:text-lg font-bold text-primaryprimary-2 mb-3">
                      Style Without Limits
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
                      <li>
                        <strong>Your Hair, Infinite Possibilities</strong>
                        <br />
                        KUTHAIR's 100% Remy human hair withstands:
                        <ul className="list-disc pl-5 mt-1">
                          <li>Heat: Curl at 380°F for beach waves or sleek flat-iron finishes.</li>
                          <li>Texture: Braid, twist, or pin into avant-garde updos.</li>
                          <li>Color: Safely lighten up to 3 shades (with our Balayage Service).</li>
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
                  LENGHTS
                </h2>
                <Button
                  variant="outline"
                  className="border-tertiarytertiary-0 text-tertiarytertiary-0 hover:bg-tertiarytertiary-0 hover:text-white"
                >
                  SHOP ALL
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lengthProducts.map((product, index) => (
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
                      {product.title === "MEDIUM" && (
                        <p className="text-sm text-gray-600">
                          Subtle enhancement for effortless everyday elegance. Perfect for adding weightless volume to lobs or revitalizing thin ends while maintaining natural movement.
                        </p>
                      )}
                      {product.title === "LONG" && (
                        <p className="text-sm text-gray-600">
                          The gold-standard length for mermaid-worthy flow. Ideal for transforming shoulder-length hair into cascading perfection or amplifying natural length with red-carpet density.
                        </p>
                      )}
                      {product.title === "DRAMATIC" && (
                        <p className="text-sm text-gray-600">
                          For those who believe more is more. Creates instant high-fashion impact, whether you're commanding a runway or turning sidewalks into personal catwalk.
                        </p>
                      )}
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
      
      <LengthHelpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
