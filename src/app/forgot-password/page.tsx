'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// ShadCN UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setIsLoading(true);

    if (!email) {
      setError('Please enter your email address.');
      setIsLoading(false);
      return;
    }

    try {
      // **ACTION CODE SETTINGS KO HATA DIYA GAYA HAI**
      // Ab Firebase apne default page par reset karwayega.
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset link has been sent to your email. Please check your inbox and follow the instructions on the Firebase page.');
    } catch (err: any) {
      console.error('Firebase Password Reset Error:', err);
      if (err.code === 'auth/user-not-found') {
        setError('This email address is not registered. Please check the email or sign up.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('We have blocked all requests from this device due to unusual activity. Try again later.');
      } else {
        setError(`An error occurred: ${err.message}.`);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
          <CardDescription>Enter your email to receive a password reset link.</CardDescription>
        </CardHeader>
        <CardContent>
          {!message ? (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              {error && (
                <p className="text-red-500 text-sm font-medium text-center">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-green-600 mb-4">{message}</p>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Remembered your password?{' '}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
