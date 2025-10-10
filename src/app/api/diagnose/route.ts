// This is a simulated AI Diagnosis Engine.
// In a real-world scenario, this would be replaced by a call to a generative AI model (like Google's Gemini).

import { NextResponse } from 'next/server';

/**
 * Simulates an AI model to provide a preliminary diagnosis based on symptoms.
 * @param {string} symptoms - The user-provided symptoms.
 * @param {string} location - The user-provided location.
 * @returns {Promise<string>} A simulated diagnosis string.
 */
async function getAiDiagnosis(symptoms: string, location: string): Promise<string> {
    const s = symptoms.toLowerCase();
    let diagnosis = "Based on your symptoms, a clear diagnosis isn't possible without a professional consultation.";
    let doctor = "General Physician";

    // Rule-based logic to simulate AI
    if (s.includes('fever') && (s.includes('cough') || s.includes('sore throat'))) {
        diagnosis = "The combination of fever and cough/sore throat suggests a possible respiratory tract infection, like the common cold or flu.";
        doctor = "General Physician";
    } else if (s.includes('headache') && (s.includes('nausea') || s.includes('sensitivity to light'))) {
        diagnosis = "A severe headache accompanied by nausea and light sensitivity could be a migraine.";
        doctor = "Neurologist";
    } else if (s.includes('stomach') && (s.includes('cramp') || s.includes('diarrhea'))) {
        diagnosis = "Stomach cramps and diarrhea are often symptoms of gastroenteritis (stomach flu), possibly from something you ate.";
        doctor = "Gastroenterologist";
    } else if (s.includes('chest pain') && (s.includes('shortness of breath') || s.includes('dizziness'))) {
        diagnosis = "WARNING: Chest pain combined with shortness of breath or dizziness can be signs of a serious cardiac event. Please seek immediate medical attention from an emergency room.";
        doctor = "Cardiologist / Emergency Room";
    } else if (s.includes('runny nose') && s.includes('sneezing')) {
        diagnosis = "A runny nose and sneezing are classic signs of allergies (allergic rhinitis) or the common cold.";
        doctor = "Allergist or General Physician";
    }

    const locationInfo = location ? `in ${location}` : 'in your area';

    // Construct the final response
    const finalResponse = `${diagnosis} It is highly recommended to consult with a ${doctor} ${locationInfo} for an accurate diagnosis and treatment plan. 

Disclaimer: This is a preliminary AI-based suggestion and not a substitute for professional medical advice.`;

    return finalResponse;
}


export async function POST(request: Request) {
  try {
    const { symptoms, location } = await request.json();

    if (!symptoms) {
      return NextResponse.json({ error: 'Symptoms are required' }, { status: 400 });
    }

    // Get the AI-powered diagnosis by calling our simulated function
    const diagnosis = await getAiDiagnosis(symptoms, location);

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ result: diagnosis });

  } catch (error) {
    console.error("Diagnosis API error:", error);
    return NextResponse.json({ error: 'Failed to get diagnosis' }, { status: 500 });
  }
}
