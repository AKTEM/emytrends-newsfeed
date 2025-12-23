import { UserIcon, ShoppingBagIcon, HeartIcon, CreditCardIcon, BookOpenIcon, LockIcon, LogOutIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useState } from "react";

const menuItems = [
  { label: "My Account", path: "/dashboard", icon: UserIcon },
  { label: "Order", path: "/dashboard/orders", icon: ShoppingBagIcon },
  { label: "Wishlist", path: "/dashboard/wishlist", icon: HeartIcon },
  { label: "Payment", path: "/dashboard/payment", icon: CreditCardIcon },
  { label: "Address Book", path: "/dashboard/address-book", icon: BookOpenIcon },
  { label: "security Settings", path: "/dashboard/security", icon: LockIcon },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="w-full lg:w-64 bg-white">
      <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 transition-all whitespace-nowrap ${
                isActive
                  ? "bg-gold text-gold-foreground rounded-full"
                  : "text-gray-700 hover:bg-gray-100 rounded-full"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 text-gray-700 hover:bg-gray-100 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed lg:mt-8 whitespace-nowrap"
        >
          <LogOutIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{loggingOut ? "Logging out..." : "Log Out"}</span>
        </button>
      </nav>
    </aside>
  );
};
