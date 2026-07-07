import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  AppCheck,
} from "firebase/app-check";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ---------- Firestore persistent cache ----------
try {
  initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  });
} catch (err) {
  console.warn("Firestore persistent cache not enabled:", err);
}

// ---------- App Check (bot / abuse protection) ----------
// Requires VITE_RECAPTCHA_SITE_KEY (reCAPTCHA v3 site key, publishable).
// The matching secret is configured in the Firebase console → App Check.
let appCheckInstance: AppCheck | null = null;
if (typeof window !== "undefined") {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  if (siteKey) {
    try {
      // Allow the debug token flow in local dev.
      if (import.meta.env.DEV) {
        (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      }
      appCheckInstance = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
    } catch (err) {
      console.warn("App Check initialization failed:", err);
    }
  } else {
    console.warn(
      "VITE_RECAPTCHA_SITE_KEY is not set. App Check is disabled. " +
        "Add it to .env to enable bot/abuse protection."
    );
  }
}

export const getAppCheckInstance = (): AppCheck | null => appCheckInstance;

// ---------- Analytics ----------
if (typeof window !== "undefined" && import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
  isSupported()
    .then((supported) => {
      if (supported) {
        try {
          getAnalytics(app);
        } catch (error) {
          console.warn("Firebase Analytics initialization failed:", error);
        }
      }
    })
    .catch((error) => {
      console.warn("Firebase Analytics support check failed:", error);
    });
}

export default app;
