import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { FooterSection } from "../LandingPage/sections/FooterSection";
import { Card, CardContent } from "../../components/ui/card";
import { ChevronUp, ChevronDown, Heart } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { useWishlist } from "../../contexts/WishlistContext";
import { useAuth } from "../../contexts/AuthContext";
import { BackButton } from "../../components/shared/BackButton";

const filterCategories = {
  product: ["New Arrivals", "Tape-Ins", "Ponytails", "Clip-Ins", "Trending", "Best Selling"],
  hairExtensions: ["Luxury Wigs", "Invisible Tape", "Hand-Tied Weft", "Classic Weft"],
  shade: ["Black", "Brown", "Blonde", "Red"],
  length: ["14\"", "16\"", "18\"", "20\"", "22\"", "24\""],
};

export const ShopAllPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { products: firebaseProducts, loading } = useProducts();

  const handleWishlistToggle = (e: React.MouseEvent, product: { id: string; title: string; price: number; images: string[] }) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate("/auth");
      return;
    }
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0] || "/placeholder.png",
      });
    }
  };

  const [selectedFilters, setSelectedFilters] = useState<{
    product: string[];
    hairExtensions: string[];
    shade: string[];
    length: string[];
  }>({
    product: [],
    hairExtensions: [],
    shade: [],
    length: [],
  });
  const [expandedSections, setExpandedSections] = useState<{
    product: boolean;
    hairExtensions: boolean;
    shade: boolean;
    length: boolean;
  }>({
    product: true,
    hairExtensions: true,
    shade: true,
    length: true,
  });

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Filter products based on selected filters
  const filteredProducts = firebaseProducts.filter((product) => {
    if (selectedFilters.product.length > 0 && !selectedFilters.product.includes(product.category)) {
      return false;
    }
    if (selectedFilters.hairExtensions.length > 0 && product.hairExtensionType && 
        !selectedFilters.hairExtensions.includes(product.hairExtensionType)) {
      return false;
    }
    if (selectedFilters.shade.length > 0) {
      const hasMatchingShade = product.shades?.some(shade => 
        selectedFilters.shade.includes(shade)
      );
      if (!hasMatchingShade) return false;
    }
    if (selectedFilters.length.length > 0) {
      const hasMatchingLength = product.lengths?.some(length => 
        selectedFilters.length.includes(length)
      );
      if (!hasMatchingLength) return false;
    }
    return true;
  });

  const FilterSection = ({
    title,
    category,
    items,
  }: {
    title: string;
    category: keyof typeof selectedFilters;
    items: string[];
  }) => (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => toggleSection(category as keyof typeof expandedSections)}
        className="flex items-center justify-between w-full py-2 text-foreground hover:text-primary transition-colors"
      >
        <span className="font-medium">{title}</span>
        {expandedSections[category as keyof typeof expandedSections] ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {expandedSections[category as keyof typeof expandedSections] && (
        <div className="mt-2 space-y-2">
          {items.map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
              <input
                type="checkbox"
                checked={selectedFilters[category].includes(item)}
                onChange={() => toggleFilter(category, item)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderWithDropdown />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <BackButton />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6 text-foreground">Filters</h2>
                <div className="space-y-4">
                  <FilterSection
                    title="Product Type"
                    category="product"
                    items={filterCategories.product}
                  />
                  <FilterSection
                    title="Hair Extensions"
                    category="hairExtensions"
                    items={filterCategories.hairExtensions}
                  />
                  <FilterSection
                    title="Shade"
                    category="shade"
                    items={filterCategories.shade}
                  />
                  <FilterSection
                    title="Length"
                    category="length"
                    items={filterCategories.length}
                  />
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground">All Products</h1>
              <p className="text-muted-foreground mt-2">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products match your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <button
                      onClick={(e) => product.id && handleWishlistToggle(e, { 
                        id: product.id, 
                        title: product.title, 
                        price: product.price, 
                        images: product.images 
                      })}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                        product.id && isInWishlist(product.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/80 text-gray-700 hover:bg-white"
                      }`}
                      aria-label={product.id && isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart className={`w-4 h-4 ${product.id && isInWishlist(product.id) ? "fill-white" : ""}`} />
                    </button>
                    <Link to={`/product/${product.id}`}>
                      <Card className="group hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden rounded-t-lg">
                            <img
                              src={product.images[0] || "/placeholder.png"}
                              alt={product.title}
                              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
                              {product.title}
                            </h3>
                            <p className="text-primary font-bold text-lg">
                              ${product.price}
                            </p>
                            {product.colors && product.colors.length > 0 && (
                              <div className="flex gap-2 mt-3">
                                {product.colors.slice(0, 4).map((color, idx) => (
                                  <div
                                    key={idx}
                                    className="w-6 h-6 rounded-full border-2 border-border"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};
