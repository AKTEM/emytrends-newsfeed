import { X } from "lucide-react";
import React from "react";

interface CartItem {
  id: string;
  name: string;
  variant: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
}) => {
  const [itemToRemove, setItemToRemove] = React.useState<string | null>(null);

  const orderTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveClick = (itemId: string) => {
    setItemToRemove(itemId);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      onRemoveItem(itemToRemove);
      setItemToRemove(null);
    }
  };

  const cancelRemove = () => {
    setItemToRemove(null);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 h-full w-full sm:w-[600px] bg-white z-50 shadow-2xl transform transition-transform overflow-y-auto">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-black">YOUR CART</h2>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center px-6">
              <p className="text-lg text-gray-600">Your cart is currently empty.</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <p className="text-sm text-gray-600 mb-6">{items.length} ITEMS</p>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-base font-semibold text-black mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{item.variant}</p>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }} />
                            <span className="text-sm text-gray-600">
                              {item.color === "#B8956A" ? "Caramel Blonde" : ""}
                            </span>
                          </div>
                        </div>
                        <p className="text-base font-semibold text-black">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={() => handleRemoveClick(item.id)}
                          className="text-sm text-black font-medium hover:text-gray-600 transition-colors flex items-center gap-1"
                        >
                          <span className="text-base">🗑</span> Remove
                        </button>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium text-black w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 px-6 py-6 bg-white">
            <div className="flex items-center justify-between mb-6">
              <p className="text-lg font-semibold text-black">ORDER TOTAL</p>
              <p className="text-2xl font-bold text-black">${orderTotal.toFixed(2)}</p>
            </div>
            <button
              className="w-full bg-black text-white py-4 text-center font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={items.length === 0}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>

      {itemToRemove && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-black">Remove from cart</h3>
              <button
                onClick={cancelRemove}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-base text-gray-600 mb-8">
              Do you really want to remove this item from cart?
            </p>
            <div className="flex gap-4">
              <button
                onClick={cancelRemove}
                className="flex-1 py-3 border-2 border-black text-black font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">♡</span> Save for later
              </button>
              <button
                onClick={confirmRemove}
                className="flex-1 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">🗑</span> Remove Item
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
