
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { collection, query, where, getDocs, Timestamp, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Doctor interface (must match what is stored in history)
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
}

// Updated history record interface to include symptoms
interface SearchHistoryRecord {
  id: string;
  searchTerm: string; // Specialist
  symptoms?: string; // Original symptoms
  response: Doctor[]; // The list of doctors from the search
  createdAt: Timestamp;
}

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const [history, setHistory] = useState<SearchHistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) {
        setLoading(false);
        setHistory([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const historyRef = collection(db, 'history');
        const q = query(historyRef, where("userId", "==", user.uid), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const fetchedHistory: SearchHistoryRecord[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedHistory.push({
            id: doc.id,
            searchTerm: data.searchTerm,
            symptoms: data.symptoms,
            response: data.response || [],
            createdAt: data.createdAt,
          });
        });
        setHistory(fetchedHistory);
      } catch (err: any) {
        console.error("Error fetching history: ", err);
        setError("Failed to fetch search history. Please ensure you have created the required Firestore index.");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchHistory();
    }
  }, [user, authLoading]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError(null);
    try {
      const historyDocRef = doc(db, 'history', id);
      await deleteDoc(historyDocRef);
      setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting history item: ", err);
      setError("Failed to delete history item. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading) {
    return <p className="text-center mt-12">Loading user data...</p>;
  }

  if (!user) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-white">
             <p className="text-center text-red-500">Please log in to view your search history.</p>
        </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Search History</h1>

      {loading ? (
        <p className="text-center mt-12">Loading your search history...</p>
      ) : error ? (
          <p className="text-center text-red-500 mt-12">{error}</p>
      ): history.length === 0 ? (
        <p className="text-center text-gray-400 mt-12">You have no search history yet.</p>
      ) : (
        <div className="space-y-6">
          {history.map(item => (
            <Card key={item.id} className="bg-gray-800 border-gray-700 overflow-hidden">
              <CardHeader className="p-4 bg-gray-750 border-b border-gray-600">
                  <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        {item.symptoms ? (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-300">Your Symptoms:</h2>
                                <p className="text-xl font-bold text-white mb-2">"{item.symptoms}"</p>
                                <h3 className="text-md font-semibold text-gray-400">Recommended Specialist: <span className="font-bold text-blue-300">{item.searchTerm}</span></h3>
                            </div>
                        ) : (
                            <h2 className="text-xl font-bold text-white">Specialist Searched: "{item.searchTerm}"</h2>
                        )}
                      </div>
                      <div className='text-right flex-shrink-0 ml-4'>
                        <p className='text-sm text-gray-400 mb-2'>{new Date(item.createdAt.seconds * 1000).toLocaleString()}</p>
                        <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                        >
                            {deletingId === item.id ? 'Deleting...' : 'Delete'}
                        </Button>
                      </div>
                  </div>
              </CardHeader>
              <CardContent className="p-4">
                {item.response && item.response.length > 0 ? (
                    <div>
                        <h3 className="text-lg font-semibold text-blue-300 mb-3">Doctors Found:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.response.map(doctor => (
                                <div key={doctor.id} className="bg-gray-900 p-3 rounded-lg border border-gray-700">
                                    <p className="font-bold text-white">{doctor.name}</p>
                                    <p className="text-sm text-gray-300">{doctor.specialty}</p>
                                    <p className="text-xs text-gray-400 mt-1">{doctor.location}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-400">No doctors were found for this search.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
