import { DashboardLayout } from "./DashboardLayout";
import { MapPinIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

export const AddressBook = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Address Book</h1>

        <div className="bg-white border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <MapPinIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">No addresses saved yet</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Add your shipping addresses for faster checkout.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800">Add New Address</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
