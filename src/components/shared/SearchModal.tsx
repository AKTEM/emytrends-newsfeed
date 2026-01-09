import { useState, useEffect, useRef } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../lib/firebaseProducts";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { products } = useProducts();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.hairExtensionType?.toLowerCase().includes(query) ||
        product.shades?.some((shade) => shade.toLowerCase().includes(query)) ||
        product.lengths?.some((length) => length.toLowerCase().includes(query))
      );
    });

    setSearchResults(filtered.slice(0, 8)); // Limit to 8 results
  }, [searchQuery, products]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleResultClick = () => {
    setSearchQuery("");
    onClose();
  };

  // Static pages to search
  const staticPages = [
    { title: "Shop", path: "/shop", keywords: ["shop", "products", "buy", "store"] },
    { title: "All Products", path: "/shop/all", keywords: ["all", "products", "collection"] },
    { title: "Learn", path: "/learn", keywords: ["learn", "guide", "help", "tutorial"] },
    { title: "Choosing Your Length", path: "/learn/choosing-length", keywords: ["length", "size", "inches"] },
    { title: "Choosing Your Shade", path: "/learn/choosing-shade", keywords: ["shade", "color", "colour"] },
    { title: "Care Guide", path: "/learn/care-guide", keywords: ["care", "maintenance", "wash", "style"] },
    { title: "Our World", path: "/our-world", keywords: ["about", "world", "story", "brand"] },
    { title: "Blog", path: "/blog", keywords: ["blog", "articles", "news", "posts"] },
    { title: "Ponytails", path: "/ponytail", keywords: ["ponytail", "ponytails"] },
  ];

  const query = searchQuery.toLowerCase();
  const matchedPages = searchQuery.trim()
    ? staticPages.filter(
        (page) =>
          page.title.toLowerCase().includes(query) ||
          page.keywords.some((keyword) => keyword.includes(query))
      )
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <SearchIcon className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, pages, and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-lg outline-none placeholder:text-gray-400"
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {searchQuery.trim() === "" ? (
            <div className="p-8 text-center text-gray-500">
              <SearchIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Start typing to search...</p>
            </div>
          ) : searchResults.length === 0 && matchedPages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No results found for "{searchQuery}"</p>
              <p className="text-sm mt-2">Try different keywords</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {/* Products Section */}
              {searchResults.length > 0 && (
                <div className="p-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Products
                  </h3>
                  <div className="space-y-2">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={handleResultClick}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <img
                          src={product.images[0] || "/placeholder.png"}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${product.price} • {product.category}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages Section */}
              {matchedPages.length > 0 && (
                <div className="p-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Pages
                  </h3>
                  <div className="space-y-1">
                    {matchedPages.map((page) => (
                      <Link
                        key={page.path}
                        to={page.path}
                        onClick={handleResultClick}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-[#E3A857]/10 rounded-lg flex items-center justify-center">
                          <SearchIcon className="w-5 h-5 text-[#E3A857]" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {page.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* View All Link */}
              {searchResults.length > 0 && (
                <div className="p-4">
                  <Link
                    to={`/shop/all?search=${encodeURIComponent(searchQuery)}`}
                    onClick={handleResultClick}
                    className="block text-center py-3 text-[#E3A857] font-medium hover:bg-[#E3A857]/10 rounded-lg transition-colors"
                  >
                    View all results for "{searchQuery}"
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
};
