'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

// ShadCN UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PasswordResetForm() {
  const searchParams = useSearchParams();
  
  const oobCode = searchParams.get('oobCode');

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!oobCode) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Invalid Link</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-red-500 mb-4">The password reset link is missing necessary information.</p>
                    <Link href="/forgot-password"><Button variant="outline">Request a New Link</Button></Link>
                </CardContent>
            </Card>
        </div>
    );
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }
    if (newPassword.length < 6) {
      setError("Password should be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Your password has been reset successfully! You can now log in with your new password.");
    } catch (err: any) {
      console.error("Error resetting password:", err);
      if (err.code === 'auth/expired-action-code') {
        setError("This password reset link has expired. Please request a new one.");
      } else {
        setError("Failed to reset password. The link might be invalid or already used.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Set a New Password</CardTitle>
        </CardHeader>
        <CardContent>
          {message ? (
            <div className="text-center">
              <p className="text-green-600 mb-4">{message}</p>
              <Link href="/login" passHref>
                <Button>Go to Login</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-4">
              <CardDescription>Please enter and confirm your new password.</CardDescription>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                <Input
                  id="confirm-new-password"
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm font-medium text-center">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
