
import { NextRequest, NextResponse } from 'next/server';
// We are no longer using the adminDb, so the import can be removed.
// import { adminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
  try {
    const { uid, role } = await req.json();

    if (!uid || !role) {
      return NextResponse.json({ error: 'UID and role are required' }, { status: 400 });
    }

    // --- DATABASE LOGIC DISABLED FOR DEMO ---
    // In a real scenario, you would write to Firestore here.
    // For this free demo, we will simulate a successful write without a database.
    console.log(`INFO: DEMO MODE - Simulating role set for UID: ${uid} as ${role}. No database write occurred.`);
    
    // Instead of writing to the database, we just pretend it worked.
    // await adminDb.collection('users').doc(uid).set({ role }, { merge: true });

    return NextResponse.json({ message: `Role '${role}' successfully set for user (Simulated).` });

  } catch (error: any) {
    console.error("Error in DEMO MODE user/role API: ", error.message);
    // Even in demo mode, it's good to handle potential errors gracefully.
    return NextResponse.json({ error: 'An internal error occurred during role simulation.' }, { status: 500 });
  }
}
