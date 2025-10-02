// src/components/GoogleSignIn.tsx - Final Code (Login, Logout, aur 'use client' ke saath)

"use client"; // YEH ZAROORI HAI! Hooks aur onClick ke liye.

import React, { useState } from 'react';
// Yahan 'signOut' ko bhi import kiya gaya hai
import { GoogleAuthProvider, signInWithPopup, User, signOut } from 'firebase/auth'; 
// Path fix: 'components' se bahar 'src' tak, phir 'src' se bahar 'root' tak (jahan firebase/init.ts hai)
import { auth } from '../../firebase/init.ts'; 

const GoogleSignIn: React.FC = () => {
    // State to track user and loading status.
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    
    // Function to handle the Google Sign-In process
    const handleGoogleSignIn = async () => {
        setLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            setUser(result.user);
            console.log("Login Successful!", result.user.displayName);
            
        } catch (error) {
            console.error("Login Failed:", error);
            alert("Google Sign-In failed. Check console for details.");
            
        } finally {
            setLoading(false);
        }
    };
    
    // Naya function: Logout handle karna
    const handleGoogleSignOut = async () => {
        try {
            await signOut(auth); // Firebase se logout karo
            setUser(null); // Local state ko reset karo
            console.log("Logout Successful!");
        } catch (error) {
            console.error("Logout Failed:", error);
        }
    };

    return (
        <div className="p-6 border rounded-xl bg-gray-50 shadow-2xl w-full max-w-sm text-center">
            {user ? (
                // User is signed in
                <div className="text-green-600">
                    <h2 className="text-xl font-bold mb-2">Login Successful!</h2>
                    <p className="text-gray-700">Walaikumussalam, **{user.displayName}**!</p>
                    <p className="text-sm mt-4">Ready to save health data.</p>

                    {/* Naya Button: Logout */}
                    <button
                        className="mt-4 w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition duration-300"
                        onClick={handleGoogleSignOut}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                // User is signed out
                <div>
                    <h2 className="text-xl font-bold mb-4 text-blue-600">Health Navigator Login</h2>
                    <button 
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                        onClick={handleGoogleSignIn} 
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In with Google'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default GoogleSignIn;