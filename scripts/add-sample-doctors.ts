
// This is a helper script to add some initial data to your Firestore database.
// You can run it from your terminal using: ts-node --esm scripts/add-sample-doctors.ts

import { adminDb } from '../lib/firebase/admin';

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

async function addDoctors() {
    const doctorsCollection = adminDb.collection('doctors');
    console.log("Starting to add doctors to Firestore...");

    const promises = sampleDoctors.map(async (doctor) => {
        try {
            const docRef = await doctorsCollection.add(doctor);
            console.log(`Added doctor: ${doctor.name} (ID: ${docRef.id})`);
        } catch (error) {
            console.error(`Error adding doctor ${doctor.name}:`, error);
        }
    });

    await Promise.all(promises);
    console.log("Finished adding all sample doctors.");
}

addDoctors();
