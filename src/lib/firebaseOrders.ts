import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
  getCountFromServer,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);
const ordersCollection = collection(db, "orders");

export type OrderStatus =
  | "order_placed"
  | "pending_confirmation"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  length?: string;
}

export interface OrderStatusHistoryEntry {
  status: OrderStatus;
  date: Date;
  note?: string;
}

export interface Order {
  id?: string;
  userId: string;
  userEmail?: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee?: number;
  status: OrderStatus;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
  };
  paymentMethod: string;
  statusHistory: OrderStatusHistoryEntry[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const addOrder = async (order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  const docRef = await addDoc(ordersCollection, {
    ...order,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const updateOrder = async (id: string, patch: Partial<Order>): Promise<void> => {
  const orderRef = doc(db, "orders", id);
  await updateDoc(orderRef, { ...patch, updatedAt: new Date() });
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
  note?: string
): Promise<void> => {
  const orderRef = doc(db, "orders", id);
  const orderSnap = await getDoc(orderRef);
  if (!orderSnap.exists()) throw new Error("Order not found");
  const existing = orderSnap.data() as Order;
  const historyEntry: OrderStatusHistoryEntry = { status, date: new Date(), note };
  await updateDoc(orderRef, {
    status,
    statusHistory: [...(existing.statusHistory ?? []), historyEntry],
    updatedAt: new Date(),
  });
};

export const getOrder = async (id: string): Promise<Order | null> => {
  const orderRef = doc(db, "orders", id);
  const orderDoc = await getDoc(orderRef);
  return orderDoc.exists() ? ({ id: orderDoc.id, ...orderDoc.data() } as Order) : null;
};

export const getAllOrders = async (): Promise<Order[]> => {
  const q = query(ordersCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const q = query(ordersCollection, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
};

export const getRecentOrders = async (n: number): Promise<Order[]> => {
  const q = query(ordersCollection, orderBy("createdAt", "desc"), limit(n));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
};

// Aggregation — 1 billed read for a total count.
export const getOrderCount = async (): Promise<number> => {
  const snap = await getCountFromServer(ordersCollection);
  return snap.data().count;
};

export const getPendingOrderCount = async (): Promise<number> => {
  const q = query(
    ordersCollection,
    where("status", "in", ["order_placed", "pending_confirmation"])
  );
  const snap = await getCountFromServer(q);
  return snap.data().count;
};
