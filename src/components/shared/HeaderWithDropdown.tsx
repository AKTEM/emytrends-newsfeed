import { SearchIcon, ShoppingCartIcon, UserIcon, MenuIcon, XIcon, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { ShoppingCart } from "./ShoppingCart";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

const shopCategories = {
  featured: [
    { label: "New Arrivals", path: "/shop/all?category=New Arrivals" },
    { label: "Trending", path: "/shop/all?category=Trending" },
    { label: "Best Selling", path: "/shop/all" },
    { label: "Best Selling", path: "/shop/all" },
  ],
  hairExtensions: [
    { label: "Luxury Wigs", path: "/shop/all?category=Luxury Wigs" },
    { label: "Invisible Tape", path: "/shop/all?category=Invisible Tape" },
    { label: "Hand-Tied Weft", path: "/shop/all?category=Hand-Tied Weft" },
    { label: "Classic Weft", path: "/shop/all?category=Classic Weft" },
  ],
  hairShade: [
    { label: "Black", path: "/shop/all?category=Black" },
    { label: "Brown", path: "/shop/all?category=Brown" },
    { label: "Blonde", path: "/shop/all?category=Blonde" },
    { label: "Red", path: "/shop/all?category=Red" },
  ],
};

export const HeaderWithDropdown = (): JSX.Element => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isShopMobileOpen, setIsShopMobileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getDisplayName = () => {
    if (!user?.email) return "";
    const name = user.email.split("@")[0];
    return name.length > 10 ? name.substring(0, 10) + "..." : name;
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsUserDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigationItems = [
    { label: "SHOP", path: "/shop", hasDropdown: true },
    { label: "LEARN", path: "/learn" },
    { label: "OUR WORLD", path: "/our-world" },
    { label: "BLOG", path: "/" },
  ];

  return (
    <header className="w-full h-16 sm:h-20 lg:h-24 bg-primaryprimary-2 px-4 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 relative z-50">
      <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto">
        <Link
          to="/"
          className="[font-family:'Arsenica_Trial-Demibold',Helvetica] font-normal text-textinverse-text text-2xl sm:text-3xl lg:text-4xl tracking-[0] leading-[normal] whitespace-nowrap hover:opacity-80 transition-opacity"
        >
          KUTHAIR
        </Link>

        <div className="flex items-center justify-end gap-4 sm:gap-6 lg:gap-8 flex-1 max-w-[788px]">
          <nav className="hidden lg:flex gap-4 items-center">
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setIsShopDropdownOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsShopDropdownOpen(false)}
              >
                {item.hasDropdown ? (
                  <Link
                    to={item.path}
                    className="flex items-center justify-center gap-1 px-0 hover:opacity-80 transition-opacity"
                  >
                    <span className="font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-white text-[length:var(--bold-title-medium-font-size)] text-center tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <Link
                    to={item.path}
                    className="flex items-center justify-center gap-2.5 px-0 hover:opacity-80 transition-opacity"
                  >
                    <span className="font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-white text-[length:var(--bold-title-medium-font-size)] text-center tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
                      {item.label}
                    </span>
                  </Link>
                )}

                {item.hasDropdown && isShopDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="p-8">
                      <div className="mb-6">
                        <h3 className="text-[#E3A857] text-xl font-bold mb-6 tracking-wide">
                          FEATURED
                        </h3>
                        <div className="grid grid-cols-4 gap-6">
                          {shopCategories.featured.map((category, idx) => (
                            <Link
                              key={idx}
                              to={category.path}
                              className="text-black text-lg hover:text-[#E3A857] transition-colors"
                            >
                              {category.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6 mb-6">
                        <h3 className="text-[#E3A857] text-xl font-bold mb-6 tracking-wide">
                          HAIR EXTENSIONS
                        </h3>
                        <div className="grid grid-cols-4 gap-6">
                          {shopCategories.hairExtensions.map((category, idx) => (
                            <Link
                              key={idx}
                              to={category.path}
                              className="text-black text-lg hover:text-[#E3A857] transition-colors"
                            >
                              {category.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-[#E3A857] text-xl font-bold mb-6 tracking-wide">
                          HAIR SHADE
                        </h3>
                        <div className="grid grid-cols-4 gap-6">
                          {shopCategories.hairShade.map((category, idx) => (
                            <Link
                              key={idx}
                              to={category.path}
                              className="text-black text-lg hover:text-[#E3A857] transition-colors"
                            >
                              {category.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
<SearchIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white cursor-pointer hover:opacity-80 transition-opacity" />
{user ? (
  <div className="relative" ref={dropdownRef}>
    <div
      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
      className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
    >
      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-600 flex items-center justify-center">
        <span className="text-white text-xs font-bold">{user.email?.[0].toUpperCase()}</span>
      </div>
      <span className="hidden sm:inline text-white text-sm font-medium">{getDisplayName()}</span>
    </div>

    {isUserDropdownOpen && (
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
        <Link
          to="/dashboard"
          onClick={() => setIsUserDropdownOpen(false)}
          className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
        >
          User Profile/Dashboard
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
        >
          Log out
        </button>
      </div>
    )}
  </div>
) : (
  <Link to="/auth">
    <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[26px] lg:h-[26px] text-white cursor-pointer hover:opacity-80 transition-opacity" />
  </Link>
)}

            <div
              className="relative w-5 h-5 sm:w-6 sm:h-6 lg:w-[26px] lg:h-[26px] cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[26px] lg:h-[26px] text-white" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-auto min-w-[14px] px-1 py-0 bg-tertiarytertiary-0 text-white font-medium-body-small font-[number:var(--medium-body-small-font-weight)] text-[length:var(--medium-body-small-font-size)] tracking-[var(--medium-body-small-letter-spacing)] leading-[var(--medium-body-small-line-height)] [font-style:var(--medium-body-small-font-style)] border-0 rounded-full flex items-center justify-center text-[10px]">
                  {cartItems.length}
                </Badge>
              )}
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
        className={`lg:hidden absolute left-0 right-0 bg-primaryprimary-2 shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ top: "100%" }}
      >
        <nav className="flex flex-col py-4 px-4 sm:px-8">
          {navigationItems.map((item, index) => (
            <div key={index}>
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => setIsShopMobileOpen(!isShopMobileOpen)}
                    className="flex items-center justify-between w-full py-4 px-4 hover:bg-white/10 transition-all duration-200 rounded-lg"
                  >
                    <span className="font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-white text-[length:var(--bold-title-medium-font-size)] tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white transition-transform ${
                        isShopMobileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isShopMobileOpen && (
                    <div className="bg-white/5 rounded-lg ml-4 my-2">
                      <div className="p-4">
                        <p className="text-[#E3A857] text-sm font-bold mb-2">FEATURED</p>
                        <Link
                          to="/shop"
                          className="block text-white text-sm py-2 hover:text-[#E3A857] transition-colors font-semibold"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Go to shop
                        </Link>
                        {shopCategories.featured.map((category, idx) => (
                          <Link
                            key={idx}
                            to={category.path}
                            className="block text-white text-sm py-2 hover:text-[#E3A857] transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {category.label}
                          </Link>
                        ))}
                        <p className="text-[#E3A857] text-sm font-bold mb-2 mt-4">HAIR EXTENSIONS</p>
                        {shopCategories.hairExtensions.map((category, idx) => (
                          <Link
                            key={idx}
                            to={category.path}
                            className="block text-white text-sm py-2 hover:text-[#E3A857] transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {category.label}
                          </Link>
                        ))}
                        <p className="text-[#E3A857] text-sm font-bold mb-2 mt-4">HAIR SHADE</p>
                        {shopCategories.hairShade.map((category, idx) => (
                          <Link
                            key={idx}
                            to={category.path}
                            className="block text-white text-sm py-2 hover:text-[#E3A857] transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {category.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center justify-start gap-2.5 py-4 px-4 hover:bg-white/10 transition-all duration-200 rounded-lg transform hover:translate-x-1"
                  style={{
                    animation: isMobileMenuOpen
                      ? `slideInFromLeft 0.3s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-white text-[length:var(--bold-title-medium-font-size)] tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
                    {item.label}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      <style>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={(id) => setCartItems(cartItems.filter(item => item.id !== id))}
        onUpdateQuantity={(id, quantity) =>
          setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
          ))
        }
      />
    </header>
  );
};
