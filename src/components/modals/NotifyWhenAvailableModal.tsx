import { X } from "lucide-react";
import { useState } from "react";

interface NotifyWhenAvailableModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export const NotifyWhenAvailableModal = ({
  isOpen,
  onClose,
  productName,
}: NotifyWhenAvailableModalProps): JSX.Element | null => {
  const [selectedLength, setSelectedLength] = useState("24 IN / 260 G");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Notify when available:", { selectedLength, email });
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full p-8 sm:p-12 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            {productName}
          </h2>

          <p className="text-base text-gray-700 mb-8">
            Register to receive a notification when this item comes back in stock.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <select
                value={selectedLength}
                onChange={(e) => setSelectedLength(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option>24 IN / 260 G</option>
                <option>18 IN / 200 G</option>
                <option>20 IN / 220 G</option>
              </select>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-4 border border-gray-300 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 text-base font-bold hover:bg-gray-800 transition-colors"
            >
              NOTIFY ME WHEN AVAILABLE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
