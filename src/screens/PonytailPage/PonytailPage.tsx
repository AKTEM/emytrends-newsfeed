import { useState } from "react";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { FooterSection } from "../LandingPage/sections/FooterSection";
import { Card, CardContent } from "../../components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon, ChevronUp, ChevronDown } from "lucide-react";

const products = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
  {
    id: 5,
    image: "/img-20250902-wa0008.png",
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
    id: 6,
    image: "/image-31.png",
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

const filterItems = Array(11).fill("Silk Seam Clip-In (20)");

export const PonytailPage = (): JSX.Element => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  return (
    <div className="bg-white w-full min-h-screen relative flex flex-col">
      {/* Promotional Banner */}
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

      {/* Header with Navigation */}
      <HeaderWithDropdown />

      {/* Hero Section with Title and Background */}
      <section className="w-full bg-[#F6F1E8] relative py-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black tracking-tight">
              PONYTAIL
            </h1>
          </div>
          <div className="hidden lg:block flex-shrink-0">
            <img
              src="/ponytail-hero.jpg"
              alt="Ponytail hairstyle"
              className="w-[280px] h-[180px] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-8 bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <aside className="w-full lg:w-[180px] flex-shrink-0">
            <div className="bg-[#F5F5F5] rounded-none lg:rounded-lg p-4 lg:max-h-[600px] lg:overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-black">PRODUCT</h3>
                <button 
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                  className="lg:hidden"
                >
                  {isFilterExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              <div className={`flex flex-col gap-3 ${isFilterExpanded ? 'block' : 'hidden lg:block'}`}>
                {filterItems.map((item, idx) => (
                  <label key={idx} className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded accent-black"
                    />
                    <span className="text-xs text-black leading-tight">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Product Grid */}
          <div className="flex-1">
            {/* Header with Item Count and Sort */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-black">10 ITEMS</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-black">SORT BY:</span>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm bg-white">
                  <option>Features</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="flex flex-col border-none shadow-none bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <CardContent className="flex flex-col items-start justify-center gap-4 p-0">
                    <div className="relative w-full">
                      <img
                        className="h-[300px] w-full object-cover rounded-lg"
                        alt={product.title}
                        src={product.image}
                      />
                    </div>

                    <div className="flex items-start justify-between gap-2 w-full">
                      <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
                        <p className="font-medium text-black text-sm line-clamp-2">
                          {product.title}
                        </p>
                      </div>

                      <p className="font-semibold text-black text-lg whitespace-nowrap">
                        {product.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {product.colors.map((colorOption, colorIndex) => (
                        <button
                          key={colorIndex}
                          className="w-6 h-6 rounded-sm border border-gray-300 hover:border-gray-900 transition-colors flex-shrink-0"
                          style={{ backgroundColor: colorOption.color }}
                          title={colorOption.name}
                        />
                      ))}
                      <button className="w-6 h-6 rounded-sm border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-sm font-bold">+</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};
