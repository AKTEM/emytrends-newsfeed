import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Button } from "../../components/ui/button";
import { LayoutDashboard, Package, ShoppingCart, FileText, LogOut, BarChart3, Menu, X, Settings } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { label: "Blogs", path: "/admin/blogs", icon: FileText },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export const AdminDashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black border-b border-border shadow-sm z-50 flex items-center justify-between px-4">
        <h1 className="text-lg font-bold text-white">Admin Panel</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          className="text-white hover:text-white hover:bg-white/10"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </header>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 h-screen
          w-64 border-r border-border flex flex-col
          z-50 transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          bg-card lg:bg-card
        `}
        style={{ backgroundColor: isMobileMenuOpen ? '#D5D0C8' : undefined }}
      >
        <div className="p-6 hidden lg:block">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <div className="p-6 lg:hidden mt-16">
          <h1 className="text-xl font-bold">Menu</h1>
        </div>
        <nav className="px-4 space-y-2 flex-1 overflow-y-auto pb-20">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border mt-auto">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-0 mt-16 lg:mt-0 w-full">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
