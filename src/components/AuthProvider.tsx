'use client';

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Context ka type define kar rahe hain
// Isme user, loading state, aur sign-in/sign-out functions shamil hain
interface AuthContextType {
  user: User | null;
  loading: boolean;
  handleSignIn: () => void;
  handleSignOut: () => void;
}

// Default values ke sath context create kar rahe hain
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  handleSignIn: () => {},
  handleSignOut: () => {},
});

// Provider component jo poori app ko wrap karega
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Google Sign-In ka function
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged isko automatically handle kar lega
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  // Sign-Out ka function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Yeh useEffect user ke login status ko sunta rehta hai
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Component unmount hone par listener ko saaf karta hai
    return () => unsubscribe();
  }, []);

  // Context ki value tayyar kar rahe hain
  const value = {
    user,
    loading,
    handleSignIn,
    handleSignOut,
  };
  
  // Yahan se loading screen hata di gayi hai
  // Ab yeh provider bachon (children) ko render hone se nahi rokega
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook taake context ko aasani se istemal kiya ja sake
export const useAuth = () => {
  return useContext(AuthContext);
};