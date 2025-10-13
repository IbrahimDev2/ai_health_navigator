
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

// Sample doctors ka data
const sampleDoctors = [
  {
    name: 'Dr. Ahmad Khan',
    specialty: 'Cardiologist',
    location: 'Johar Town, Lahore',
    availability: 'Mon, Wed, Fri (5-7 PM)',
  },
  {
    name: 'Dr. Fatima Ali',
    specialty: 'Cardiologist',
    location: 'DHA Phase 5, Lahore',
    availability: 'Tue, Thu (3-5 PM)',
  },
  {
    name: 'Dr. Yasmin Raza',
    specialty: 'General Physician',
    location: 'Gulberg, Lahore',
    availability: 'Mon - Fri (9 AM - 1 PM)',
  },
  {
    name: 'Dr. Bilal Hussain',
    specialty: 'Dermatologist',
    location: 'Model Town, Lahore',
    availability: 'Weekends (11 AM - 2 PM)',
  },
    {
    name: 'Dr. Aisha Malik',
    specialty: 'General Physician',
    location: 'F-10 Markaz, Islamabad',
    availability: 'Mon - Sat (10 AM - 4 PM)',
  },
];

export async function GET(req: NextRequest) {
  try {
    console.log("Seeding database with sample doctors...");

    const batch = adminDb.batch();

    // Har doctor ke liye ek naya document banayein
    sampleDoctors.forEach(doctor => {
      const docRef = adminDb.collection('doctors').doc(); // Firestore ko ID generate karne dein
      batch.set(docRef, doctor);
    });

    // Batch write ko commit karein
    await batch.commit();

    console.log(`Successfully seeded ${sampleDoctors.length} doctors.`);
    return NextResponse.json({ success: true, message: `Successfully seeded ${sampleDoctors.length} doctors.` });

  } catch (error: any) {
    console.error("Error seeding database: ", error);
    return NextResponse.json({ success: false, error: 'Failed to seed database.', details: error.message }, { status: 500 });
  }
}
