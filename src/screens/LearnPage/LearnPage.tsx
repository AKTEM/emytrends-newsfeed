
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { Footer } from "../../components/shared/Footer";
import { Button } from "../../components/ui/button";

export const LearnPage = (): JSX.Element => {
  const trendingProducts = [
    {
      id: 1,
      title: "silk Seam Clip-In Caramel Latte Rooted Highlight",
      price: "$50",
      discount: "-30%",
      image: "/img-20250902-wa0002.png",
      colors: ["#000000", "#3D2817", "#8B4513", "#D2691E"],
    },
    {
      id: 2,
      title: "silk Seam Clip-In Caramel Latte Rooted Highlight",
      price: "$50",
      discount: "-30%",
      image: "/img-20250902-wa0004.png",
      colors: ["#000000", "#3D2817", "#8B4513", "#D2691E"],
    },
    {
      id: 3,
      title: "silk Seam Clip-In Caramel Latte Rooted Highlight",
      price: "$50",
      discount: "-30%",
      image: "/img-20250902-wa0005.png",
      colors: ["#000000", "#3D2817", "#8B4513", "#D2691E"],
    },
    {
      id: 4,
      title: "silk Seam Clip-In Caramel Latte Rooted Highlight",
      price: "$50",
      discount: "-30%",
      image: "/img-20250902-wa0007.png",
      colors: ["#000000", "#3D2817", "#8B4513", "#D2691E"],
    },
  ];

  const extensionTypes = [
    { title: "SEAMLESS CLIP-INS", image: "/img-20250902-wa0002.png" },
    { title: "HAND-TIED WEFT", image: "/img-20250902-wa0004.png" },
    { title: "INVISIBLE TAPE", image: "/img-20250902-wa0005.png" },
    { title: "CLASSIC WEFT", image: "/img-20250902-wa0007.png" },
  ];

  const treatmentProducts = [
    {
      id: 1,
      title: "silk Seam Clip-In Caramel Latte Rooted Highlight",
      price: "$50",
      image: "/image-33.png",
      colors: ["#000000", "#3D2817", "#8B4513", "#D2691E"],
    },
    {
      id: 2,
      title: "silk Seam Clip-In Caramel Latte Rooted Highlight",
      price: "$50",
      image: "/image-35.png",
      colors: ["#000000", "#3D2817", "#8B4513", "#D2691E"],
    },
    {
      id: 3,
      title: "silk Seam Clip-In Caramel Latte Rooted Highlight",
      price: "$50",
      image: "/image-36.png",
      colors: ["#000000", "#3D2817", "#8B4513", "#D2691E"],
    },
    {
      id: 4,
      title: "silk Seam Clip-In Caramel Latte Rooted Highlight",
      price: "$50",
      image: "/image.png",
      colors: ["#000000", "#3D2817", "#8B4513", "#D2691E"],
    },
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

      <main className="flex-1 w-full">
        <section className="w-full bg-[#F5F2EE] py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primaryprimary-2">
                  HAIR CARE
                </h1>
                <div className="flex flex-col gap-3">
                  <Link
                    to="/learn/length"
                    className="text-base sm:text-lg text-primaryprimary-2 hover:text-tertiarytertiary-0 transition-colors underline"
                  >
                    Choosing Your Length
                  </Link>
                  <Link
                    to="/learn/shade"
                    className="text-base sm:text-lg text-primaryprimary-2 hover:text-tertiarytertiary-0 transition-colors underline"
                  >
                    Choosing Your Shade
                  </Link>
                  <Link
                    to="/learn/care-guide"
                    className="text-base sm:text-lg text-primaryprimary-2 hover:text-tertiarytertiary-0 transition-colors underline"
                  >
                    Care Guide
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/img-20250902-wa0002.png"
                  alt="Hair care model 1"
                  className="w-full h-auto object-cover rounded-lg"
                />
                <img
                  src="/img-20250902-wa0004.png"
                  alt="Hair care model 2"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primaryprimary-2">
                TRENDING
              </h2>
              <Button
                variant="outline"
                className="border-tertiarytertiary-0 text-tertiarytertiary-0 hover:bg-tertiarytertiary-0 hover:text-white px-6 py-2"
              >
                SHOP ALL
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <div key={product.id} className="flex flex-col gap-4 group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-tertiarytertiary-0 text-white px-3 py-1 text-sm font-bold">
                      {product.discount}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-primaryprimary-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primaryprimary-2">
                        {product.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">+</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1440px] mx-auto relative">
            <div
              className="w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-cover bg-center rounded-lg flex items-center justify-center"
              style={{ backgroundImage: "url('/img-20250902-wa0008.png')" }}
            >
              <div className="text-center text-white px-4">
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  THE ULTIMATE<br />CHOICE FOR<br />PREMIUM HAIR<br />EXTENSION
                </h2>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primaryprimary-2 px-8 py-6 text-base sm:text-lg">
                  ABOUT US
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primaryprimary-2 mb-4">
                UNLOCKING THE SECRETS OF HAIR EXTENSIONS
              </h2>
              <p className="text-sm sm:text-base text-gray-700">
                NOT SURE WHICH EXTENSIONS SUIT YOU BEST? WE'RE HERE TO GUIDE YOU.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {extensionTypes.map((type, index) => (
                <div key={index} className="flex flex-col items-center gap-4">
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-lg">
                    <img
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-primaryprimary-2 text-center">
                    {type.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primaryprimary-2">
                TREATMENTS & TOOLS
              </h2>
              <Button
                variant="outline"
                className="border-tertiarytertiary-0 text-tertiarytertiary-0 hover:bg-tertiarytertiary-0 hover:text-white px-6 py-2"
              >
                SHOP ALL
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {treatmentProducts.map((product) => (
                <div key={product.id} className="flex flex-col gap-4 group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-primaryprimary-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primaryprimary-2">
                        {product.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">+</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
