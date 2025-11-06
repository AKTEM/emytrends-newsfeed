import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { FooterSection } from "../LandingPage/sections/FooterSection";

export const OurWorldPage = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-h-screen relative flex flex-col">
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

      <main className="flex-1 bg-[#F5F5F5]">
        <section className="w-full bg-[#F5F2EE] py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center lg:text-left mb-8 sm:mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-medium tracking-[0.34px] leading-tight mb-4">
                SLAY SEASON, QUEEN
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700">
                Elevate your look with the hair of your dreams
              </p>
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-24">
              <div className="order-2 lg:order-1">
                <img
                  src="/img-20250902-wa0002.png"
                  alt="Luxury hair model"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2 flex flex-col gap-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  LUXURY REDEFINED, BEAUTY ELEVATED
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-gray-700">
                  <p>
                    At KutHair, we specialize in 100% Virgin hair, ethically sourced from donors with no
                    chemical treatment. Each strand is carefully aligned for natural softness, minimal
                    tangling, and long-lasting wear.
                  </p>
                  <p>
                    Our chemical-free, silicone-free extensions maintain quality for 12-18 months with
                    proper care. Designed for effortless styling and seamless blending, Kut Hair delivers
                    luxury, durability, and timeless beauty.
                  </p>
                  <p className="font-semibold">Your style. Our passion.</p>
                </div>
                <Button className="bg-[#E3A857] hover:bg-[#d19a4a] text-white font-semibold px-8 py-6 rounded-lg w-full sm:w-auto text-base sm:text-lg">
                  DISCOVER MORE
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  LUXURY REDEFINED, BEAUTY ELEVATED
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-gray-700">
                  <p>
                    Our mission is to empower individuals with high-quality, ethically sourced products
                    that enhance confidence and self-expression. We are committed to excellence,
                    innovation, and sustainability, offering hair extensions and wigs that not only exceed
                    exceeds expectations. Through meticulous craftsmanship and sustainable
                    practices, we strive to deliver premium products that stand the test of time, helping
                    our customers look and feel their best every day.
                  </p>
                </div>
                <Button className="bg-[#E3A857] hover:bg-[#d19a4a] text-white font-semibold px-8 py-6 rounded-lg w-full sm:w-auto text-base sm:text-lg">
                  DISCOVER MORE
                </Button>
              </div>
              <div>
                <img
                  src="/img-20250902-wa0004.png"
                  alt="Beauty model"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#F5F5F5] py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">EXPLORE MORE</h2>
              <p className="text-base sm:text-lg text-gray-700">
                NOT SURE WHICH EXTENSIONS SUIT YOU BEST? WE'RE HERE TO GUIDE YOU.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { title: "TRENDING", image: "/img-20250902-wa0002.png" },
                { title: "NEW ARRIVALS", image: "/img-20250902-wa0004.png" },
                { title: "BEST SELLING", image: "/img-20250902-wa0005.png" },
                { title: "BEST SELLING", image: "/img-20250902-wa0007.png" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-4 group cursor-pointer">
                  <div className="overflow-hidden rounded-lg shadow-md">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[300px] sm:h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-center">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};
