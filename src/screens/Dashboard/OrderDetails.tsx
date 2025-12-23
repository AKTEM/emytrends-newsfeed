import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import { Button } from "../../components/ui/button";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { getOrder, Order, OrderStatus } from "../../lib/firebaseOrders";

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

export const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const orderData = await getOrder(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      </DashboardLayout>
    );
  }

  if (!order) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Link
            to="/dashboard/orders"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Orders</span>
          </Link>
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600">Order not found</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = order.totalAmount;
  const deliveryFee = order.deliveryFee || 10;
  const total = subtotal + deliveryFee;

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <Link
          to="/dashboard/orders"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium text-sm sm:text-base">Order Details</span>
        </Link>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2">Order #{order.id?.slice(0, 12)}</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">{totalItems} Item{totalItems !== 1 ? 's' : ''}</p>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">
            Placed on {order.createdAt && new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm sm:text-base font-bold">Total: ${total.toFixed(2)}</p>
        </div>

        {/* Order Items */}
        {order.items.map((item, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row gap-3 sm:gap-6">
            <img
              src={item.image || "/img-20250902-wa0002.png"}
              alt={item.title}
              className="w-full sm:w-24 md:w-32 h-40 sm:h-24 md:h-32 object-cover rounded-lg flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold mb-1">{item.title}</h3>
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
              <p className="text-xs sm:text-sm text-gray-600 mb-2">Quantity: {item.quantity}</p>
              <p className="text-sm sm:text-base font-bold mb-3">${item.price.toFixed(2)}</p>
              
              <div className={`inline-block px-2 sm:px-3 py-1 ${getStatusColor(order.status)} text-white text-xs font-bold mb-2`}>
                {getStatusLabel(order.status)}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                {order.updatedAt && `Updated: ${new Date(order.updatedAt).toLocaleDateString()}`}
              </p>
            </div>

            <div className="flex flex-row sm:flex-col gap-3 justify-between sm:justify-start">
              <Link to="/shop">
                <Button className="bg-black text-white hover:bg-gray-800 text-xs sm:text-sm">Buy Again</Button>
              </Link>
              <Link
                to={`/dashboard/orders/${orderId}/tracking`}
                className="text-xs sm:text-sm font-medium text-center hover:underline self-center"
              >
                See Status History
              </Link>
            </div>
          </div>
        ))}

        {/* Delivery Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">DELIVERY INFORMATION</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2 text-sm sm:text-base">Delivery Method</h3>
              <p className="text-gray-600 text-sm">Door Delivery</p>
            </div>

            <div>
              <h3 className="font-bold mb-2 text-sm sm:text-base">Shipping Address</h3>
              <p className="text-gray-600 text-sm">
                {order.shippingAddress.name}<br />
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}
                {order.shippingAddress.phone && <><br />Phone: {order.shippingAddress.phone}</>}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">PAYMENT INFORMATION</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2 text-sm sm:text-base">Payment Method</h3>
              <p className="text-gray-600 text-sm">{order.paymentMethod}</p>
            </div>

            <div>
              <h3 className="font-bold mb-2 text-sm sm:text-base">Payment Details</h3>
              <div className="space-y-1 text-gray-600 text-sm">
                <div className="flex justify-between">
                  <span>Items Total:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fees:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-black text-base sm:text-lg pt-2 border-t mt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
