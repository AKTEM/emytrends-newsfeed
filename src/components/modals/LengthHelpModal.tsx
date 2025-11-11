import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface LengthHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LengthHelpModal = ({ isOpen, onClose }: LengthHelpModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentLength: "",
    desiredLength: "",
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
            Need help with lenght?
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
                value={formData.currentLength}
                onChange={(e) => setFormData({ ...formData, currentLength: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiarytertiary-0 text-gray-900"
              >
                <option value="">Select your current lenght</option>
                <option value="short">Short (14-16")</option>
                <option value="medium">Medium (18-20")</option>
                <option value="long">Long (22-24")</option>
                <option value="dramatic">Dramatic (26"+)</option>
              </select>
            </div>

            <div>
              <select
                value={formData.desiredLength}
                onChange={(e) => setFormData({ ...formData, desiredLength: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiarytertiary-0 text-gray-900"
              >
                <option value="">Select your desired lenght</option>
                <option value="short">Short (14-16")</option>
                <option value="medium">Medium (18-20")</option>
                <option value="long">Long (22-24")</option>
                <option value="dramatic">Dramatic (26"+)</option>
              </select>
            </div>

            <div>
              <textarea
                placeholder="Tell us about your hair goals, concern or questions.."
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
