
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DiagnosePage() {
  const { user } = useAuth();
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDiagnose = async () => {
    if (!user) {
      setError('You must be logged in to get a diagnosis.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({ symptoms }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      const specialist = data.specialist;
      if (!specialist) {
        throw new Error('Could not determine the required specialist.');
      }

      // Pass the original symptoms to the search page as a query parameter
      const searchParams = new URLSearchParams({
        specialist: specialist,
        symptoms: symptoms // Add the symptoms here
      });
      router.push(`/doctors/search?${searchParams.toString()}`);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700 mt-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-400">AI Health Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-300 mb-4">Enter your symptoms below and our AI will recommend the right specialist for you.</p>
          <div className="flex flex-col space-y-4">
            <Textarea
              placeholder="e.g., I have a high fever, a persistent cough, and a headache."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={6}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
            <Button onClick={handleDiagnose} disabled={loading || !symptoms} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Analyzing Symptoms...' : 'Find a Specialist'}
            </Button>
          </div>
          {error && (
            <div className="mt-4 text-center text-red-500">
              <p>{error}</p>
            </div>
          )}
          {!user && !loading && (
            <div className="mt-4 text-center text-yellow-400">
              <p>Please log in to use the Health Navigator.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
