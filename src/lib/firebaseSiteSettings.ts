import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export interface SiteSettings {
  promoText: string;
  updatedAt?: Date;
}

const SETTINGS_DOC_ID = "global";

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const docRef = doc(db, "siteSettings", SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as SiteSettings;
    }
    
    // Default settings if none exist
    return {
      promoText: "Get 50% Discount On Every Item Purchased On Christmas Day"
    };
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {
      promoText: "Get 50% Discount On Every Item Purchased On Christmas Day"
    };
  }
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<void> => {
  try {
    const docRef = doc(db, "siteSettings", SETTINGS_DOC_ID);
    await setDoc(docRef, {
      ...settings,
      updatedAt: new Date()
    }, { merge: true });
  } catch (error) {
    console.error("Error updating site settings:", error);
    throw error;
  }
};
