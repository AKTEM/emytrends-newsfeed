import { useState } from "react";
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon, User as UserIcon, Menu as MenuIcon, X as XIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Footer } from "../../components/shared/Footer";

const navigationItems = [
  { label: "SHOP", path: "/shop" },
  { label: "LEARN", path: "/learn" },
  { label: "OUR WORLD", path: "/our-world" },
  { label: "BLOG", path: "/" },
];

const faqItems = [
  {
    question: "HOW LONG DO KUT TAPE-IN EXTENSIONS LAST?",
    answer: "",
  },
  {
    question: "WHAT ARE KUT HAIR EXTENSIONS MADE FROM?",
    answer: "",
  },
  {
    question: "CAN ANYONE WEAR KUT HAIR EXTENSIONS?",
    answer: "Yes, Kut Hair Extensions Are Designed For All Hair Types And Textures. Whether You Want Volume, Length, Or A Protective Style, We've Got You Covered.",
  },
  {
    question: "CAN I WEAR KUT HAIR EXTENSIONS IF I HAVE SHORT HAIR?",
    answer: "",
  },
  {
    question: "CAN I APPLY KUT HAIR EXTENSIONS MYSELF?",
    answer: "",
  },
  {
    question: "HOW DO I FIND A STYLIST FOR INSTALLATION?",
    answer: "",
  },
  {
    question: "WILL KUT HAIR EXTENSIONS DAMAGE MY NATURAL HAIR?",
    answer: "",
  },
  {
    question: "HOW DO I REMOVE KUT HAIR EXTENSIONS?",
    answer: "",
  },
];

const exploreProducts = [
  {
    id: 1,
    title: "TRENDING",
    image: "/img-20250902-wa0002.png",
  },
  {
    id: 2,
    title: "NEW ARRIVALS",
    image: "/img-20250902-wa0004.png",
  },
  {
    id: 3,
    title: "BEST SELLING",
    image: "/img-20250902-wa0005.png",
  },
  {
    id: 4,
    title: "BEST SELLING",
    image: "/img-20250902-wa0007.png",
  },
];

const shadeOptions = [
  { id: "all", label: "ALL" },
  { id: "black", label: "BLACK" },
  { id: "blonde", label: "BLONDE" },
  { id: "brown", label: "BROWN" },
  { id: "black-2", label: "BLACK" },
  { id: "black-3", label: "BLACK" },
];

const colorSwatches = [
  { id: 1, color: "#1a1a1a" },
  { id: 2, color: "#d4b896" },
  { id: 3, color: "#c67d4a" },
  { id: 4, color: "#a88a70" },
];

const lengthOptions = [
  { id: 1, label: "16 IN / 50" },
  { id: 2, label: "18 IN / 50" },
  { id: 3, label: "16 IN / 50" },
];

interface ProductDetailsPageProps {
  isAvailable?: boolean;
}

