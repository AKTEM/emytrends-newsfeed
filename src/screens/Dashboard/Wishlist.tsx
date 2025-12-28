import { DashboardLayout } from "./DashboardLayout";
import { HeartIcon, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useWishlist } from "../../contexts/WishlistContext";
import { Link } from "react-router-dom";

export const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <HeartIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">You haven't saved an item yet!</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Found something you like? Tap on the heart shaped icon next to the item to add it to
              your wishlist! All your saved items will appear here.
            </p>
            <Link to="/shop/all">
              <Button className="bg-black text-white hover:bg-gray-800">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden group"
              >
                <Link to={`/product/${item.productId}`}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${item.productId}`}>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gold">${item.price.toFixed(2)}</p>
                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="text-center">
            <Link to="/shop/all">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
