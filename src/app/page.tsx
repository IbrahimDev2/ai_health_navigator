'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Agar user logged in hai, to usko diagnose page par bhejo
        router.push('/diagnose');
      } else {
        // Agar user logged in nahi hai, to usko login page par bhejo
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  // Loading state mein user ko blank page dikhate hain taake redirection aasani se ho jaye
  return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-lg">Loading...</p>
      </main>
  );
}
