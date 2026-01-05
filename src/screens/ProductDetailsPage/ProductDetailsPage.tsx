import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { FooterSection } from "../LandingPage/sections/FooterSection";
import { ProductCart } from "../../components/shared/ProductCart";
import { NotifyWhenAvailableModal } from "../../components/modals/NotifyWhenAvailableModal";
import { getProduct, Product } from "../../lib/firebaseProducts";
import { useCart } from "../../contexts/CartContext";
import { PromoBanner } from "../../components/shared/PromoBanner";
import { BackButton } from "../../components/shared/BackButton";

const defaultFaqItems = [
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

const defaultShadeOptions = [
  { id: "all", label: "ALL" },
  { id: "black", label: "BLACK" },
  { id: "blonde", label: "BLONDE" },
  { id: "brown", label: "BROWN" },
];

const defaultColorSwatches: Array<{ id: string | number; color: string; name?: string }> = [
  { id: 1, color: "#1a1a1a" },
  { id: 2, color: "#d4b896" },
  { id: 3, color: "#c67d4a" },
  { id: 4, color: "#a88a70" },
];

const defaultLengthOptions: Array<{ id: string | number; label: string; price?: number }> = [
  { id: 1, label: "16 IN / 50", price: undefined },
  { id: 2, label: "18 IN / 50", price: undefined },
  { id: 3, label: "20 IN / 50", price: undefined },
];

export const ProductDetailsPage = (): JSX.Element | null => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState("");
  const [selectedLength, setSelectedLength] = useState<string | number | null>(null);
  const [selectedColorSwatch, setSelectedColorSwatch] = useState<string | number | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(2);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        navigate("/shop");
        return;
      }

      try {
        const productData = await getProduct(id);
        if (productData) {
          setProduct(productData);
          
          // Set default selections
          if (productData.shadeOptions && productData.shadeOptions.length > 0) {
            setSelectedShade(productData.shadeOptions[0].id);
          }
          if (productData.lengthOptions && productData.lengthOptions.length > 0) {
            setSelectedLength(productData.lengthOptions[0].id);
          }
          if (productData.colorSwatches && productData.colorSwatches.length > 0) {
            setSelectedColorSwatch(productData.colorSwatches[0].id);
          }

          // Load related products
          if (productData.relatedProductIds && productData.relatedProductIds.length > 0) {
            const relatedPromises = productData.relatedProductIds.map(relId => getProduct(relId));
            const relatedData = await Promise.all(relatedPromises);
            setRelatedProducts(relatedData.filter(p => p !== null) as Product[]);
          }
        } else {
          navigate("/shop");
        }
      } catch (error) {
        console.error("Error loading product:", error);
        navigate("/shop");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const isAvailable = product.inStock;

  const shadeOptions = product.shadeOptions || defaultShadeOptions;
  const colorSwatches = product.colorSwatches || defaultColorSwatches;
  const lengthOptions = product.lengthOptions || defaultLengthOptions;
  const faqItems = product.faqItems || defaultFaqItems;
  const exploreProducts = relatedProducts.length > 0 ? relatedProducts : [];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    const selectedLengthOption = lengthOptions.find((l) => l.id === selectedLength);
    const selectedColorSwatchData = colorSwatches.find((c) => c.id === selectedColorSwatch);
    
    const newItem = {
      id: Date.now().toString(),
      name: product.title,
      variant: selectedLengthOption ? selectedLengthOption.label : product.title,
      color: selectedColorSwatchData?.color || "#000000",
      price: (selectedLengthOption && selectedLengthOption.price) ? selectedLengthOption.price : product.price,
      quantity: quantity,
      image: product.images[0] || "/img-20250902-wa0002.png",
    };
    addToCart(newItem);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-white w-full min-h-screen relative flex flex-col">
      <header className="w-full bg-neutralneutral-1 sticky top-0 z-50">
        <PromoBanner />
      </header>

      <HeaderWithDropdown />

      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative">
              <img
                src={product.images[0] || "/img-20250902-wa0002.png"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {!isAvailable && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-2xl sm:text-3xl font-bold">OUT OF STOCK</span>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.slice(1, 5).map((img, idx) => (
                  <div key={idx} className="w-16 h-16 flex-shrink-0 bg-gray-200 overflow-hidden">
                    <img src={img} alt={`${product.title} ${idx + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                {product.fullDescription || product.description}
              </p>
              {product.fullDescription && product.fullDescription.length > 200 && (
                <button className="text-sm font-medium text-gray-900 underline">
                  Read More
                </button>
              )}
            </div>

            <div className="mb-2">
              <div className="text-3xl font-bold text-gray-900 mb-2">${product.price.toFixed(2)}</div>
              <div className="flex flex-wrap gap-2">
                {product.badge && (
                  <div className="inline-block px-4 py-1 bg-[#f5e6d3] text-gray-900 text-sm font-medium">
                    {product.badge}
                  </div>
                )}
                {!isAvailable && (
                  <div className="inline-block px-4 py-1 bg-red-100 text-red-700 text-sm font-bold">
                    OUT OF STOCK
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-3">Select Your Shade</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {shadeOptions.map((shade: { id: string; label: string }) => (
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

              <div className="flex flex-wrap gap-3 mb-6">
                {colorSwatches.map((swatch) => (
                  <button
                    key={swatch.id}
                    onClick={() => setSelectedColorSwatch(swatch.id)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 border-2 transition-colors ${
                      selectedColorSwatch === swatch.id ? "border-gray-900" : "border-gray-300 hover:border-gray-900"
                    }`}
                    style={{ backgroundColor: swatch.color }}
                    title={swatch.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-3">
                Select your Length
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {lengthOptions.map((length) => (
                  <button
                    key={length.id}
                    onClick={() => setSelectedLength(length.id)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium border transition-all ${
                      selectedLength === length.id
                        ? "bg-gray-100 border-gray-900"
                        : "bg-white border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {length.label}
                    {length.price && ` - $${length.price}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  disabled={!isAvailable}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-12 h-12 flex items-center justify-center border-x border-gray-300 font-medium">
                  {quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  disabled={!isAvailable}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {isAvailable ? (
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-gold text-gold-foreground text-sm font-bold hover:bg-gold/90 transition-colors"
                >
                  ADD TO CART
                </Button>
              ) : (
                <Button className="flex-1 h-12 bg-gray-300 text-gray-700 text-sm font-bold cursor-not-allowed" disabled>
                  SOLD OUT
                </Button>
              )}
            </div>

            {!isAvailable && (
              <Button 
                onClick={() => setIsNotifyModalOpen(true)}
                className="w-full h-12 bg-gold text-gold-foreground text-sm font-bold hover:bg-gold/90 transition-colors"
              >
                NOTIFY ME WHEN AVAILABLE
              </Button>
            )}
          </div>
        </div>

        {exploreProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">EXPLORE MORE</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-8">
              NOT SURE WHICH EXTENSIONS SUIT YOU BEST? WE'RE HERE TO GUIDE YOU.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {exploreProducts.map((relatedProduct) => (
                <div 
                  key={relatedProduct.id} 
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="aspect-[3/4] bg-gray-200 overflow-hidden mb-3 relative">
                    <img
                      src={relatedProduct.images[0] || "/img-20250902-wa0002.png"}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {!relatedProduct.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">OUT OF STOCK</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">{relatedProduct.title}</h3>
                  <p className="text-sm text-gray-700">${relatedProduct.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-[#e5e5dc] px-4 sm:px-8 lg:px-12 py-12 sm:py-16 -mx-4 sm:-mx-8 lg:-mx-12">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
              FAQ
            </h2>

            <div className="flex flex-col gap-0">
              {faqItems.map((item: { question: string; answer: string }, index: number) => (
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

      <FooterSection />

      <ProductCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <NotifyWhenAvailableModal
        isOpen={isNotifyModalOpen}
        onClose={() => setIsNotifyModalOpen(false)}
        productName={product.title}
      />
    </div>
  );
};
