import { useState, useEffect } from "react";
import { getAllOrders, updateOrder, Order, OrderStatus } from "../../lib/firebaseOrders";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Package, Eye, Truck, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "order_placed", label: "ORDER PLACED" },
  { value: "pending_confirmation", label: "PENDING CONFIRMATION" },
  { value: "out_for_delivery", label: "OUT FOR DELIVERY" },
  { value: "delivered", label: "DELIVERED" },
  { value: "cancelled", label: "CANCELLED" },
];

const getStatusLabel = (status: OrderStatus): string => {
  const option = STATUS_OPTIONS.find(opt => opt.value === status);
  return option?.label || status;
};

export const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getAllOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const order = orders.find(o => o.id === orderId);
      const newStatusHistory = [
        ...(order?.statusHistory || []),
        { status: newStatus, date: new Date(), note: `Status updated to ${getStatusLabel(newStatus)}` }
      ];
      
      await updateOrder(orderId, { 
        status: newStatus,
        statusHistory: newStatusHistory
      });
      await fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus, statusHistory: newStatusHistory });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "order_placed": return "bg-blue-500";
      case "pending_confirmation": return "bg-yellow-500";
      case "out_for_delivery": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "order_placed": return <Package className="w-4 h-4" />;
      case "pending_confirmation": return <Clock className="w-4 h-4" />;
      case "out_for_delivery": return <Truck className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading orders...</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Orders Management</h1>
        <Badge variant="outline" className="text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 w-fit">
          {orders.length} Total Orders
        </Badge>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">No orders yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="text-base sm:text-lg">Order #{order.id?.slice(0, 8)}</CardTitle>
                  <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 w-fit`}>
                    {getStatusIcon(order.status)}
                    <span className="text-xs sm:text-sm">{getStatusLabel(order.status)}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Customer Details:</p>
                    <p className="text-sm">{order.shippingAddress.name}</p>
                    {order.userEmail && <p className="text-sm text-muted-foreground">{order.userEmail}</p>}
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {order.shippingAddress.address}, {order.shippingAddress.city}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {order.shippingAddress.state} {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                    </p>
                    {order.shippingAddress.phone && (
                      <p className="text-xs sm:text-sm text-muted-foreground">Phone: {order.shippingAddress.phone}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Order Details:</p>
                    <p className="text-sm">Items: {order.items.length}</p>
                    <p className="text-sm">Subtotal: ${order.totalAmount.toFixed(2)}</p>
                    {order.deliveryFee && <p className="text-sm">Delivery Fee: ${order.deliveryFee.toFixed(2)}</p>}
                    <p className="text-sm font-bold">Total: ${(order.totalAmount + (order.deliveryFee || 0)).toFixed(2)}</p>
                    <p className="text-sm">Payment: {order.paymentMethod}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {order.createdAt && new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold mb-2">Items:</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 sm:gap-4 text-sm bg-gray-50 p-2 rounded">
                        {item.image && (
                          <img src={item.image} alt={item.title} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.title}</p>
                          <p className="text-muted-foreground text-xs sm:text-sm">
                            Qty: {item.quantity} × ${item.price}
                            {item.color && ` • Color: ${item.color}`}
                            {item.length && ` • Length: ${item.length}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Update Section */}
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold mb-3">Update Order Status:</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((statusOption) => (
                      <Button
                        key={statusOption.value}
                        size="sm"
                        variant={order.status === statusOption.value ? "default" : "outline"}
                        onClick={() => handleStatusUpdate(order.id!, statusOption.value)}
                        disabled={order.status === statusOption.value || updatingOrderId === order.id}
                        className={`text-xs ${order.status === statusOption.value ? getStatusColor(statusOption.value) : ''}`}
                      >
                        {statusOption.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-4 flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedOrder(null)}>
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Order Details - #{selectedOrder.id?.slice(0, 8)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Status:</p>
                <Badge className={`${getStatusColor(selectedOrder.status)} flex items-center gap-1 w-fit`}>
                  {getStatusIcon(selectedOrder.status)}
                  {getStatusLabel(selectedOrder.status)}
                </Badge>
              </div>

              {/* Status History */}
              {selectedOrder.statusHistory && selectedOrder.statusHistory.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">Status History:</p>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedOrder.statusHistory.map((history, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded">
                        <Badge className={`${getStatusColor(history.status)} text-xs`}>
                          {getStatusLabel(history.status)}
                        </Badge>
                        <span className="text-muted-foreground text-xs">
                          {new Date(history.date).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <p className="font-semibold mb-2">Customer Information:</p>
                <p>{selectedOrder.shippingAddress.name}</p>
                {selectedOrder.userEmail && <p className="text-muted-foreground">{selectedOrder.userEmail}</p>}
              </div>
              
              <div>
                <p className="font-semibold mb-2">Shipping Address:</p>
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                <p>{selectedOrder.shippingAddress.country}</p>
                {selectedOrder.shippingAddress.phone && <p>Phone: {selectedOrder.shippingAddress.phone}</p>}
              </div>
              
              <div>
                <p className="font-semibold mb-2">Order Items:</p>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 mb-2 p-2 border rounded">
                    {item.image && <img src={item.image} alt={item.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" />}
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      <p className="text-sm">Price: ${item.price}</p>
                      {item.color && <p className="text-sm text-muted-foreground">Color: {item.color}</p>}
                      {item.length && <p className="text-sm text-muted-foreground">Length: {item.length}</p>}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                  {selectedOrder.deliveryFee && (
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>${selectedOrder.deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${(selectedOrder.totalAmount + (selectedOrder.deliveryFee || 0)).toFixed(2)}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Payment Method: {selectedOrder.paymentMethod}</p>
              </div>
              
              <Button onClick={() => setSelectedOrder(null)} className="w-full">Close</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
