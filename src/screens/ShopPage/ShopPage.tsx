
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { FooterSection } from "../LandingPage/sections/FooterSection";

const trendingProducts = [
  {
    id: 1,
    image: "/img-20250902-wa0007.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    rating: "/frame-1000002342.svg",
    price: "$50",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
  {
    id: 2,
    image: "/img-20250902-wa0004.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    rating: "/frame-1000002342.svg",
    price: "$50",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
  {
    id: 3,
    image: "/img-20250902-wa0005.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    rating: "/frame-1000002342.svg",
    price: "$50",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
  {
    id: 4,
    image: "/img-20250902-wa0002.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    rating: "/frame-1000002342.svg",
    price: "$50",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
];

const hairExtensionProducts = [
  {
    id: 5,
    image: "/image-31.png",
    title: "SEAMLESS CLIP-INS",
  },
  {
    id: 6,
    image: "/img-20250902-wa0008.png",
    title: "HAND-TIED WEFT",
  },
  {
    id: 7,
    image: "/image-31-1.png",
    title: "INVISIBLE TAPE",
  },
  {
    id: 8,
    image: "/image-31-2.png",
    title: "CLASSIC WEFT",
  },
];

const treatmentProducts = [
  {
    id: 9,
    image: "/img-20250902-wa0007.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    price: "$50",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
  {
    id: 10,
    image: "/img-20250902-wa0004.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    price: "$50",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
  {
    id: 11,
    image: "/img-20250902-wa0005.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    price: "$50",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
  {
    id: 12,
    image: "/img-20250902-wa0002.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    price: "$50",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
];

const categories = {
  featured: [
    { label: "New Arrivals" },
    { label: "Tape-Ins" },
    { label: "Tape-Ins" },
    { label: "Tape-Ins" },
  ],
  hairExtensions: {
    shopAll: "Shop All",
    shopByProductType: [
      { label: "Ponytail" },
      { label: "Clip-Ins" },
    ],
  },
  hairShade: [
    { label: "Black", color: "#000000" },
    { label: "Brown", color: "#5c4033" },
    { label: "Blonde", color: "#a67c52" },
    { label: "Red", color: "#7c3c2e" },
  ],
};

export const ShopPage = (): JSX.Element => {
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

      <HeaderWithDropdown />

      <div className="w-full bg-backgroundbackground-0 py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start flex-1">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-black text-2xl sm:text-3xl font-bold mb-6 tracking-tight">
                  FEATURED
                </h3>
                <div className="flex flex-col gap-3">
                  {categories.featured.map((item, idx) => (
                    <Link
                      key={idx}
                      to="#"
                      className="text-black text-lg hover:text-[#E3A857] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-black text-2xl sm:text-3xl font-bold mb-6 tracking-tight">
                  HAIR EXTENSIONS
                </h3>
                <div className="flex flex-col gap-3 mb-8">
                  <Link
                    to="/shop/all"
                    className="text-black text-lg hover:text-[#E3A857] transition-colors"
                  >
                    {categories.hairExtensions.shopAll}
                  </Link>
                </div>

                <h4 className="text-black text-lg font-semibold mb-4">
                  Shop by Product Type
                </h4>
                <div className="flex flex-col gap-3">
                  {categories.hairExtensions.shopByProductType.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.label === "Ponytail" ? "/shop/ponytail" : "#"}
                      className="text-black text-lg hover:text-[#E3A857] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-black text-lg font-semibold mb-4">
                  Shop by Shade
                </h3>
                <div className="flex flex-col gap-3">
                  {categories.hairShade.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded border border-gray-400"
                        style={{ backgroundColor: item.color }}
                      />
                      <Link
                        to="#"
                        className="text-black text-lg hover:text-[#E3A857] transition-colors"
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:flex-shrink-0 w-full lg:w-auto">
            <img
              src="/42450479-77ad-4d93-916d-ed46d010f27c.png"
              alt="Hair model"
              className="w-full lg:w-[420px] xl:w-[500px] h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <section className="flex flex-col w-full items-start gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-[100px] bg-backgroundbackground-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full max-w-[1440px] mx-auto">
          <h2 className="font-semi-bold-heading-large font-[number:var(--semi-bold-heading-large-font-weight)] text-black text-[length:var(--semi-bold-heading-large-font-size)] tracking-[var(--semi-bold-heading-large-letter-spacing)] leading-[var(--semi-bold-heading-large-line-height)] [font-style:var(--semi-bold-heading-large-font-style)] text-2xl sm:text-3xl lg:text-4xl">
            TRENDING
          </h2>

          <Link to="/shop/all?category=Trending">
            <Button
              variant="outline"
              className="h-12 sm:h-14 px-4 sm:px-5 py-4 sm:py-5 rounded-lg border-[1.5px] border-[#e3a857] bg-transparent hover:bg-tertiarytertiary-0/10 w-full sm:w-auto"
            >
              <span className="text-tertiarytertiary-0 font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-[length:var(--bold-title-medium-font-size)] tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
                SHOP ALL
              </span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1440px] mx-auto">
          {trendingProducts.map((product) => (
            <Link key={product.id} to="/shop/all?category=Trending">
              <Card
                className="flex flex-col border-none shadow-none bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
              >
                <CardContent className="flex flex-col items-start justify-center gap-6 p-0">
                  <div className="relative w-full">
                    <div className="absolute top-4 left-4 bg-[#E3A857] text-white text-xs font-bold px-3 py-1 rounded z-10">
                      -50%
                    </div>
                    <img
                      className="h-[200px] sm:h-[230px] lg:h-[258px] w-full object-cover rounded-lg"
                      alt={product.title}
                      src={product.image}
                    />
                  </div>

                  <div className="flex items-start justify-between gap-2 w-full">
                    <div className="flex flex-col items-start gap-2 sm:gap-[13px] flex-1 min-w-0">
                      <p className="font-medium-body-large font-[number:var(--medium-body-large-font-weight)] text-black text-[length:var(--medium-body-large-font-size)] tracking-[var(--medium-body-large-letter-spacing)] leading-[var(--medium-body-large-line-height)] [font-style:var(--medium-body-large-font-style)] text-sm sm:text-base line-clamp-2">
                        {product.title}
                      </p>

                      <img className="w-full max-w-[120px]" alt="Rating" src={product.rating} />
                    </div>

                    <p className="font-semi-bold-title-medium font-[number:var(--semi-bold-title-medium-font-weight)] text-black text-[length:var(--semi-bold-title-medium-font-size)] tracking-[var(--semi-bold-title-medium-letter-spacing)] leading-[var(--semi-bold-title-medium-line-height)] whitespace-nowrap [font-style:var(--semi-bold-title-medium-font-style)] text-base sm:text-lg">
                      {product.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {product.colors.map((colorOption, colorIndex) => (
                      <button
                        key={colorIndex}
                        className="w-5 h-5 rounded-sm border border-gray-300 hover:border-gray-900 transition-colors flex-shrink-0"
                        style={{ backgroundColor: colorOption.color }}
                        title={colorOption.name}
                      />
                    ))}
                    <button className="w-5 h-5 rounded-sm border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs font-bold">+</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="w-full bg-cover bg-center relative py-24 sm:py-32 lg:py-40 px-4 sm:px-8 lg:px-12"
        style={{ backgroundImage: "url('/our-world.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center gap-8">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
            THE ULTIMATE CHOICE FOR PREMIUM HAIR EXTENSION
          </h2>
          <Button className="h-12 sm:h-14 px-6 sm:px-8 py-4 sm:py-5 rounded-lg border-2 border-white bg-transparent hover:bg-white/10 transition-colors">
            <span className="text-white font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-[length:var(--bold-title-medium-font-size)] tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
              ABOUT US
            </span>
          </Button>
        </div>
      </section>

      <section className="flex flex-col w-full items-start gap-6 sm:gap-8 lg:gap-10 pt-12 sm:pt-16 lg:pt-[100px] pb-0 px-4 sm:px-8 lg:px-12 bg-backgroundbackground-2">
        <div className="flex flex-col items-start gap-2 sm:gap-3 lg:gap-4 w-full max-w-[1440px] mx-auto">
          <h2 className="w-full font-semi-bold-display-medium font-[number:var(--semi-bold-display-medium-font-weight)] text-black text-[length:var(--semi-bold-display-medium-font-size)] tracking-[var(--semi-bold-display-medium-letter-spacing)] leading-[var(--semi-bold-display-medium-line-height)] [font-style:var(--semi-bold-display-medium-font-style)] text-2xl sm:text-3xl lg:text-4xl">
            UNLOCKING THE SECRETS OF HAIR EXTENSIONS
          </h2>

          <p className="w-full font-regular-title-large font-[number:var(--regular-title-large-font-weight)] text-black text-[length:var(--regular-title-large-font-size)] tracking-[var(--regular-title-large-letter-spacing)] leading-[var(--regular-title-large-line-height)] [font-style:var(--regular-title-large-font-style)] text-base sm:text-lg lg:text-xl">
            NOT SURE WHICH EXTENSIONS SUIT YOU BEST? WE&#39;RE HERE TO GUIDE YOU.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1440px] mx-auto">
          {hairExtensionProducts.map((product) => (
            <Link key={product.id} to="/shop/all">
              <Card
                className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow overflow-hidden border-none shadow-none"
              >
                <CardContent className="flex flex-col items-start justify-center gap-4 sm:gap-6 p-0">
                  <img
                    className="w-full object-cover h-[250px] sm:h-[270px] lg:h-[274px]"
                    alt={product.title}
                    src={product.image}
                  />

                  <div className="flex items-center justify-center w-full px-4 pb-4">
                    <h3 className="font-semi-bold-title-large font-[number:var(--semi-bold-title-large-font-weight)] text-black text-[length:var(--semi-bold-title-large-font-size)] tracking-[var(--semi-bold-title-large-letter-spacing)] leading-[var(--semi-bold-title-large-line-height)] [font-style:var(--semi-bold-title-large-font-style)] text-base sm:text-lg text-center">
                      {product.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col w-full items-start gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-[100px] bg-backgroundbackground-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full max-w-[1440px] mx-auto">
          <h2 className="font-semi-bold-heading-large font-[number:var(--semi-bold-heading-large-font-weight)] text-black text-[length:var(--semi-bold-heading-large-font-size)] tracking-[var(--semi-bold-heading-large-letter-spacing)] leading-[var(--semi-bold-heading-large-line-height)] [font-style:var(--semi-bold-heading-large-font-style)] text-2xl sm:text-3xl lg:text-4xl">
            TREATMENTS & TOOLS
          </h2>

          <Link to="/shop/all">
            <Button
              variant="outline"
              className="h-12 sm:h-14 px-4 sm:px-5 py-4 sm:py-5 rounded-lg border-[1.5px] border-[#e3a857] bg-transparent hover:bg-tertiarytertiary-0/10 w-full sm:w-auto"
            >
              <span className="text-tertiarytertiary-0 font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-[length:var(--bold-title-medium-font-size)] tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
                SHOP ALL
              </span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1440px] mx-auto">
          {treatmentProducts.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col border-none shadow-none bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
            >
              <CardContent className="flex flex-col items-start justify-center gap-6 p-0">
                <img
                  className="h-[200px] sm:h-[230px] lg:h-[258px] w-full object-cover rounded-lg"
                  alt={product.title}
                  src={product.image}
                />

                <div className="flex items-start justify-between gap-2 w-full">
                  <div className="flex flex-col items-start gap-2 sm:gap-[13px] flex-1 min-w-0">
                    <p className="font-medium-body-large font-[number:var(--medium-body-large-font-weight)] text-black text-[length:var(--medium-body-large-font-size)] tracking-[var(--medium-body-large-letter-spacing)] leading-[var(--medium-body-large-line-height)] [font-style:var(--medium-body-large-font-style)] text-sm sm:text-base line-clamp-2">
                      {product.title}
                    </p>
                  </div>

                  <p className="font-semi-bold-title-medium font-[number:var(--semi-bold-title-medium-font-weight)] text-black text-[length:var(--semi-bold-title-medium-font-size)] tracking-[var(--semi-bold-title-medium-letter-spacing)] leading-[var(--semi-bold-title-medium-line-height)] whitespace-nowrap [font-style:var(--semi-bold-title-medium-font-style)] text-base sm:text-lg">
                    {product.price}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {product.colors.map((colorOption, colorIndex) => (
                    <button
                      key={colorIndex}
                      className="w-5 h-5 rounded-sm border border-gray-300 hover:border-gray-900 transition-colors flex-shrink-0"
                      style={{ backgroundColor: colorOption.color }}
                      title={colorOption.name}
                    />
                  ))}
                  <button className="w-5 h-5 rounded-sm border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 text-xs font-bold">+</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};
