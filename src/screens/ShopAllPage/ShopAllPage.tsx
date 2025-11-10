import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
    category: "Silk Seam Clip-In",
    shade: "Black",
    shadeStyle: "Balayage",
    length: "16\"",
    featured: "Trending",
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
    category: "Silk Seam Clip-In",
    shade: "Blonde",
    shadeStyle: "Highlight",
    length: "16\"",
    featured: "New Arrivals",
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
    category: "Silk Seam Clip-In",
    shade: "Black",
    shadeStyle: "Marble Blends",
    length: "16\"",
    featured: "Trending",
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
    category: "Luxury Wigs",
    shade: "Brown",
    shadeStyle: "Rooted",
    length: "16\"",
    featured: "New Arrivals",
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
    category: "Invisible Tape",
    shade: "Blonde",
    shadeStyle: "Balayage",
    length: "16\"",
    featured: "Trending",
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
    category: "Hand-Tied Weft",
    shade: "Black",
    shadeStyle: "Highlight",
    length: "16\"",
    featured: "New Arrivals",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
  {
    id: 7,
    image: "/img-20250902-wa0007.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    price: "$50",
    category: "Classic Weft",
    shade: "Red",
    shadeStyle: "Balayage",
    length: "16\"",
    featured: "Trending",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
  {
    id: 8,
    image: "/img-20250902-wa0004.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    price: "$50",
    category: "Silk Seam Clip-In",
    shade: "Blonde",
    shadeStyle: "Marble Blends",
    length: "16\"",
    featured: "New Arrivals",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
  {
    id: 9,
    image: "/img-20250902-wa0005.png",
    title: "silk Seam Clip-In Caramel Latter Roted Highlight",
    price: "$50",
    category: "Silk Seam Clip-In",
    shade: "Brown",
    shadeStyle: "Rooted",
    length: "16\"",
    featured: "Trending",
    colors: [
      { name: "Black", color: "#1a1a1a" },
      { name: "Blonde", color: "#d4b896" },
      { name: "Dark Brown", color: "#4a3728" },
      { name: "Auburn", color: "#6b3410" },
    ],
  },
];

const filterCategories = {
  product: ["Silk Seam Clip-In", "Luxury Wigs", "Invisible Tape", "Hand-Tied Weft", "Classic Weft"],
  shade: ["Black", "Brown", "Blonde", "Red"],
  shadeStyle: ["Balayage", "Marble Blends", "Rooted", "Highlight"],
  length: ["16\"", "18\"", "20\"", "22\""],
  featured: ["New Arrivals", "Trending"],
};

export const ShopAllPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    product: [] as string[],
    shade: [] as string[],
    shadeStyle: [] as string[],
    length: [] as string[],
    featured: [] as string[],
  });

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      // Apply filter based on URL parameter
      if (filterCategories.product.includes(category)) {
        setSelectedFilters(prev => ({ ...prev, product: [category] }));
      } else if (filterCategories.shade.includes(category)) {
        setSelectedFilters(prev => ({ ...prev, shade: [category] }));
      } else if (filterCategories.featured.includes(category)) {
        setSelectedFilters(prev => ({ ...prev, featured: [category] }));
      }
    }
  }, [searchParams]);

  const handleFilterChange = (filterType: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[filterType];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(f => f !== value)
        : [...currentFilters, value];
      return { ...prev, [filterType]: newFilters };
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesProduct = selectedFilters.product.length === 0 || selectedFilters.product.includes(product.category);
    const matchesShade = selectedFilters.shade.length === 0 || selectedFilters.shade.includes(product.shade);
    const matchesShadeStyle = selectedFilters.shadeStyle.length === 0 || selectedFilters.shadeStyle.includes(product.shadeStyle);
    const matchesLength = selectedFilters.length.length === 0 || selectedFilters.length.includes(product.length);
    const matchesFeatured = selectedFilters.featured.length === 0 || selectedFilters.featured.includes(product.featured);
    
    return matchesProduct && matchesShade && matchesShadeStyle && matchesLength && matchesFeatured;
  });

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

      {/* Hero Section */}
      <section className="w-full bg-[#F6F1E8] relative py-8 sm:py-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight mb-3">
              SLAY SEASON, QUEEN
            </h1>
            <p className="text-base sm:text-lg text-black">
              Elevate your look with the hair of your dreams
            </p>
          </div>
          <div className="hidden lg:block flex-shrink-0">
            <img
              src="/42450479-77ad-4d93-916d-ed46d010f27c.png"
              alt="Hair model"
              className="w-[280px] h-[180px] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="w-full px-4 sm:px-8 lg:px-12 py-8 bg-white">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <aside className="w-full lg:w-[200px] flex-shrink-0">
            <div className="bg-[#F5F5F5] rounded-none lg:rounded-lg p-4 lg:max-h-[800px] lg:overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-black">FILTERS</h3>
                <button 
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                  className="lg:hidden"
                >
                  {isFilterExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              <div className={`flex flex-col gap-6 ${isFilterExpanded ? 'block' : 'hidden lg:block'}`}>
                {/* FEATURED */}
                <div>
                  <h4 className="text-xs font-bold text-black mb-3">FEATURED</h4>
                  <div className="flex flex-col gap-2.5">
                    {filterCategories.featured.map((item) => (
                      <label key={item} className="flex items-start gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedFilters.featured.includes(item)}
                          onChange={() => handleFilterChange("featured", item)}
                          className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded accent-black"
                        />
                        <span className="text-xs text-black leading-tight">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* PRODUCT */}
                <div>
                  <h4 className="text-xs font-bold text-black mb-3">PRODUCT</h4>
                  <div className="flex flex-col gap-2.5">
                    {filterCategories.product.map((item) => (
                      <label key={item} className="flex items-start gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedFilters.product.includes(item)}
                          onChange={() => handleFilterChange("product", item)}
                          className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded accent-black"
                        />
                        <span className="text-xs text-black leading-tight">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* SHADE */}
                <div>
                  <h4 className="text-xs font-bold text-black mb-3">SHADE</h4>
                  <div className="flex flex-col gap-2.5">
                    {filterCategories.shade.map((item) => (
                      <label key={item} className="flex items-start gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedFilters.shade.includes(item)}
                          onChange={() => handleFilterChange("shade", item)}
                          className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded accent-black"
                        />
                        <span className="text-xs text-black leading-tight">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* SHADE STYLE */}
                <div>
                  <h4 className="text-xs font-bold text-black mb-3">SHADE STYLE</h4>
                  <div className="flex flex-col gap-2.5">
                    {filterCategories.shadeStyle.map((item) => (
                      <label key={item} className="flex items-start gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedFilters.shadeStyle.includes(item)}
                          onChange={() => handleFilterChange("shadeStyle", item)}
                          className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded accent-black"
                        />
                        <span className="text-xs text-black leading-tight">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* LENGTH */}
                <div>
                  <h4 className="text-xs font-bold text-black mb-3">LENGHT</h4>
                  <div className="flex flex-col gap-2.5">
                    {filterCategories.length.map((item) => (
                      <label key={item} className="flex items-start gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedFilters.length.includes(item)}
                          onChange={() => handleFilterChange("length", item)}
                          className="mt-0.5 w-4 h-4 border-2 border-gray-400 rounded accent-black"
                        />
                        <span className="text-xs text-black leading-tight">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Product Grid */}
          <div className="flex-1">
            {/* Header with Item Count and Sort */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-black">{filteredProducts.length} ITEMS</h2>
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
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                >
                  <Card className="flex flex-col border-none shadow-none bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
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
                </Link>
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
