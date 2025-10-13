
import { NextRequest, NextResponse } from 'next/server';

// Dummy AI: This function simulates a basic diagnosis AI without any external API calls.
async function getDummySpecialist(symptoms: string): Promise<string> {
  console.log("INFO: Running in dummy specialist mode for demo.");
  
  const lowerSymptoms = symptoms.toLowerCase();

  // Keyword-to-Specialist Mapping
  const keywordMap: { [key: string]: string[] } = {
    'Cardiologist': ['heart', 'chest pain', 'blood pressure', 'palpitations'],
    'Dermatologist': ['skin', 'rash', 'acne', 'eczema', 'mole'],
    'Orthopedic': ['bone', 'joint', 'fracture', 'knee', 'back pain'],
    'Neurologist': ['headache', 'migraine', 'seizure', 'numbness', 'dizziness'],
    'Gastroenterologist': ['stomach', 'abdomen', 'indigestion', 'diarrhea', 'acid reflux'],
    'Pulmonologist': ['breathing', 'cough', 'asthma', 'lungs'],
    'Otolaryngologist (ENT)': ['ear', 'nose', 'throat', 'sore throat', 'sinus'],
  };

  // Find the best match
  for (const specialist in keywordMap) {
    const keywords = keywordMap[specialist];
    if (keywords.some(keyword => lowerSymptoms.includes(keyword))) {
      return specialist;
    }
  }

  // Default fallback if no keyword matches
  return "General Physician";
}

export async function POST(req: NextRequest) {
  try {
    const { symptoms } = await req.json();

    // Input validation
    if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length === 0) {
      return NextResponse.json({ error: 'Symptoms are required and must be a non-empty string.' }, { status: 400 });
    }

    // Call the local dummy specialist function
    const specialist = await getDummySpecialist(symptoms);

    // Return only the specialist's name
    return NextResponse.json({ specialist: specialist });

  } catch (error) {
    console.error("Error in dummy diagnose API: ", error);
    // It's good practice to not expose internal error details to the client
    return NextResponse.json({ error: 'An internal error occurred.' }, { status: 500 });
  }
}
