import { useState } from "react";
import { DashboardLayout } from "./DashboardLayout";
import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

const mockOrders = [
  {
    id: "114356763736",
    productName: "Silk Seam",
    color: "Caramel Blonde",
    image: "/img-20250902-wa0002.png",
    status: "Delivered",
    date: "14-08",
  },
  {
    id: "114356763737",
    productName: "Silk Seam",
    color: "Caramel Blonde",
    image: "/img-20250902-wa0002.png",
    status: "Delivered",
    date: "14-08",
  },
  {
    id: "114356763738",
    productName: "Silk Seam",
    color: "Caramel Blonde",
    image: "/img-20250902-wa0002.png",
    status: "Delivered",
    date: "14-08",
  },
];

export const Orders = () => {
  const [activeTab, setActiveTab] = useState<"ongoing" | "canceled">("ongoing");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Orders</h1>

        {mockOrders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <ShoppingBagIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">Your orders will show here</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Found something you like? Tap on the heart shaped icon next to the item to add it to
              your wishlist! All your saved items will appear here.
            </p>
            <Button className="bg-black text-white hover:bg-gray-800">Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex gap-4 border-b">
              <button
                onClick={() => setActiveTab("ongoing")}
                className={`px-6 py-3 font-bold transition-all ${
                  activeTab === "ongoing"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                ONGOING/DELIVERED (2)
              </button>
              <button
                onClick={() => setActiveTab("canceled")}
                className={`px-6 py-3 font-bold transition-all ${
                  activeTab === "canceled"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                CANCELED/RETURNED (2)
              </button>
            </div>

            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col sm:flex-row gap-6"
                >
                  <img
                    src={order.image}
                    alt={order.productName}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{order.productName}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-amber-600 rounded"></div>
                      <span className="text-sm text-gray-600">{order.color}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Order {order.id}</p>
                    
                    <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold mb-2">
                      {order.status}
                    </div>
                    <p className="text-sm text-gray-600">On {order.date}</p>
                  </div>

                  <Link
                    to={`/dashboard/orders/${order.id}`}
                    className="text-sm font-medium hover:underline self-start sm:self-center"
                  >
                    See details
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};
