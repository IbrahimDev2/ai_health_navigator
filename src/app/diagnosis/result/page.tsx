
'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

// Helper component to read the diagnosis from the URL
function DiagnosisDisplay() {
  const searchParams = useSearchParams();
  const diagnosis = searchParams.get('diagnosis');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-400">Diagnosis Result</h1>
        <div 
          className="prose prose-invert max-w-none bg-gray-700 p-4 rounded-md"
          dangerouslySetInnerHTML={{ __html: diagnosis ? diagnosis.replace(/\n/g, '<br />') : 'No diagnosis found.' }}
        />
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Start a New Diagnosis
        </button>
      </div>
    </div>
  );
}

// Main component that wraps the display in a Suspense boundary
export default function DiagnosisResultPage() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Loading diagnosis...</div>}>
      <DiagnosisDisplay />
    </Suspense>
  );
}

