import { useState, useEffect } from "react";
import { DashboardLayout } from "./DashboardLayout";
import { MapPinIcon, Plus, Pencil, Trash2, Star, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../contexts/AuthContext";
import { 
  Address, 
  addAddress, 
  updateAddress, 
  deleteAddress, 
  getUserAddresses 
} from "../../lib/firebaseAddresses";

interface AddressFormData {
  label: string;
  fullName: string;
  phone: string;
  country: string;
  city: string;
  province: string;
  postalCode: string;
  streetAddress: string;
  addressLine2: string;
  isDefault: boolean;
}

const initialFormData: AddressFormData = {
  label: "Home",
  fullName: "",
  phone: "",
  country: "",
  city: "",
  province: "",
  postalCode: "",
  streetAddress: "",
  addressLine2: "",
  isDefault: false,
};

export const AddressBook = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      loadAddresses();
    }
  }, [user]);

  const loadAddresses = async () => {
    if (!user) return;
    try {
      const data = await getUserAddresses(user.uid);
      setAddresses(data);
    } catch (error) {
      console.error("Error loading addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      if (editingId) {
        await updateAddress(editingId, {
          ...formData,
          userId: user.uid,
        });
      } else {
        await addAddress({
          ...formData,
          userId: user.uid,
        });
      }
      await loadAddresses();
      resetForm();
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingId(address.id || null);
    setFormData({
      label: address.label,
      fullName: address.fullName,
      phone: address.phone,
      country: address.country,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
      streetAddress: address.streetAddress,
      addressLine2: address.addressLine2 || "",
      isDefault: address.isDefault,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    
    try {
      await deleteAddress(id);
      await loadAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: string) => {
    if (!user) return;
    
    try {
      await updateAddress(id, { isDefault: true, userId: user.uid });
      await loadAddresses();
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading addresses...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Address Book</h1>
          {!showForm && addresses.length > 0 && (
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Address
            </Button>
          )}
        </div>

        {showForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Label
                  </label>
                  <select
                    name="label"
                    value={formData.label}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, unit, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="isDefault" className="text-sm text-gray-700">
                  Set as default address
                </label>
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
                >
                  {saving ? "Saving..." : editingId ? "Update Address" : "Save Address"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {!showForm && addresses.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <MapPinIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-2">No addresses saved yet</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Add your shipping addresses for faster checkout.
            </p>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Address
            </Button>
          </div>
        )}

        {!showForm && addresses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`bg-white border rounded-lg p-4 sm:p-5 relative ${
                  address.isDefault ? "border-black" : "border-gray-200"
                }`}
              >
                {address.isDefault && (
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black text-white text-xs px-2 py-1 rounded">
                    Default
                  </span>
                )}
                
                <div className="pr-16 sm:pr-20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm sm:text-base">{address.label}</span>
                  </div>
                  <p className="font-medium text-sm sm:text-base">{address.fullName}</p>
                  <p className="text-gray-600 text-sm">{address.phone}</p>
                  <p className="text-gray-600 text-sm mt-2">
                    {address.streetAddress}
                    {address.addressLine2 && `, ${address.addressLine2}`}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {address.city}, {address.province} {address.postalCode}
                  </p>
                  <p className="text-gray-600 text-sm">{address.country}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(address)}
                    className="text-xs sm:text-sm"
                  >
                    <Pencil className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(address.id!)}
                    className="text-red-600 border-red-200 hover:bg-red-50 text-xs sm:text-sm"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Delete
                  </Button>
                  {!address.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefault(address.id!)}
                      className="text-xs sm:text-sm"
                    >
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Set Default
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
