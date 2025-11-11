import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface ShadeHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShadeHelpModal = ({ isOpen, onClose }: ShadeHelpModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    naturalColor: "",
    undertones: "",
    goal: "",
    message: "",
  });

  if (!isOpen) return null;

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
            Need help with shade?
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
                value={formData.naturalColor}
                onChange={(e) => setFormData({ ...formData, naturalColor: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiarytertiary-0 text-gray-900"
              >
                <option value="">Select your natural color</option>
                <option value="black">Black</option>
                <option value="dark-brown">Dark Brown</option>
                <option value="medium-brown">Medium Brown</option>
                <option value="light-brown">Light Brown</option>
                <option value="blonde">Blonde</option>
                <option value="red">Red</option>
              </select>
            </div>

            <div>
              <select
                value={formData.undertones}
                onChange={(e) => setFormData({ ...formData, undertones: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiarytertiary-0 text-gray-900"
              >
                <option value="">Select dominant undertones</option>
                <option value="warm">Warm (Golden/Red)</option>
                <option value="cool">Cool (Ashy/Neutral)</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>

            <div>
              <select
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiarytertiary-0 text-gray-900"
              >
                <option value="">Select your goal</option>
                <option value="match">Perfect Match to Natural Color</option>
                <option value="enhance">Enhance with Highlights</option>
                <option value="transform">Complete Transformation</option>
                <option value="ombre">Ombre/Balayage Effect</option>
              </select>
            </div>

            <div>
              <textarea
                placeholder="Tell us about your hair, any color treatments you've had or specific concerns"
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
