
'use client';

import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Button import kiya

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <p className="text-center mt-12">Loading user data...</p>;
  }

  if (!user) {
    router.push('/login');
    return null; 
  }

  return (
    // Layout ko saaf kiya gaya hai, ab yeh page layout.tsx ke andar fit hoga
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400">My Dashboard</h1>
        <p className="text-gray-300 mt-2">Welcome back, <span className="font-semibold">{user.email}</span>!</p>
        <p className="text-gray-400">What would you like to do today?</p>
      </div>
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Get a Diagnosis */}
        <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all">
          <CardHeader>
            <CardTitle className="text-xl text-white">Start a New Diagnosis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Use our AI to analyze your symptoms and find the right specialist.
            </p>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push('/diagnose')}
            >
              Get Started
            </Button>
          </CardContent>
        </Card>

        {/* Card 2: View History */}
        <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all">
          <CardHeader>
            <CardTitle className="text-xl text-white">View Appointment History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Check your past and upcoming appointments with specialists.
            </p>
            <Button 
              className="w-full bg-gray-600 hover:bg-gray-700"
              onClick={() => router.push('/history')}
            >
              View History
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
