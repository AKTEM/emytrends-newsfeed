import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { getAllProducts } from "../../lib/firebaseProducts";
import { getAllOrders, getRecentOrders, Order, OrderStatus } from "../../lib/firebaseOrders";
import { getAllBlogPosts } from "../../lib/firebaseBlogs";
import { Package, ShoppingCart, FileText, DollarSign, TrendingUp } from "lucide-react";
import { Badge } from "../../components/ui/badge";

const getStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case "order_placed": return "Order Placed";
    case "pending_confirmation": return "Pending Confirmation";
    case "out_for_delivery": return "Out for Delivery";
    case "delivered": return "Delivered";
    case "cancelled": return "Cancelled";
    default: return status;
  }
};

export const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalBlogs: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [products, orders, blogs, recent] = await Promise.all([
        getAllProducts(),
        getAllOrders(),
        getAllBlogPosts(),
        getRecentOrders(5),
      ]);

      const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const pending = orders.filter(order => 
        order.status === "order_placed" || order.status === "pending_confirmation"
      ).length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalBlogs: blogs.length,
        totalRevenue: revenue,
        pendingOrders: pending,
      });

      setRecentOrders(recent);
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return "default";
      case "out_for_delivery":
        return "secondary";
      case "pending_confirmation":
        return "outline";
      case "order_placed":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 sm:py-6 lg:py-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">Analytics Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">Active products in store</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.pendingOrders} pending orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">All-time revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.totalBlogs}</div>
            <p className="text-xs text-muted-foreground mt-1">Published content</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-sm">No orders yet</p>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0 gap-2">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-medium text-sm sm:text-base">Order #{order.id?.slice(-6)}</span>
                        <Badge variant={getStatusColor(order.status)} className="text-xs">
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''} • {order.shippingAddress.name}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-sm sm:text-base">${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-muted-foreground">Average Order Value</span>
                <span className="font-semibold text-sm sm:text-base">
                  ${stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : '0.00'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-muted-foreground">Products per Order</span>
                <span className="font-semibold text-sm sm:text-base">
                  {stats.totalOrders > 0 ? (recentOrders.reduce((sum, order) => sum + order.items.length, 0) / recentOrders.length).toFixed(1) : '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-muted-foreground">Pending Orders</span>
                <span className="font-semibold text-sm sm:text-base">{stats.pendingOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-muted-foreground">Active Content</span>
                <span className="font-semibold text-sm sm:text-base">{stats.totalBlogs} blogs</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
