import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import { ArrowLeftIcon, CheckCircle2Icon, CircleIcon, Loader2 } from "lucide-react";
import { getOrder, Order, OrderStatus } from "../../lib/firebaseOrders";

interface TrackingStep {
  status: string;
  statusKey: OrderStatus;
  date: string;
  message?: string;
  completed: boolean;
  isLast?: boolean;
  isCurrent?: boolean;
}

const STATUS_ORDER: OrderStatus[] = [
  "order_placed",
  "pending_confirmation",
  "out_for_delivery",
  "delivered"
];

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

const getStatusMessage = (status: OrderStatus): string => {
  switch (status) {
    case "order_placed": return "Your order has been placed successfully.";
    case "pending_confirmation": return "Your order is being confirmed by the seller.";
    case "out_for_delivery": return "Your order is on its way to you.";
    case "delivered": return "Your item/order has been delivered.";
    case "cancelled": return "Your order has been cancelled.";
    default: return "";
  }
};

export const PackageHistory = () => {
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
            to={`/dashboard/orders`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600">Order not found</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Build tracking steps based on order status and history
  const buildTrackingSteps = (): TrackingStep[] => {
    if (order.status === "cancelled") {
      // Show cancelled status
      return [{
        status: "CANCELLED",
        statusKey: "cancelled",
        date: order.updatedAt ? `On ${new Date(order.updatedAt).toLocaleDateString()}` : "",
        message: getStatusMessage("cancelled"),
        completed: true,
        isLast: true,
        isCurrent: true,
      }];
    }

    const currentStatusIndex = STATUS_ORDER.indexOf(order.status);
    
    return STATUS_ORDER.map((statusKey, index) => {
      const historyEntry = order.statusHistory?.find(h => h.status === statusKey);
      const isCompleted = index <= currentStatusIndex;
      const isCurrent = index === currentStatusIndex;
      const isLast = statusKey === "delivered";

      return {
        status: getStatusLabel(statusKey),
        statusKey,
        date: historyEntry 
          ? `On ${new Date(historyEntry.date).toLocaleDateString()}`
          : isCompleted 
            ? `On ${new Date(order.createdAt || new Date()).toLocaleDateString()}`
            : "",
        message: isCurrent ? getStatusMessage(statusKey) : undefined,
        completed: isCompleted,
        isLast,
        isCurrent,
      };
    });
  };

  const trackingSteps = buildTrackingSteps();

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <Link
          to={`/dashboard/orders/${orderId}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium text-sm sm:text-base">Package History</span>
        </Link>

        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold">Order #{order.id?.slice(0, 12)}</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {order.items.length} item{order.items.length !== 1 ? 's' : ''} • Total: ${order.totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="relative">
            {trackingSteps.map((step, index) => (
              <div key={index} className="flex gap-3 sm:gap-6 pb-6 sm:pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  {step.completed ? (
                    step.isLast && step.completed ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    ) : step.statusKey === "cancelled" ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    ) : (
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${step.isCurrent ? 'bg-blue-600' : 'bg-black'} flex items-center justify-center flex-shrink-0`}>
                        <CheckCircle2Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    )
                  ) : (
                    <CircleIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 flex-shrink-0" />
                  )}
                  {index < trackingSteps.length - 1 && (
                    <div className={`w-0.5 flex-1 my-2 min-h-[30px] sm:min-h-[40px] ${step.completed ? 'bg-black' : 'bg-gray-300'}`}></div>
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <div className={`inline-block px-2 sm:px-3 py-1 ${
                    step.statusKey === "cancelled" 
                      ? "bg-red-600" 
                      : step.completed 
                        ? step.isCurrent 
                          ? "bg-blue-600" 
                          : "bg-black" 
                        : "bg-gray-300"
                  } text-white text-xs font-bold mb-2`}>
                    {step.status}
                  </div>
                  {step.date && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">{step.date}</p>
                  )}
                  {step.message && (
                    <p className="text-xs sm:text-sm text-gray-600">{step.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
