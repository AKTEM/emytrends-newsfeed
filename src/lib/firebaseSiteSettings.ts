import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export interface SiteSettings {
  promoText: string;
  updatedAt?: Date;
}

const SETTINGS_DOC_ID = "global";
const DEFAULT_PROMO = "Get 50% Discount On Every Item Purchased On Christmas Day";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 min

let cached: { data: SiteSettings; ts: number } | null = null;
let inflight: Promise<SiteSettings> | null = null;

export const getSiteSettings = async (): Promise<SiteSettings> => {
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) return cached.data;
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const docRef = doc(db, "siteSettings", SETTINGS_DOC_ID);
      const docSnap = await getDoc(docRef);
      const data = docSnap.exists()
        ? (docSnap.data() as SiteSettings)
        : { promoText: DEFAULT_PROMO };
      cached = { data, ts: Date.now() };
      return data;
    } catch (error) {
      console.error("Error fetching site settings:", error);
      return { promoText: DEFAULT_PROMO };
    } finally {
      inflight = null;
    }
  })();

  return inflight;
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<void> => {
  try {
    const docRef = doc(db, "siteSettings", SETTINGS_DOC_ID);
    await setDoc(docRef, { ...settings, updatedAt: new Date() }, { merge: true });
    cached = null; // invalidate
  } catch (error) {
    console.error("Error updating site settings:", error);
    throw error;
  }
};
