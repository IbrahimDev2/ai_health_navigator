
// This is a temporary API route to add sample doctors to the database.
// It will be deleted after being called once.

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

const sampleDoctors = [
    {
        name: "Dr. Ahmad Khan",
        specialty: "Cardiologist",
        location: "Johar Town, Lahore",
        availability: "Mon, Wed, Fri (5-7 PM)",
        slots: {
            "Monday": ["17:00", "17:30", "18:00", "18:30"],
            "Wednesday": ["17:00", "17:30", "18:00", "18:30"],
            "Friday": ["17:00", "17:30", "18:00", "18:30"],
        }
    },
    {
        name: "Dr. Fatima Ali",
        specialty: "Cardiologist",
        location: "DHA Phase 5, Lahore",
        availability: "Tue, Thu (3-5 PM)",
        slots: {
            "Tuesday": ["15:00", "15:30", "16:00", "16:30"],
            "Thursday": ["15:00", "15:30", "16:00", "16:30"],
        }
    },
    {
        name: "Dr. Yasmin Raza",
        specialty: "General Physician",
        location: "Gulberg, Lahore",
        availability: "Mon - Fri (9 AM - 1 PM)",
        slots: {
            "Monday": ["09:00", "09:30", "10:00", "10:30", "11:00"],
            "Tuesday": ["09:00", "09:30", "10:00", "10:30", "11:00"],
            "Wednesday": ["09:00", "09:30", "10:00", "10:30", "11:00"],
        }
    },
    {
        name: "Dr. Bilal Hussain",
        specialty: "Dermatologist",
        location: "Model Town, Lahore",
        availability: "Weekends (11 AM - 2 PM)",
        slots: {
            "Saturday": ["11:00", "11:30", "12:00"],
            "Sunday": ["11:00", "11:30", "12:00"],
        }
    }
];

export async function GET(req: NextRequest) {
    try {
        console.log("Attempting to add sample doctors...");
        const doctorsCollection = adminDb.collection('doctors');
        let count = 0;

        for (const doctor of sampleDoctors) {
            // Check if a doctor with the same name already exists
            const snapshot = await doctorsCollection.where('name', '==', doctor.name).limit(1).get();
            if (snapshot.empty) {
                await doctorsCollection.add(doctor);
                count++;
                console.log(`Added: ${doctor.name}`);
            } else {
                console.log(`Skipped (already exists): ${doctor.name}`);
            }
        }

        if (count > 0) {
            return NextResponse.json({ message: `Successfully added ${count} new doctors to the database.` });
        }
        
        return NextResponse.json({ message: "All sample doctors already exist in the database. No new doctors were added." });

    } catch (error: any) {
        console.error("Error in setup API:", error);
        return NextResponse.json({ error: "Failed to add doctors.", details: error.message }, { status: 500 });
    }
}