export const ProductDetailsPage = ({ isAvailable = true }: ProductDetailsPageProps): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState("all");
  const [selectedLength, setSelectedLength] = useState(lengthOptions[0].id);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(2);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="bg-white w-full min-h-screen relative flex flex-col">
      <header className="w-full bg-[#e5e5e5] sticky top-0 z-50">
        <div className="flex h-10 items-center justify-between px-4 sm:px-8 lg:px-12 py-2 w-full max-w-[1440px] mx-auto">
          <ChevronLeftIcon className="w-4 h-4 flex-shrink-0 text-gray-600" />
          <div className="inline-flex items-center justify-center gap-6 flex-1 px-2">
            <div className="font-medium text-gray-900 text-xs sm:text-sm text-center">
              Get 50% Discount On Every Item Purchased On Christmas Day
            </div>
          </div>
          <ChevronRightIcon className="w-4 h-4 flex-shrink-0 text-gray-600" />
        </div>
      </header>

      <header className="w-full h-16 sm:h-20 bg-[#1a1a1a] px-4 sm:px-8 lg:px-12 py-4 sm:py-5 relative">
        <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto">
          <Link to="/" className="font-bold text-white text-xl sm:text-2xl lg:text-3xl tracking-wider whitespace-nowrap">
            KUTHAIR
          </Link>

          <div className="flex items-center justify-end gap-4 sm:gap-6 lg:gap-12 flex-1">
            <nav className="hidden lg:flex gap-8 items-center">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-white text-sm font-medium hover:opacity-80 transition-opacity tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 sm:gap-5">
              <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white cursor-pointer hover:opacity-80 transition-opacity" />
              <Link to="/auth">
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white cursor-pointer hover:opacity-80 transition-opacity" />
              </Link>

              <div className="relative w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:opacity-80 transition-opacity">
                <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <Badge className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 py-0 bg-orange-600 text-white text-[10px] border-0 rounded-full flex items-center justify-center">
                  3
                </Badge>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-6 h-6 text-white cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden absolute left-0 right-0 bg-[#1a1a1a] shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-50 ${
            isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ top: "100%" }}
        >
          <nav className="flex flex-col py-4 px-4 sm:px-8">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center justify-start gap-2.5 py-4 px-4 text-white hover:bg-white/10 transition-all duration-200 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
              <img
                src="/img-20250902-wa0002.png"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-black"></div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                TAPE-IN EXTENSION, MOCHACHINO BROWN/DIRTY BLONDE
              </h1>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                Wake up every day with fuller, thicker, and longer hair with KurtHair Tape-ins! With a quick application process, your Kut Hair-certified stylist will expertly install your extensions for a flawless look...
              </p>
              <button className="text-sm font-medium text-gray-900 underline">
                Read More
              </button>
            </div>

            <div className="mb-2">
              <div className="text-3xl font-bold text-gray-900 mb-2">$400.00</div>
              <div className="inline-block px-4 py-1 bg-[#f5e6d3] text-gray-900 text-sm font-medium">
                SEMI-PERMANENT
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-3">Select Your Shade</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {shadeOptions.map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedShade(shade.id)}
                    className={`px-4 py-2 text-sm font-medium border transition-all ${
                      selectedShade === shade.id
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-900 border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {shade.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mb-6">
                {colorSwatches.map((swatch) => (
                  <button
                    key={swatch.id}
                    className="w-12 h-12 border-2 border-gray-300 hover:border-gray-900 transition-colors"
                    style={{ backgroundColor: swatch.color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-3">
                Select your Length: <span className="font-bold">16" | 500</span>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {lengthOptions.map((length) => (
                  <button
                    key={length.id}
                    onClick={() => setSelectedLength(length.id)}
                    className={`px-6 py-3 text-sm font-medium border transition-all ${
                      selectedLength === length.id
                        ? "bg-gray-100 border-gray-900"
                        : "bg-white border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {length.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-12 h-12 flex items-center justify-center border-x border-gray-300 font-medium">
                  {quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {isAvailable ? (
                <Button className="flex-1 h-12 bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors">
                  ADD TO CART
                </Button>
              ) : (
                <Button className="flex-1 h-12 bg-gray-300 text-gray-700 text-sm font-bold cursor-not-allowed" disabled>
                  SOLD OUT
                </Button>
              )}
            </div>

            {!isAvailable && (
              <Button className="w-full h-12 bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors">
                NOTIFY ME WHEN AVAILABLE
              </Button>
            )}
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">EXPLORE MORE</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-8">
            NOT SURE WHICH EXTENSIONS SUIT YOU BEST? WE'RE HERE TO GUIDE YOU.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {exploreProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-200 overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">{product.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#e5e5dc] px-4 sm:px-8 lg:px-12 py-12 sm:py-16 -mx-4 sm:-mx-8 lg:-mx-12">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
              FAQ
            </h2>

            <div className="flex flex-col gap-0">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-400">
                  <button
                    onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between py-6 text-left hover:opacity-80 transition-opacity"
                  >
                    <span className="text-sm sm:text-base font-bold text-gray-900 pr-4">
                      {item.question}
                    </span>
                    <span className="text-2xl font-light text-gray-900 flex-shrink-0">
                      {expandedFaqIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  {expandedFaqIndex === index && item.answer && (
                    <div className="pb-6 pr-12">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
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
