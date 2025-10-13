
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AppointmentRecord {
  id: string;
  doctorName: string;
  specialty: string;
  appointmentTime: string;
  createdAt: string | Timestamp;
}

const dummyAppointments: AppointmentRecord[] = [
  {
    id: '1',
    doctorName: 'Dr. Tariq Khan',
    specialty: 'Cardiologist',
    appointmentTime: '10:00 AM, Oct 28, 2025',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    doctorName: 'Dr. Ayesha Ahmed',
    specialty: 'Dermatologist',
    appointmentTime: '02:30 PM, Oct 29, 2025',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    doctorName: 'Dr. Hassan Malik',
    specialty: 'Neurologist',
    appointmentTime: '11:00 AM, Nov 1, 2025',
    createdAt: new Date().toISOString(),
  },
];

export default function HistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      setAppointments(dummyAppointments);

    } catch (err: any) {
      console.error("Error fetching appointments: ", err);
      if ((err as any).code === 'failed-precondition') {
         setError("Could not connect to the database. This feature is temporarily unavailable.");
      } else {
         setError("Failed to fetch your appointments.");
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
        fetchAppointments();
    }
  }, [user, authLoading, fetchAppointments]);

  if (authLoading) {
    return <p className="text-center mt-12">Loading user data...</p>;
  }

  if (!user) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-white">
             <p className="text-center text-red-500">Please log in to view your appointment history.</p>
        </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">My Appointments</h1>
      
      {loading ? (
        <p className="text-center mt-12">Loading your appointments...</p>
      ) : error ? (
          <p className="text-center text-red-500 mt-12">{error}</p>
      ): appointments.length === 0 ? (
        <p className="text-center text-gray-400 mt-12">You have no upcoming or past appointments.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map(app => (
            <Card key={app.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 flex justify-between items-center">
                  <div>
                      <h2 className="text-lg font-bold text-white">{app.doctorName}</h2>
                      <p className="text-sm text-blue-300">{app.specialty}</p>
                  </div>
                  <div className='text-right'>
                      <p className='text-md text-gray-200'>{app.appointmentTime.split(', ')[0]}</p>
                      <p className='text-sm text-gray-400'>{app.appointmentTime.split(', ')[1]}</p>
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
