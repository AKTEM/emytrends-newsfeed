import { ChevronLeftIcon, ChevronRightIcon, Minus, Plus } from "lucide-react";
import { HeaderWithDropdown } from "../../components/shared/HeaderWithDropdown";
import { FooterSection } from "../LandingPage/sections/FooterSection";
import { useCart } from "../../contexts/CartContext";
import { BackButton } from "../../components/shared/BackButton";

export const CheckoutPage = (): JSX.Element => {
  const { cartItems, removeFromCart, updateQuantity, orderTotal } = useCart();

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
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-8">
              SHIPPING CART
            </h1>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Your cart is empty.</p>
              </div>
            ) : (
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
                              {item.color === "#B8956A" ? "Caramel Blonde" : ""}
                            </span>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-black">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm font-medium text-black hover:text-gray-600 transition-colors flex items-center gap-1"
                        >
                          <span className="text-base">🗑</span> Remove
                        </button>

                        <div className="flex items-center gap-2 border border-gray-300">
                          <button
                            onClick={() =>
                              updateQuantity(
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
                              updateQuantity(item.id, item.quantity + 1)
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
            )}
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

              <button 
                className="w-full bg-gold text-gold-foreground py-4 text-base font-bold hover:bg-gold/90 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
              >
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
