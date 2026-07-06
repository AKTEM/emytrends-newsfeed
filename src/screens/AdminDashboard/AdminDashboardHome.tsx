import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Package, ShoppingCart, FileText, TrendingUp } from "lucide-react";
import { getProductCount } from "../../lib/firebaseProducts";
import { getOrderCount, getRecentOrders } from "../../lib/firebaseOrders";
import { getBlogPostCount } from "../../lib/firebaseBlogs";

export const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalBlogs: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Counts use Firestore aggregation (1 billed read each) instead of
        // fetching every document. Revenue is estimated from the 20 most recent
        // orders — cheap and good enough for a dashboard glance.
        const [productCount, orderCount, blogCount, recentOrders] = await Promise.all([
          getProductCount(),
          getOrderCount(),
          getBlogPostCount(),
          getRecentOrders(20),
        ]);
        const revenue = recentOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        setStats({
          totalProducts: productCount,
          totalOrders: orderCount,
          totalBlogs: blogCount,
          totalRevenue: revenue,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statCards = [
    { title: "Total Products", value: stats.totalProducts, icon: Package, color: "text-blue-500" },
    { title: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "text-green-500" },
    { title: "Blog Posts", value: stats.totalBlogs, icon: FileText, color: "text-purple-500" },
    { title: "Recent Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: TrendingUp, color: "text-orange-500" },
  ];

  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">
                  {loading ? "..." : stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-4 sm:mt-6 lg:mt-8">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Welcome to Your Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm sm:text-base">
            Use the sidebar to manage your products, orders, and blog posts.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
