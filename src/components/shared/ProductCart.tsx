import { X, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  variant: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

interface ProductCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const ProductCart = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
}: ProductCartProps): JSX.Element | null => {
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  if (!isOpen) return null;

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

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 z-50 w-[50vw] sm:w-[45vw] md:w-[40vw] lg:w-[35vw] max-h-screen">
        <div className="bg-white w-full h-screen flex flex-col shadow-2xl">
          <div className="bg-[#e5e5dc] px-6 py-6 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">YOUR CART</h2>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <p className="text-lg text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="px-6 py-4 border-b border-gray-200">
                <p className="text-sm font-medium text-black">{items.length} ITEMS</p>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-40 object-cover"
                      />
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-black mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-700 mb-2">{item.variant}</p>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-5 h-5" 
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm text-gray-700">Caramel Blonde</span>
                            </div>
                          </div>
                          <p className="text-xl font-bold text-black">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-3 border border-gray-300">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-base font-medium text-black w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveClick(item.id)}
                            className="text-base font-medium text-black hover:text-gray-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-6 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xl font-bold text-black">ORDER TOTAL</p>
                  <p className="text-2xl font-bold text-black">${orderTotal.toFixed(2)}</p>
                </div>
                <Link to="/checkout">
                  <button
                    className="w-full bg-black text-white py-4 text-base font-bold hover:bg-gray-800 transition-colors"
                    onClick={onClose}
                  >
                    CHECK OUT
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {itemToRemove && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-black">Remove from cart</h3>
              <button
                onClick={cancelRemove}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-base text-gray-700 mb-8">
              Do you really want to remove this item from cart?
            </p>
            <div className="flex gap-4">
              <button
                onClick={cancelRemove}
                className="flex-1 py-3 border-2 border-black text-black font-semibold hover:bg-gray-50 transition-colors"
              >
                Save for later
              </button>
              <button
                onClick={confirmRemove}
                className="flex-1 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
              >
                Remove Item
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
