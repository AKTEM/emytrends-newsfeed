import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  getCountFromServer,
  query,
  where,
  limit as fbLimit,
} from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);
const productsCollection = collection(db, "products");

export interface Product {
  id?: string;
  title: string;
  description: string;
  fullDescription?: string;
  price: number;
  category: string;
  hairExtensionType?: string;
  badge?: string;
  images: string[];
  colors?: string[];
  shades?: string[];
  lengths?: string[];
  colorSwatches?: Array<{ id: string | number; color: string; name?: string }>;
  lengthOptions?: Array<{ id: string | number; label: string; price?: number }>;
  shadeOptions?: Array<{ id: string; label: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
  relatedProductIds?: string[];
  inStock: boolean;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// ---------- Simple in-memory cache with TTL ----------
// Cuts intra-session refetches even before Firestore's IndexedDB cache kicks in.
type CacheEntry = { data: Product[]; ts: number };
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 min
const cache = new Map<string, CacheEntry>();

const getCached = (key: string): Product[] | null => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
};

const setCached = (key: string, data: Product[]) => {
  cache.set(key, { data, ts: Date.now() });
};

const invalidateCache = () => cache.clear();

// ---------- Mutations (invalidate cache) ----------
export const addProduct = async (product: Omit<Product, "id">): Promise<string> => {
  const docRef = await addDoc(productsCollection, {
    ...product,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  invalidateCache();
  return docRef.id;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, { ...product, updatedAt: new Date() });
  invalidateCache();
};

export const deleteProduct = async (id: string): Promise<void> => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
  invalidateCache();
};

// ---------- Reads (cache-aware) ----------
export const getProduct = async (id: string): Promise<Product | null> => {
  const productRef = doc(db, "products", id);
  const productDoc = await getDoc(productRef);
  return productDoc.exists() ? ({ id: productDoc.id, ...productDoc.data() } as Product) : null;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const key = "all";
  const cached = getCached(key);
  if (cached) return cached;
  const snap = await getDocs(productsCollection);
  const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
  setCached(key, data);
  return data;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const key = `cat:${category}`;
  const cached = getCached(key);
  if (cached) return cached;
  const q = query(productsCollection, where("category", "==", category));
  const snap = await getDocs(q);
  const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
  setCached(key, data);
  return data;
};

export const getFeaturedProducts = async (max?: number): Promise<Product[]> => {
  const key = `featured:${max ?? "all"}`;
  const cached = getCached(key);
  if (cached) return cached;
  const q = max
    ? query(productsCollection, where("featured", "==", true), fbLimit(max))
    : query(productsCollection, where("featured", "==", true));
  const snap = await getDocs(q);
  const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
  setCached(key, data);
  return data;
};

// Only fetches N docs from Firestore — used by the Trending strip.
export const getTrendingProducts = async (max = 4): Promise<Product[]> => {
  const key = `trending:${max}`;
  const cached = getCached(key);
  if (cached) return cached;
  const q = query(
    productsCollection,
    where("category", "==", "Trending"),
    fbLimit(max)
  );
  const snap = await getDocs(q);
  const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
  setCached(key, data);
  return data;
};

// Aggregation: 1 billed read instead of N — used by admin dashboards.
export const getProductCount = async (): Promise<number> => {
  const snap = await getCountFromServer(productsCollection);
  return snap.data().count;
};
