import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { FooterSection } from "../LandingPage/sections/FooterSection";
import { getOrder, Order } from "../../lib/firebaseOrders";
import { CheckCircle2 } from "lucide-react";

export const OrderConfirmationPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getOrder(id)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      <HeaderWithDropdown />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-16 text-center">
        {loading ? (
          <p>Loading order…</p>
        ) : !order ? (
          <p>Order not found.</p>
        ) : (
          <>
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
            <p className="text-gray-600 mb-8">
              Order ID: <span className="font-mono">{order.id}</span>
            </p>
            <div className="border border-gray-200 rounded-lg p-6 text-left mb-8">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b last:border-0">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-4 font-bold text-lg">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Payment method: {order.paymentMethod}
              </p>
            </div>
            <Link
              to="/shop/all"
              className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </>
        )}
      </main>
      <FooterSection />
    </div>
  );
};
