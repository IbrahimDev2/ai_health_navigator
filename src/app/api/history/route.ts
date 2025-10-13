
import { NextRequest, NextResponse } from 'next/server';

// Ye file ab server-side Firebase par depend nahi karti.
// Ye crash nahi hogi, balkay ek saaf error message degi.

export async function GET(req: NextRequest) {
  console.log("INFO: History API called, but is disabled due to missing server-side dependencies.");

  // Client ko ek saaf error message bhejein ke feature uplabdh nahi hai.
  // Status 503 (Service Unavailable) iske liye munasib hai.
  return NextResponse.json(
    { 
      error: 'Service Unavailable', 
      message: 'The history feature is currently disabled because the database connection is not available.' 
    },
    { status: 503 }
  );
}
