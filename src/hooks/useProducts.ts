import { useState, useEffect } from "react";
import { getAllProducts, getProductsByCategory, getFeaturedProducts, Product } from "../lib/firebaseProducts";

export const useProducts = (category?: string, featured?: boolean) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data: Product[];
        
        if (featured) {
          data = await getFeaturedProducts();
        } else if (category) {
          data = await getProductsByCategory(category);
        } else {
          data = await getAllProducts();
        }
        
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, featured]);

  return { products, loading, error };
};
