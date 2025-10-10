// firebase/seed.ts

import { collection, addDoc } from "firebase/firestore";
// Correcting the import path for the 'db' instance
import { db } from "@/lib/firebase";

const doctors = [
  {
    name: "Dr. Ahmed Khan",
    specialty: "Cardiologist",
    city: "Karachi",
    available_slots: ["2024-07-30T10:00:00", "2024-07-30T11:00:00"]
  },
  {
    name: "Dr. Fatima Ali",
    specialty: "Dermatologist",
    city: "Lahore",
    available_slots: ["2024-07-31T14:00:00", "2024-07-31T15:00:00"]
  },
  {
    name: "Dr. Bilal Hassan",
    specialty: "General Physician",
    city: "Karachi",
    available_slots: ["2024-08-01T09:00:00", "2024-08-01T10:00:00"]
  }
];

async function seedDatabase() {
  const doctorsCollection = collection(db, "doctors");
  for (const doctor of doctors) {
    try {
      const docRef = await addDoc(doctorsCollection, doctor);
      console.log(`Added doctor with ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error adding doctor: ", error);
    }
  }
}

seedDatabase();
