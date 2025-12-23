import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
  address: {
    country: string;
    city: string;
    province: string;
    postalCode: string;
    streetAddress: string;
    addressLine2?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export const saveUserProfile = async (userId: string, profile: Omit<UserProfile, "id">): Promise<void> => {
  const userRef = doc(db, "userProfiles", userId);
  await setDoc(userRef, {
    ...profile,
    updatedAt: new Date(),
  }, { merge: true });
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userRef = doc(db, "userProfiles", userId);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    return { id: userDoc.id, ...userDoc.data() } as UserProfile;
  }
  return null;
};

export const updateUserProfileImage = async (userId: string, imageUrl: string): Promise<void> => {
  const userRef = doc(db, "userProfiles", userId);
  await setDoc(userRef, {
    profileImage: imageUrl,
    updatedAt: new Date(),
  }, { merge: true });
};
