import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { createPayPalOrder, capturePayPalOrder } from "../../lib/paypal";

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

export const PayPalCheckoutButton = ({ shippingAddress }: Props) => {
  const { cartItems, orderTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="w-full">
        <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded">
          Please sign in to complete your purchase.
        </div>
        <button
          type="button"
          onClick={() => navigate("/auth")}
          className="mt-3 w-full bg-[#E3A857] text-black font-semibold py-3 rounded"
        >
          Sign in to check out
        </button>
      </div>
    );
  }

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
            return await createPayPalOrder({
              items: cartItems.map((c) => ({
                productId: c.id,
                quantity: c.quantity,
                variantId: c.variant,
                color: c.color,
                length: c.variant,
              })),
              currency: "USD",
            });
          } catch (e: any) {
            setError(e.message ?? "Failed to create PayPal order");
            throw e;
          }
        }}
        onApprove={async (data) => {
          try {
            const result = await capturePayPalOrder(data.orderID, shippingAddress);
            clearCart();
            navigate(`/order-confirmation/${result.orderId}`);
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
