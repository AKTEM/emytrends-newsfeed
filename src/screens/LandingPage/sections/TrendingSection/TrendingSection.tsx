import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Heart } from "lucide-react";
import { useWishlist } from "../../../../contexts/WishlistContext";
import { useAuth } from "../../../../contexts/AuthContext";
import { useProducts } from "../../../../hooks/useProducts";
import { ProductSwatches } from "../../../../components/shared/ProductSwatches";

export const TrendingSection = (): JSX.Element | null => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { products, loading } = useProducts("Trending");

  const trending = products.slice(0, 4);

  if (loading) return null;
  if (trending.length === 0) return null;

  const handleWishlistToggle = (
    e: React.MouseEvent,
    product: { id: string; title: string; price: number; image: string }
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/auth");
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <section className="flex flex-col w-full items-start gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-[100px] bg-backgroundbackground-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full max-w-[1440px] mx-auto">
        <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-semibold">
          TRENDING
        </h2>

        <Link to="/shop/all?category=Trending" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="h-12 sm:h-14 px-4 sm:px-5 rounded-lg border-[1.5px] border-[#e3a857] bg-transparent hover:bg-tertiarytertiary-0/10 w-full"
          >
            <span className="text-tertiarytertiary-0 font-bold">SHOP ALL</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full max-w-[1440px] mx-auto">
        {trending.map((product) => {
          const pid = product.id!;
          const image = product.images?.[0] || "/placeholder.png";
          return (
            <div key={pid} className="relative">
              <button
                onClick={(e) =>
                  handleWishlistToggle(e, {
                    id: pid,
                    title: product.title,
                    price: product.price,
                    image,
                  })
                }
                className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                  isInWishlist(pid)
                    ? "bg-red-500 text-white"
                    : "bg-white/80 text-gray-700 hover:bg-white"
                }`}
                aria-label={isInWishlist(pid) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${isInWishlist(pid) ? "fill-white" : ""}`} />
              </button>
              <Link to={`/product/${pid}`}>
                <Card className="flex flex-col border-none shadow-none bg-transparent cursor-pointer hover:opacity-80 transition-opacity">
                  <CardContent className="flex flex-col items-start justify-center gap-6 p-0">
                    <img
                      className="h-[200px] sm:h-[230px] lg:h-[258px] w-full object-cover rounded-lg"
                      alt={product.title}
                      src={image}
                    />
                    <div className="flex items-start justify-between gap-2 w-full">
                      <p className="text-black text-sm sm:text-base line-clamp-2 flex-1 min-w-0">
                        {product.title}
                      </p>
                      <p className="text-black font-semibold text-base sm:text-lg whitespace-nowrap">
                        ${product.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};
