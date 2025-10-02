// firebase/init.ts - Yahan se auth aur db services ko export kiya jata hai

// Zaroori Firebase SDKs ko import karo
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Authentication service ke liye
import { getFirestore } from "firebase/firestore"; // Firestore Database service ke liye

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0VEQVr51xY2NakfW6MUAbOQyASQtSn4s",
  authDomain: "ai-health-navigator-1ea91.firebaseapp.com",
  projectId: "ai-health-navigator-1ea91",
  storageBucket: "ai-health-navigator-1ea91.firebasestorage.app",
  messagingSenderId: "469431508159",
  appId: "1:469431508159:web:51cab74211f7f8bad5ba0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services ko initialize karo aur 'export' karo taake woh poore app me use ho sakein.
export const auth = getAuth(app); 
export const db = getFirestore(app);