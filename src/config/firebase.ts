import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Safe environment variable retrieval (Next.js client env prefix + fallback)
const apiKey =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  process.env.VITE_FIREBASE_API_KEY ||
  "";

const authDomain =
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
  process.env.VITE_FIREBASE_AUTH_DOMAIN ||
  "";

const projectId =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  process.env.VITE_FIREBASE_PROJECT_ID ||
  "";

const storageBucket =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
  process.env.VITE_FIREBASE_STORAGE_BUCKET ||
  "";

const messagingSenderId =
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
  process.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
  "";

const appId =
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
  process.env.VITE_FIREBASE_APP_ID ||
  "";

const measurementId =
  process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
  process.env.VITE_FIREBASE_MEASUREMENT_ID ||
  "";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Check if Firebase is properly configured with an API key
const isFirebaseConfigured = Boolean(apiKey && apiKey.trim().length > 0);

// Initialize Firebase safely only if valid API key is present
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Safe Analytics initialization (Client-side browser only)
    if (typeof window !== "undefined") {
      isSupported().then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    }
  } catch (error) {
    console.warn("Failed to initialize Firebase app:", error);
  }
}

export { app, auth, db, storage, analytics, firebaseConfig, isFirebaseConfigured };
