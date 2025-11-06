import { useState } from "react";
import { DashboardLayout } from "./DashboardLayout";
import { Button } from "../../components/ui/button";
import { Edit2Icon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export const MyAccount = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/42450479-77ad-4d93-916d-ed46d010f27c.png");
  const [formData] = useState({
    firstName: "Jenny",
    lastName: "Wilson",
    email: user?.email || "alma.lawson@example.com",
    phone: "(307) 555-0133",
    country: "Canada",
    city: "Toronto",
    province: "Ontario",
    postalCode: "242522",
    address: "4517 Washington Ave",
    addressLine2: "Manchester, Kentucky 39495",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">General Information</h1>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex gap-3">
            <label htmlFor="profile-upload">
              <Button
                type="button"
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => document.getElementById('profile-upload')?.click()}
              >
                Upload New
              </Button>
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <Button
              variant="outline"
              onClick={() => setProfileImage("/42450479-77ad-4d93-916d-ed46d010f27c.png")}
            >
              Remove Profile Picture
            </Button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Address</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Edit2Icon className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Country</p>
              <p className="text-base font-medium">{formData.country}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">City</p>
              <p className="text-base font-medium">{formData.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Province</p>
              <p className="text-base font-medium">{formData.province}</p>
            </div>
            <div className="md:col-span-3">
              <p className="text-sm text-gray-500 mb-1">Postal Code</p>
              <p className="text-base font-medium">{formData.postalCode}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Personal Details</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Edit2Icon className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">First Name</p>
              <p className="text-base font-medium">{formData.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Last Name</p>
              <p className="text-base font-medium">{formData.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="text-base font-medium">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phne Number</p>
              <p className="text-base font-medium">{formData.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
