import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface CareHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareHelpModal = ({ isOpen, onClose }: CareHelpModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    helpNeeded: {
      washing: false,
      drying: false,
      heatStyling: false,
      tangling: false,
      storage: false,
      shedding: false,
      recommendations: false,
      other: false,
    },
    message: "",
  });

  if (!isOpen) return null;

  const handleCheckboxChange = (key: keyof typeof formData.helpNeeded) => {
    setFormData({
      ...formData,
      helpNeeded: {
        ...formData.helpNeeded,
        [key]: !formData.helpNeeded[key],
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      
      <div className="relative bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-primaryprimary-2 mb-8">
            Need Hair Care Help?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiarytertiary-0"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiarytertiary-0"
              />
            </div>

            <div>
              <select
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiarytertiary-0 text-gray-900"
              >
                <option value="">Select your Kuthair product</option>
                <option value="clip-in">Clip-In Extensions</option>
                <option value="tape-in">Tape-In Extensions</option>
                <option value="weft">Hand-Tied Weft</option>
                <option value="ponytail">Ponytail Extensions</option>
                <option value="wig">Luxury Wigs</option>
              </select>
            </div>

            <div>
              <label className="block text-base font-semibold text-primaryprimary-2 mb-4">
                What do you need help with? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.helpNeeded.washing}
                    onChange={() => handleCheckboxChange("washing")}
                    className="w-5 h-5 text-tertiarytertiary-0 border-gray-300 rounded focus:ring-tertiarytertiary-0"
                  />
                  <span className="text-sm font-medium">Washing & Cleaning</span>
                </label>

                <label className="flex items-center space-x-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.helpNeeded.drying}
                    onChange={() => handleCheckboxChange("drying")}
                    className="w-5 h-5 text-tertiarytertiary-0 border-gray-300 rounded focus:ring-tertiarytertiary-0"
                  />
                  <span className="text-sm font-medium">Drying Technique</span>
                </label>

                <label className="flex items-center space-x-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.helpNeeded.heatStyling}
                    onChange={() => handleCheckboxChange("heatStyling")}
                    className="w-5 h-5 text-tertiarytertiary-0 border-gray-300 rounded focus:ring-tertiarytertiary-0"
                  />
                  <span className="text-sm font-medium">Heat Styling</span>
                </label>

                <label className="flex items-center space-x-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.helpNeeded.tangling}
                    onChange={() => handleCheckboxChange("tangling")}
                    className="w-5 h-5 text-tertiarytertiary-0 border-gray-300 rounded focus:ring-tertiarytertiary-0"
                  />
                  <span className="text-sm font-medium">Tangling Issues</span>
                </label>

                <label className="flex items-center space-x-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.helpNeeded.storage}
                    onChange={() => handleCheckboxChange("storage")}
                    className="w-5 h-5 text-tertiarytertiary-0 border-gray-300 rounded focus:ring-tertiarytertiary-0"
                  />
                  <span className="text-sm font-medium">Storage Solutions</span>
                </label>

                <label className="flex items-center space-x-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.helpNeeded.shedding}
                    onChange={() => handleCheckboxChange("shedding")}
                    className="w-5 h-5 text-tertiarytertiary-0 border-gray-300 rounded focus:ring-tertiarytertiary-0"
                  />
                  <span className="text-sm font-medium">Shedding Concerns</span>
                </label>

                <label className="flex items-center space-x-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.helpNeeded.recommendations}
                    onChange={() => handleCheckboxChange("recommendations")}
                    className="w-5 h-5 text-tertiarytertiary-0 border-gray-300 rounded focus:ring-tertiarytertiary-0"
                  />
                  <span className="text-sm font-medium">Product Recommendations</span>
                </label>

                <label className="flex items-center space-x-3 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.helpNeeded.other}
                    onChange={() => handleCheckboxChange("other")}
                    className="w-5 h-5 text-tertiarytertiary-0 border-gray-300 rounded focus:ring-tertiarytertiary-0"
                  />
                  <span className="text-sm font-medium">Other Care Issue</span>
                </label>
              </div>
            </div>

            <div>
              <textarea
                placeholder="Tell us about your hair care routine, specific problem you're experiencing or questions you have."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiarytertiary-0 resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white py-6 rounded-lg hover:bg-black/90 text-lg font-semibold"
            >
              Submit Request
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
