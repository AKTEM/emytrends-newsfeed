import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "./DashboardLayout";
import { Button } from "../../components/ui/button";
import { Edit2Icon, SaveIcon, Loader2, Camera } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getUserProfile, saveUserProfile } from "../../lib/firebaseUserProfile";

export const MyAccount = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [profileImage, setProfileImage] = useState("/42450479-77ad-4d93-916d-ed46d010f27c.png");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    province: "",
    postalCode: "",
    streetAddress: "",
    addressLine2: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setFormData({
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            email: profile.email || user.email || "",
            phone: profile.phone || "",
            country: profile.address?.country || "",
            city: profile.address?.city || "",
            province: profile.address?.province || "",
            postalCode: profile.address?.postalCode || "",
            streetAddress: profile.address?.streetAddress || "",
            addressLine2: profile.address?.addressLine2 || "",
          });
          if (profile.profileImage) {
            setProfileImage(profile.profileImage);
          }
        } else {
          setFormData(prev => ({
            ...prev,
            email: user.email || "",
          }));
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("/42450479-77ad-4d93-916d-ed46d010f27c.png");
  };

  const handleSaveAddress = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await saveUserProfile(user.uid, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        profileImage,
        address: {
          country: formData.country,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
          streetAddress: formData.streetAddress,
          addressLine2: formData.addressLine2,
        },
      });
      setIsEditingAddress(false);
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePersonal = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await saveUserProfile(user.uid, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        profileImage,
        address: {
          country: formData.country,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
          streetAddress: formData.streetAddress,
          addressLine2: formData.addressLine2,
        },
      });
      setIsEditingPersonal(false);
    } catch (error) {
      console.error("Error saving personal details:", error);
      alert("Failed to save personal details. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">General Information</h1>

        {/* Profile Image Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <Button
                type="button"
                className="bg-gold text-gold-foreground hover:bg-gold/90 text-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload New
              </Button>
              
              <Button
                className="bg-white text-[#E3A857] border border-[#E3A857] hover:bg-[#F1ECF8] text-sm"
                onClick={handleRemoveImage}
              >
                Remove Profile Picture
              </Button>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold">Address</h2>
            {isEditingAddress ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveAddress}
                  disabled={saving}
                  className="bg-gold text-gold-foreground hover:bg-gold/90"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <SaveIcon className="w-4 h-4 mr-1" />}
                  Update
                </Button>
                <Button
                  size="sm"
                  className="bg-white text-[#E3A857] border border-[#E3A857] hover:bg-[#F1ECF8]"
                  onClick={() => setIsEditingAddress(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingAddress(true)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <Edit2Icon className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Country</p>
              {isEditingAddress ? (
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter country"
                />
              ) : (
                <p className="text-sm sm:text-base font-medium">{formData.country || "Not set"}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">City</p>
              {isEditingAddress ? (
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter city"
                />
              ) : (
                <p className="text-sm sm:text-base font-medium">{formData.city || "Not set"}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Province/State</p>
              {isEditingAddress ? (
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter province/state"
                />
              ) : (
                <p className="text-sm sm:text-base font-medium">{formData.province || "Not set"}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Postal Code</p>
              {isEditingAddress ? (
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter postal code"
                />
              ) : (
                <p className="text-sm sm:text-base font-medium">{formData.postalCode || "Not set"}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Street Address</p>
              {isEditingAddress ? (
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter street address"
                />
              ) : (
                <p className="text-sm sm:text-base font-medium">{formData.streetAddress || "Not set"}</p>
              )}
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <p className="text-sm text-gray-500 mb-1">Address Line 2</p>
              {isEditingAddress ? (
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              ) : (
                <p className="text-sm sm:text-base font-medium">{formData.addressLine2 || "Not set"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold">Personal Details</h2>
            {isEditingPersonal ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSavePersonal}
                  disabled={saving}
                  className="bg-gold text-gold-foreground hover:bg-gold/90"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <SaveIcon className="w-4 h-4 mr-1" />}
                  Update
                </Button>
                <Button
                  size="sm"
                  className="bg-white text-[#E3A857] border border-[#E3A857] hover:bg-[#F1ECF8]"
                  onClick={() => setIsEditingPersonal(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingPersonal(true)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <Edit2Icon className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">First Name</p>
              {isEditingPersonal ? (
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter first name"
                />
              ) : (
                <p className="text-sm sm:text-base font-medium">{formData.firstName || "Not set"}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Last Name</p>
              {isEditingPersonal ? (
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter last name"
                />
              ) : (
                <p className="text-sm sm:text-base font-medium">{formData.lastName || "Not set"}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              {isEditingPersonal ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter email"
                />
              ) : (
                <p className="text-sm sm:text-base font-medium break-all">{formData.email || "Not set"}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone Number</p>
              {isEditingPersonal ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter phone number"
                />
              ) : (
                <p className="text-sm sm:text-base font-medium">{formData.phone || "Not set"}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
