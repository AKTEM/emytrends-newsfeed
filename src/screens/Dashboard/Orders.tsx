import { useState, useEffect } from "react";
import { DashboardLayout } from "./DashboardLayout";
import { Link } from "react-router-dom";
import { ShoppingBagIcon, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../contexts/AuthContext";
import { getUserOrders, Order, OrderStatus } from "../../lib/firebaseOrders";

const getStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case "order_placed": return "ORDER PLACED";
    case "pending_confirmation": return "PENDING CONFIRMATION";
    case "out_for_delivery": return "OUT FOR DELIVERY";
    case "delivered": return "DELIVERED";
    case "cancelled": return "CANCELLED";
    default: return status;
  }
};

const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case "delivered": return "bg-green-600";
    case "cancelled": return "bg-red-600";
    case "out_for_delivery": return "bg-purple-600";
    case "pending_confirmation": return "bg-yellow-600";
    case "order_placed": return "bg-blue-600";
    default: return "bg-black";
  }
};

export const Orders = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"ongoing" | "canceled">("ongoing");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const userOrders = await getUserOrders(user.uid);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const ongoingOrders = orders.filter(order => 
    order.status !== "cancelled" && order.status !== "delivered"
  );
  
  const deliveredOrders = orders.filter(order => 
    order.status === "delivered"
  );

  const canceledOrders = orders.filter(order => 
    order.status === "cancelled"
  );

  const displayOrders = activeTab === "ongoing" 
    ? [...ongoingOrders, ...deliveredOrders] 
    : canceledOrders;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <ShoppingBagIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-2">Your orders will show here</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Once you place an order, it will appear here. Start shopping to see your order history!
            </p>
            <Link to="/shop">
              <Button className="bg-black text-white hover:bg-gray-800">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b overflow-x-auto">
              <button
                onClick={() => setActiveTab("ongoing")}
                className={`px-3 sm:px-6 py-2 sm:py-3 font-bold transition-all whitespace-nowrap text-xs sm:text-sm md:text-base ${
                  activeTab === "ongoing"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                ONGOING/DELIVERED ({ongoingOrders.length + deliveredOrders.length})
              </button>
              <button
                onClick={() => setActiveTab("canceled")}
                className={`px-3 sm:px-6 py-2 sm:py-3 font-bold transition-all whitespace-nowrap text-xs sm:text-sm md:text-base ${
                  activeTab === "canceled"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                CANCELED/RETURNED ({canceledOrders.length})
              </button>
            </div>

            {displayOrders.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center text-center">
                <ShoppingBagIcon className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600">No orders in this category</p>
              </div>
            ) : (
              <div className="space-y-4">
                {displayOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <p className="text-xs sm:text-sm text-gray-600">
                          Order #{order.id?.slice(0, 12)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {order.createdAt && new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Order Items */}
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row gap-3 sm:gap-6 border-t pt-4 first:border-t-0 first:pt-0">
                          <img
                            src={item.image || "/img-20250902-wa0002.png"}
                            alt={item.title}
                            className="w-full sm:w-24 md:w-32 h-40 sm:h-24 md:h-32 object-cover rounded-lg flex-shrink-0"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-bold mb-1 truncate">{item.title}</h3>
                            {item.color && (
                              <div className="flex items-center gap-2 mb-2">
                                <div 
                                  className="w-4 h-4 rounded border border-gray-300" 
                                  style={{ backgroundColor: item.color }}
                                />
                                <span className="text-xs sm:text-sm text-gray-600">{item.color}</span>
                              </div>
                            )}
                            {item.length && (
                              <p className="text-xs sm:text-sm text-gray-600 mb-2">Length: {item.length}</p>
                            )}
                            <p className="text-xs sm:text-sm text-gray-600 mb-2">Qty: {item.quantity}</p>
                            <p className="text-sm sm:text-base font-bold">${item.price.toFixed(2)}</p>
                          </div>

                          <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2">
                            <div className={`inline-block px-2 sm:px-3 py-1 ${getStatusColor(order.status)} text-white text-xs font-bold`}>
                              {getStatusLabel(order.status)}
                            </div>
                            <Link
                              to={`/dashboard/orders/${order.id}`}
                              className="text-xs sm:text-sm font-medium hover:underline"
                            >
                              See details
                            </Link>
                          </div>
                        </div>
                      ))}

                      {/* Order Total */}
                      <div className="border-t pt-3 flex justify-between items-center">
                        <span className="text-sm font-medium">Total:</span>
                        <span className="text-base sm:text-lg font-bold">${order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};
