
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { Footer } from "../../components/shared/Footer";
import { Button } from "../../components/ui/button";
import { CareHelpModal } from "../../components/modals/CareHelpModal";
import { useState } from "react";

export const CareGuidePage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const careProducts = [
    { title: "silk Seam Clip-In Caramel Latte Rooted Highlight", price: "$50", image: "/image-33.png" },
    { title: "silk Seam Clip-In Caramel Latte Rooted Highlight", price: "$50", image: "/image-35.png" },
    { title: "silk Seam Clip-In Caramel Latte Rooted Highlight", price: "$50", image: "/image-36.png" },
    { title: "silk Seam Clip-In Caramel Latte Rooted Highlight", price: "$50", image: "/image.png" },
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
                KURTHAIR CARE MANUAL
              </h1>
              <p className="text-base sm:text-lg text-primaryprimary-2">
                Preserve the Luxury, Extend the Beauty
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
                  CARE GUIDE
                </h2>

                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-primaryprimary-2 mb-3">
                      WASH ROUTINE
                    </h3>
                    <h4 className="text-base font-semibold text-primaryprimary-2 mb-2">
                      Frequency & Techniques
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
                      <li>After 15-20 wears or when product buildup occurs</li>
                      <li>Brush Before Washing</li>
                      <li>Use a wide-tooth comb to gently detangle.</li>
                      <li>Lukewarm Water Only<br />Hot water strips moisture - keep below 100°F.</li>
                      <li>Sulfate-Free Shampoo</li>
                      <li>Massage in downward strokes (never rub).</li>
                      <li>Condition Mid-Lengths to Ends<br />Avoid roots to prevent slippage.</li>
                    </ul>
                    <p className="text-sm italic text-gray-600 mt-2">
                      Pro Tip: "For deep hydration, soak in our Silk Infusion Mask (10 mins) monthly.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-primaryprimary-2 mb-3">
                      DRYING & STYLING
                    </h3>
                    <h4 className="text-base font-semibold text-primaryprimary-2 mb-2">
                      Air-Drying Protocol
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
                      <li>Lay extensions flat on a microfiber towel</li>
                      <li>Pat dry – no wringing or twisting</li>
                      <li>Use a wide-tooth comb to gently detangle.</li>
                      <li>Hang from a ventilated rack (avoid metal clips)<br />Hot water strips moisture - keep below 100°F.</li>
                    </ul>
                    <h4 className="text-base font-semibold text-primaryprimary-2 mb-2 mt-4">
                      Heat Styling Rules
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
                      <li>Max 350°F for Remy human hair</li>
                      <li>Always Use Protectant</li>
                      <li>Curling Iron Technique</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-primaryprimary-2 mb-3">
                      STORAGE SOLUTIONS
                    </h3>
                    <h4 className="text-base font-semibold text-primaryprimary-2 mb-2">
                      Frequency & Techniques
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
                      <li>Silk Storage Pouch</li>
                      <li>Fold wefts neatly – no crimping</li>
                      <li>Use a wide-tooth comb to gently detangle.</li>
                      <li>Keep in a cool, dark place (avoid dryness)<br />Hot water strips moisture - keep below 100°F.</li>
                      <li>Avoid plastic bags (causes static)</li>
                      <li>Condition Mid-Lengths to Ends<br />Avoid roots to prevent slippage.</li>
                    </ul>
                    <p className="text-sm italic text-gray-600 mt-2">
                      Pro Tip: "Store clipped to a hanger for wrinkle-free readiness.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-primaryprimary-2 mb-3">
                      CARE KIT ESSENTIALS
                    </h3>
                    <h4 className="text-base font-semibold text-primaryprimary-2 mb-2">
                      Must Haves
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-700">
                      <li>Wide-Tooth Comb</li>
                      <li>PH-Balanced Shampoo</li>
                      <li>Travel Silk Pouch</li>
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
                  TREATMENT & TOOLS
                </h2>
                <Button
                  variant="outline"
                  className="border-tertiarytertiary-0 text-tertiarytertiary-0 hover:bg-tertiarytertiary-0 hover:text-white"
                >
                  SHOP ALL
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {careProducts.map((product, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-semibold text-primaryprimary-2 flex-1">
                          {product.title}
                        </h3>
                        <span className="text-sm font-bold text-primaryprimary-2">{product.price}</span>
                      </div>
                      <Button className="bg-tertiarytertiary-0 hover:bg-tertiarytertiary-0/90 text-white w-full text-sm">
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
      
      <CareHelpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
