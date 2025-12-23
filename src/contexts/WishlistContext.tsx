import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface WishlistItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  addedAt: Date;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: Omit<WishlistItem, "id" | "addedAt">) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
});

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`wishlist_${user.uid}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setWishlistItems(parsed.map((item: WishlistItem) => ({
            ...item,
            addedAt: new Date(item.addedAt)
          })));
        } catch (error) {
          console.error("Error parsing wishlist:", error);
        }
      }
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    if (user && wishlistItems.length > 0) {
      localStorage.setItem(`wishlist_${user.uid}`, JSON.stringify(wishlistItems));
    } else if (user) {
      localStorage.removeItem(`wishlist_${user.uid}`);
    }
  }, [wishlistItems, user]);

  const addToWishlist = (item: Omit<WishlistItem, "id" | "addedAt">) => {
    if (!user) return;
    
    const newItem: WishlistItem = {
      ...item,
      id: `${item.productId}_${Date.now()}`,
      addedAt: new Date(),
    };
    setWishlistItems(prev => [...prev, newItem]);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.productId !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
