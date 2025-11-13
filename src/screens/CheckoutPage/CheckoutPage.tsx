import { ChevronLeftIcon, ChevronRightIcon, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { FooterSection } from "../LandingPage/sections/FooterSection";

interface CartItem {
  id: string;
  name: string;
  variant: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export const CheckoutPage = (): JSX.Element => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Silk Seam",
      variant: "Silk Seam - 16",
      color: "#B8956A",
      price: 385.0,
      quantity: 2,
      image: "/img-20250902-wa0002.png",
    },
    {
      id: "2",
      name: "Silk Seam",
      variant: "Silk Seam - 16",
      color: "#B8956A",
      price: 385.0,
      quantity: 2,
      image: "/img-20250902-wa0002.png",
    },
    {
      id: "3",
      name: "Silk Seam",
      variant: "Silk Seam - 16",
      color: "#B8956A",
      price: 385.0,
      quantity: 2,
      image: "/img-20250902-wa0002.png",
    },
    {
      id: "4",
      name: "Silk Seam",
      variant: "Silk Seam - 16",
      color: "#B8956A",
      price: 385.0,
      quantity: 2,
      image: "/img-20250902-wa0002.png",
    },
    {
      id: "5",
      name: "Silk Seam",
      variant: "Silk Seam - 16",
      color: "#B8956A",
      price: 385.0,
      quantity: 2,
      image: "/img-20250902-wa0002.png",
    },
  ]);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const orderTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white w-full min-h-screen relative flex flex-col">
      <header className="w-full bg-neutralneutral-1 sticky top-0 z-50">
        <div className="flex h-10 items-center justify-between px-4 sm:px-8 lg:px-12 py-2 w-full max-w-[1264px] mx-auto">
          <ChevronLeftIcon className="w-3 h-6 flex-shrink-0 hidden sm:block" />
          <div className="inline-flex items-center justify-center gap-6 flex-1 px-2">
            <div className="font-medium-body-large font-[number:var(--medium-body-large-font-weight)] text-textprimary-text text-[length:var(--medium-body-large-font-size)] tracking-[var(--medium-body-large-letter-spacing)] leading-[var(--medium-body-large-line-height)] text-center [font-style:var(--medium-body-large-font-style)] text-xs sm:text-sm md:text-base">
              Get 50% Discount On Every Item Purchased On Christmas Day
            </div>
          </div>
          <ChevronRightIcon className="w-3 h-6 flex-shrink-0 hidden sm:block" />
        </div>
      </header>

      <HeaderWithDropdown />

      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-8">
              SHIPPING CART
            </h1>

            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-gray-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-32 object-cover"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-base font-bold text-black mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-700 mb-2">
                          {item.variant}
                        </p>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-gray-700">
                            Caramel Blonde
                          </span>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-black">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-sm font-medium text-black hover:text-gray-600 transition-colors flex items-center gap-1"
                      >
                        <span className="text-base">🗑</span> Remove
                      </button>

                      <div className="flex items-center gap-2 border border-gray-300">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium text-black w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8">
              CART SUMMARY
            </h2>

            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-8">
                <p className="text-xl font-bold text-black">ORDER TOTAL</p>
                <p className="text-3xl font-bold text-black">
                  ${orderTotal.toFixed(2)}
                </p>
              </div>

              <button className="w-full bg-black text-white py-4 text-base font-bold hover:bg-gray-800 transition-colors mb-4">
                CHECK OUT
              </button>

              <p className="text-sm text-gray-600 text-center">
                Taxes, shipping and promos are calculated at checkout.
              </p>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};
