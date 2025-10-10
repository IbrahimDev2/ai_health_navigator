'use client';
// Zaroori Firebase SDKs ko import karo
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"; // Authentication service ke liye
import { getFirestore } from "firebase/firestore"; // Firestore Database service ke liye

// Aapke web app ki Firebase configuration
// YEH KEYS AB .env.local FILE SE AA RAHI HAIN (MEHFOOZ TARIQA)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Firebase ko initialize karo
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Services ko initialize karo aur 'export' karo taake woh poore app me use ho sakein.
export const auth = getAuth(app); 
export const db = getFirestore(app);
