import { DashboardLayout } from "./DashboardLayout";
import { CreditCardIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

export const Payment = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Methods</h1>

        <div className="bg-white border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <CreditCardIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">No payment methods added yet</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Add your preferred payment methods for faster checkout.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800">Add Payment Method</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
