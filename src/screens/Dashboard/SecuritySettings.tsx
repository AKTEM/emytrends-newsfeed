import { DashboardLayout } from "./DashboardLayout";
import { Button } from "../../components/ui/button";
import { LockIcon } from "lucide-react";

export const SecuritySettings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Security Settings</h1>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <LockIcon className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Password</h2>
              <p className="text-sm text-gray-600">••••••••••••</p>
            </div>
          </div>
          
          <Button className="bg-black text-white hover:bg-gray-800">Change Password</Button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Two-Factor Authentication</h2>
          <p className="text-sm text-gray-600 mb-4">
            Add an extra layer of security to your account by enabling two-factor authentication.
          </p>
          <Button variant="outline">Enable 2FA</Button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Delete Account</h2>
          <p className="text-sm text-gray-600 mb-4">
            Permanently delete your account and all associated data.
          </p>
          <Button variant="destructive">Delete Account</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
