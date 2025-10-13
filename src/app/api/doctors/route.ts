
import { NextRequest, NextResponse } from 'next/server';

// We are no longer using the real admin database for this demo.
// import { adminDb } from '@/lib/firebase/admin';

// --- Dummy Doctor Database for Demo ---
const dummyDoctors: { [key: string]: any[] } = {
  'Cardiologist': [
    { id: 'doc1', name: 'Dr. Anjali Sharma', specialty: 'Cardiologist', experience: '15 years', location: 'Mumbai' },
    { id: 'doc2', name: 'Dr. Sameer Khan', specialty: 'Cardiologist', experience: '12 years', location: 'Delhi' },
  ],
  'Dermatologist': [
    { id: 'doc3', name: 'Dr. Priya Singh', specialty: 'Dermatologist', experience: '10 years', location: 'Bangalore' },
    { id: 'doc4', name: 'Dr. Rahul Verma', specialty: 'Dermatologist', experience: '8 years', location: 'Chennai' },
  ],
  'Orthopedic': [
    { id: 'doc5', name: 'Dr. Arjun Reddy', specialty: 'Orthopedic', experience: '20 years', location: 'Hyderabad' },
  ],
  'Neurologist': [
    { id: 'doc6', name: 'Dr. Meera Desai', specialty: 'Neurologist', experience: '18 years', location: 'Pune' },
    { id: 'doc7', name: 'Dr. Vikram Rathore', specialty: 'Neurologist', experience: '14 years', location: 'Kolkata' },
  ],
  'Gastroenterologist': [
    { id: 'doc8', name: 'Dr. Fatima Ahmed', specialty: 'Gastroenterologist', experience: '16 years', location: 'Ahmedabad' },
  ],
  'Pulmonologist': [
    { id: 'doc9', name: 'Dr. Suresh Gupta', specialty: 'Pulmonologist', experience: '11 years', location: 'Jaipur' },
  ],
  'Otolaryngologist (ENT)': [
    { id: 'doc10', name: 'Dr. Kavita Joshi', specialty: 'Otolaryngologist (ENT)', experience: '9 years', location: 'Lucknow' },
  ],
  'General Physician': [
    { id: 'doc11', name: 'Dr. Aisha Begum', specialty: 'General Physician', experience: '25 years', location: 'Indore' },
    { id: 'doc12', name: 'Dr. Rajesh Kumar', specialty: 'General Physician', experience: '7 years', location: 'Surat' },
  ],
};
// --- End of Dummy Data ---

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const specialist = searchParams.get('specialist');

    if (!specialist) {
      return NextResponse.json({ error: 'Specialist query parameter is required' }, { status: 400 });
    }

    console.log(`INFO: DEMO MODE - Searching for dummy doctors with specialty: ${specialist}`);

    // Get the list of doctors from our dummy database.
    const doctors = dummyDoctors[specialist] || [];

    // Return the list of doctors.
    return NextResponse.json({ doctors: doctors });

  } catch (error: any) {
    console.error("Error in DEMO MODE doctors API: ", error.message);
    return NextResponse.json({ error: 'An internal error occurred during dummy doctor search.' }, { status: 500 });
  }
}
