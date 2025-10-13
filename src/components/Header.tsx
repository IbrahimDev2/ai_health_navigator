
'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useRouter, usePathname } from 'next/navigation'; // usePathname import kiya
import { Button } from '@/components/ui/button';

// NavLink component (inner component) banaya
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`text-sm font-medium transition-colors ${isActive ? 'text-white underline' : 'text-gray-400 hover:text-white'}`}>
      {children}
    </Link>
  );
};

export default function Header() {
  const { user, handleSignOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await handleSignOut();
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-xl font-bold text-blue-400 cursor-pointer"
          onClick={() => router.push(user ? '/dashboard' : '/')}
        >
          AI Health Navigator
        </h1>
        <div className="flex items-center space-x-6">
          {user && (
            <>
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-6">
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/diagnose">New Diagnosis</NavLink>
                <NavLink href="/history">My History</NavLink>
              </nav>
              <Button onClick={handleLogout} variant="destructive" size="sm">
                Logout
              </Button>
            </>
          )}
          {/* Agar user login nahi hai, to koi link nahi dikhana */}
        </div>
      </div>
    </header>
  );
}
