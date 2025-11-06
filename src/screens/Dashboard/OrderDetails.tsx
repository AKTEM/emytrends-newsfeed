import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout";
import { Button } from "../../components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export const OrderDetails = () => {
  const { orderId } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Link
          to="/dashboard/orders"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Order Details</span>
        </Link>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Order no 1117878</h2>
          <p className="text-sm text-gray-600 mb-1">1 Item</p>
          <p className="text-sm text-gray-600 mb-1">placed on 06-08-2025</p>
          <p className="text-sm font-bold">Total: $50.00</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col sm:flex-row gap-6">
          <img
            src="/img-20250902-wa0002.png"
            alt="Product"
            className="w-32 h-32 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">Silk Seam</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-amber-600 rounded"></div>
              <span className="text-sm text-gray-600">Caramel Blonde</span>
            </div>
            <p className="text-sm font-bold mb-3">$50.00</p>
            
            <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold mb-2">
              Delivered
            </div>
            <p className="text-sm text-gray-600">On 14-08</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button className="bg-black text-white hover:bg-gray-800">Buy Again</Button>
            <Link
              to={`/dashboard/orders/${orderId}/tracking`}
              className="text-sm font-medium text-center hover:underline"
            >
              See Status History
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">DELIVERY INFORMATION</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">Delivery Method</h3>
              <p className="text-gray-600">Door Delivery</p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Shipping Address</h3>
              <p className="text-gray-600">4517 Washington Ave. Manchester, Kentucky 39495</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">PAYMENT INFORMATION</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">Payment Method</h3>
              <p className="text-gray-600">Payment on Delivery</p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Payment Details</h3>
              <div className="space-y-1 text-gray-600">
                <div className="flex justify-between">
                  <span>Items Total:</span>
                  <span>$50.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fees: 10.00</span>
                  <span></span>
                </div>
                <div className="flex justify-between font-bold text-black">
                  <span>Total:</span>
                  <span>$60.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
