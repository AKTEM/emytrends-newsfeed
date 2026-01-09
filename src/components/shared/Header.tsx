import { SearchIcon, MenuIcon, XIcon } from "lucide-react";
import { UserIcon } from "./UserIcon";
import { CartIcon } from "./CartIcon";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { ShoppingCart } from "./ShoppingCart";
import { SearchModal } from "./SearchModal";
import { Logo } from "./Logo";
import { useAuth } from "../../contexts/AuthContext";
import { useAdmin } from "../../contexts/AdminContext";
import { useCart } from "../../contexts/CartContext";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

const navigationItems = [
  { label: "SHOP", path: "/shop" },
  { label: "LEARN", path: "/learn" },
  { label: "OUR WORLD", path: "/our-world" },
  { label: "BLOG", path: "/" },
];

export const Header = (): JSX.Element => {
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const { cartItems, removeFromCart, updateQuantity, totalItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  return (
    <header className="w-full h-16 sm:h-20 lg:h-24 bg-primaryprimary-2 px-4 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 relative">
      <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo fill="white" className="h-6 sm:h-7 lg:h-8 w-auto" />
        </Link>

        <div className="flex items-center justify-end gap-4 sm:gap-6 lg:gap-8 flex-1 max-w-[788px]">
          <nav className="hidden lg:flex gap-4 items-center">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center justify-center gap-2.5 px-0 hover:opacity-80 transition-opacity"
              >
                <div className="font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-white text-[length:var(--bold-title-medium-font-size)] text-center tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            <SearchIcon 
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={() => setIsSearchOpen(true)}
            />
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
                      to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      {isAdmin ? "Admin Dashboard" : "User Profile/Dashboard"}
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
              className="relative cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsCartOpen(true)}
            >
              <CartIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[26px] lg:h-[26px] text-white" />
              <Badge className="absolute -top-1 -right-1 h-auto min-w-[14px] px-1 py-0 bg-[#E3A857] text-white border-0 rounded-full flex items-center justify-center text-[10px] font-medium">
                {totalItems}
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
        className={`lg:hidden absolute left-0 right-0 bg-primaryprimary-2 shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ top: "100%" }}
      >
        <nav className="flex flex-col py-4 px-4 sm:px-8">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center justify-start gap-2.5 py-4 px-4 hover:bg-white/10 transition-all duration-200 rounded-lg transform hover:translate-x-1"
              style={{
                animation: isMobileMenuOpen
                  ? `slideInFromLeft 0.3s ease-out ${index * 0.1}s both`
                  : "none",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="font-bold-title-medium font-[number:var(--bold-title-medium-font-weight)] text-white text-[length:var(--bold-title-medium-font-size)] tracking-[var(--bold-title-medium-letter-spacing)] leading-[var(--bold-title-medium-line-height)] [font-style:var(--bold-title-medium-font-style)]">
                {item.label}
              </div>
            </Link>
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
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};
