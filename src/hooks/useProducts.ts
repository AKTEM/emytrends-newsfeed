import { useState, useEffect } from "react";
import {
  getAllProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getTrendingProducts,
  Product,
} from "../lib/firebaseProducts";

export const useProducts = (category?: string, featured?: boolean) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data: Product[];

        if (featured) {
          data = await getFeaturedProducts();
        } else if (category === "Trending") {
          // Optimized path: fetches only 4 docs from Firestore.
          data = await getTrendingProducts(4);
        } else if (category) {
          data = await getProductsByCategory(category);
        } else {
          data = await getAllProducts();
        }

        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        if (!cancelled) setError("Failed to load products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [category, featured]);

  return { products, loading, error };
};
