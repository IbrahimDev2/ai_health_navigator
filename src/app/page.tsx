'use client';

import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// YEH AAPKA ASLI HOME PAGE HAI
export default function Home() {
  // AuthProvider (Guard House) se user ki information aur login/logout functions le rahe hain
  const { user, loading, handleSignIn, handleSignOut } = useAuth();

  // Jab tak Firebase se response nahi aata, "Loading..." dikhayenge
  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-lg">Loading Authenticaton...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      {
        // Agar user logged in NAHI hai
        !user ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to AI Health Navigator</h1>
            <p className="text-lg mb-6">Your personal AI-powered health assistant.</p>
            <Button onClick={handleSignIn} size="lg">
              Sign in with Google
            </Button>
          </div>
        ) : (
          // Agar user logged in HAI
          <div className="flex flex-col items-center text-center">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="Profile Picture"
                width={80}
                height={80}
                className="rounded-full mb-4"
              />
            )}
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.displayName}!</h1>
            <p className="mb-6">You are now logged in.</p>
            <Button onClick={handleSignOut} variant="destructive">
              Logout
            </Button>
          </div>
        )
      }
    </main>
  );
}
