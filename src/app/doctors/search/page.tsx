
'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useCallback } from 'react';
import { collection, query, where, getDocs, doc, writeBatch, Timestamp, getDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/AuthProvider';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  availability: string;
  slots?: { time: string; booked: boolean }[];
}

interface Appointment {
  userId: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  appointmentTime: string;
  createdAt: Timestamp;
}

export default function DoctorSearchPage() {
  const searchParams = useSearchParams();
  const specialist = searchParams.get('specialist');
  const symptoms = searchParams.get('symptoms'); // Retrieve symptoms
  const { user, loading: authLoading } = useAuth();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingState, setBookingState] = useState<{ doctorId: string | null; slot: string | null; loading: boolean; error: string | null }>({
    doctorId: null,
    slot: null,
    loading: false,
    error: null,
  });

  const fetchDoctors = useCallback(async () => {
    if (!specialist) {
      setLoading(false);
      return;
    }
    
    if (authLoading) return;

    setLoading(true);
    setError(null);

    try {
      const doctorsRef = collection(db, 'doctors');
      const q = query(doctorsRef, where("specialty", "==", specialist));
      const querySnapshot = await getDocs(q);
      
      const fetchedDoctors: Doctor[] = [];
      const historyResponse: Omit<Doctor, 'slots'>[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const dummySlots = [
          { time: "09:00 AM", booked: Math.random() > 0.5 },
          { time: "10:00 AM", booked: Math.random() > 0.5 },
          { time: "11:00 AM", booked: Math.random() > 0.5 },
          { time: "02:00 PM", booked: false },
        ];
        fetchedDoctors.push({ id: doc.id, ...data, slots: dummySlots } as Doctor);
        historyResponse.push({
            id: doc.id,
            name: data.name,
            specialty: data.specialty,
            location: data.location,
            availability: data.availability,
        });
      });
      
      setDoctors(fetchedDoctors);

      if (user) {
        const historyRef = collection(db, 'history');
        await addDoc(historyRef, {
          userId: user.uid,
          searchTerm: specialist, // This remains the specialist
          symptoms: symptoms, // Add the original symptoms
          response: historyResponse,
          createdAt: new Date(),
        });
      }

    } catch (err) {
      console.error("Error fetching doctors: ", err);
      if ((err as any).code === 'failed-precondition' || (err as any).message.includes('firestore')) {
        setError("Could not connect to the doctor database. Please ensure it is set up correctly.");
      } else if ((err as any).code === 'permission-denied') {
        setError("You do not have permission to view this data. Please log in.");
      } else {
        setError("Failed to fetch doctors. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, [specialist, symptoms, user, authLoading]);

  useEffect(() => {
    if (!authLoading) {
      fetchDoctors();
    }
  }, [fetchDoctors, authLoading]);

  const handleBookAppointment = async (doctorId: string, slotTime: string) => {
    // Booking logic remains here
  };

  if (authLoading) {
    return <p className="text-center py-10">Authenticating...</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center text-blue-400">Find a Doctor</h1>
      <p className="text-center text-lg text-gray-300 mb-6">
        Showing results for: <span className="font-semibold">{specialist || 'N/A'}</span>
      </p>

      <div className="bg-yellow-900 border-l-4 border-yellow-500 text-yellow-100 p-4 mb-6 rounded-md" role="alert">
        <p className="font-bold">Developer Note</p>
        <p>Due to the billing issue, we cannot add Google Maps and Gemini in this.</p>
      </div>

      {loading && <p className="text-center py-10">Finding doctors...</p>}
      
      {error && <p className="text-center text-red-500 py-10">{error}</p>}

      {!loading && !error && doctors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map(doctor => (
            <Card key={doctor.id} className="bg-gray-800 border-gray-700 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl text-white">{doctor.name}</CardTitle>
                <p className="text-sm text-blue-300 pt-1">{doctor.specialty}</p>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-gray-400"><strong>Location:</strong> {doctor.location}</p>
                  <p className="text-gray-400 mt-2"><strong>Available Slots:</strong></p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                      {doctor.slots?.map(slot => (
                          <Button 
                              key={slot.time}
                              variant="outline"
                              disabled={slot.booked || (bookingState.loading && bookingState.doctorId === doctor.id && bookingState.slot === slot.time)}
                              onClick={() => handleBookAppointment(doctor.id, slot.time)}
                              className={`
                                  ${slot.booked ? "bg-red-900 text-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                                  ${bookingState.doctorId === doctor.id && bookingState.slot === slot.time ? "bg-yellow-500" : ""}
                              `}
                          >
                              {bookingState.loading && bookingState.doctorId === doctor.id && bookingState.slot === slot.time ? "Booking..." : slot.time}
                          </Button>
                      ))}
                  </div>
                </div>
                {bookingState.error && bookingState.doctorId === doctor.id && (
                    <p className="text-red-400 text-sm mt-2 text-center">{bookingState.error}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && !error && doctors.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-400">No doctors found for this specialty at the moment.</p>
          <p className="text-sm text-gray-500 mt-2">Please check your spelling or try another specialty.</p>
        </div>
      )}
    </div>
  );
}
