'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/components/AuthProvider';

import GoogleSignIn from '@/components/GoogleSignIn';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // This effect will redirect the user if they are already logged in.
  useEffect(() => {
    if (user) {
      router.push('/dashboard'); // Corrected redirect
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On successful login, redirect to the dashboard.
      router.push('/dashboard'); // Corrected redirect
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Firebase Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Prevents the login form from flashing if the user is already authenticated.
  if (user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-400">Welcome Back!</CardTitle>
          <CardDescription className="text-gray-300">Log in to access your AI Health Navigator.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-700 border-gray-600 text-white"/>
            </div>
            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>{
              loading ? 'Logging In...' : 'Log In'
            }</Button>
          </form>
          <div className="mt-4 text-right text-sm">
            <Link href="/forgot-password" passHref>
              <span className="font-semibold text-blue-400 hover:text-blue-300 cursor-pointer">Forgot Password?</span>
            </Link>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-600"></span></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
            </div>
          </div>
          <div className="mt-4">
            <GoogleSignIn />
          </div>
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-blue-400 hover:text-blue-300">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
