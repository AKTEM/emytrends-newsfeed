import { getFirestore, collection, addDoc, updateDoc, doc, getDocs, getDoc, query, orderBy, where, limit } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);
const ordersCollection = collection(db, "orders");

export type OrderStatus = "order_placed" | "pending_confirmation" | "out_for_delivery" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  color?: string;
  length?: string;
}

export interface Order {
  id?: string;
  userId: string;
  userEmail?: string;
  items: OrderItem[];
  totalAmount: number;
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
  deliveryFee?: number;
  statusHistory?: Array<{
    status: OrderStatus;
    date: Date;
    note?: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export const addOrder = async (order: Omit<Order, "id">): Promise<string> => {
  const docRef = await addDoc(ordersCollection, {
    ...order,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const updateOrder = async (id: string, order: Partial<Order>): Promise<void> => {
  const orderRef = doc(db, "orders", id);
  await updateDoc(orderRef, {
    ...order,
    updatedAt: new Date(),
  });
};

export const getOrder = async (id: string): Promise<Order | null> => {
  const orderRef = doc(db, "orders", id);
  const orderDoc = await getDoc(orderRef);
  
  if (orderDoc.exists()) {
    return { id: orderDoc.id, ...orderDoc.data() } as Order;
  }
  return null;
};

export const getAllOrders = async (): Promise<Order[]> => {
  const q = query(ordersCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};

export const getRecentOrders = async (limitCount: number = 5): Promise<Order[]> => {
  const q = query(ordersCollection, orderBy("createdAt", "desc"), limit(limitCount));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const q = query(ordersCollection, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};
