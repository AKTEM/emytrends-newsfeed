import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export interface Address {
  id?: string;
  userId: string;
  label: string;
  fullName: string;
  phone: string;
  country: string;
  city: string;
  province: string;
  postalCode: string;
  streetAddress: string;
  addressLine2?: string;
  isDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const addressesCollection = collection(db, "addresses");

export const addAddress = async (address: Omit<Address, "id">): Promise<string> => {
  // If this is set as default, unset other defaults first
  if (address.isDefault) {
    await unsetDefaultAddresses(address.userId);
  }
  
  const docRef = await addDoc(addressesCollection, {
    ...address,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const updateAddress = async (id: string, address: Partial<Address>): Promise<void> => {
  // If this is being set as default, unset other defaults first
  if (address.isDefault && address.userId) {
    await unsetDefaultAddresses(address.userId);
  }
  
  const addressRef = doc(db, "addresses", id);
  await updateDoc(addressRef, {
    ...address,
    updatedAt: new Date(),
  });
};

export const deleteAddress = async (id: string): Promise<void> => {
  const addressRef = doc(db, "addresses", id);
  await deleteDoc(addressRef);
};

export const getUserAddresses = async (userId: string): Promise<Address[]> => {
  const q = query(
    addressesCollection, 
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Address));
};

const unsetDefaultAddresses = async (userId: string): Promise<void> => {
  const addresses = await getUserAddresses(userId);
  const defaultAddresses = addresses.filter(addr => addr.isDefault);
  
  await Promise.all(
    defaultAddresses.map(addr => {
      if (addr.id) {
        const addressRef = doc(db, "addresses", addr.id);
        return updateDoc(addressRef, { isDefault: false, updatedAt: new Date() });
      }
      return Promise.resolve();
    })
  );
};
