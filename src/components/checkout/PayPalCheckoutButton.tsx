import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { createPayPalOrder, capturePayPalOrder } from "../../lib/paypal";
import { addOrder, OrderItem } from "../../lib/firebaseOrders";

interface Props {
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
  };
}

const DEFAULT_ADDRESS = {
  name: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
};

export const PayPalCheckoutButton = ({ shippingAddress }: Props) => {
  const { cartItems, orderTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full">
      {error && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
          {error}
        </div>
      )}
      <PayPalButtons
        style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
        disabled={cartItems.length === 0 || orderTotal <= 0}
        createOrder={async () => {
          setError(null);
          try {
            return await createPayPalOrder({ amount: orderTotal, currency: "USD" });
          } catch (e: any) {
            setError(e.message ?? "Failed to create PayPal order");
            throw e;
          }
        }}
        onApprove={async (data) => {
          try {
            const capture = await capturePayPalOrder(data.orderID);

            const items: OrderItem[] = cartItems.map((c) => ({
              productId: c.id,
              title: c.name,
              price: c.price,
              quantity: c.quantity,
              image: c.image,
              color: c.color,
              length: c.variant,
            }));

            const orderId = await addOrder({
              userId: user?.uid ?? "guest",
              userEmail: user?.email ?? undefined,
              items,
              totalAmount: orderTotal,
              status: "order_placed",
              shippingAddress: shippingAddress ?? DEFAULT_ADDRESS,
              paymentMethod: "paypal",
              statusHistory: [
                {
                  status: "order_placed",
                  date: new Date(),
                  note: `PayPal capture ${capture?.id ?? data.orderID}`,
                },
              ],
            });

            clearCart();
            navigate(`/order-confirmation/${orderId}`);
          } catch (e: any) {
            setError(e.message ?? "Payment capture failed");
          }
        }}
        onError={(err: any) => {
          const msg =
            typeof err === "string"
              ? err
              : err?.message ?? "PayPal error. Please try again.";
          setError(msg);
          console.error("PayPal onError:", err);
        }}
      />
    </div>
  );
};
