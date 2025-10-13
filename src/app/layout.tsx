
'use client'; // <-- YEH FIX HAI!

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import the AuthProvider and the new Header
import { AuthProvider } from '@/components/AuthProvider';
import Header from '@/components/Header'; // Header ko import kiya

// Google Fonts ko setup kar rahe hain taake poori website me aek jaisa font istemal ho
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// YEH WEBSITE KA SEO METADATA HAI.
// Yeh Google search results aur browser tab me show hota hai.
// NOTE: Metadata Client Components me kaam nahi karti, lekin hum isay yahan chor rahe hain.
// Iska behtar hal Next.js ke naye features me hai, filhaal isay chaltay rehne dein.
// export const metadata: Metadata = {
//   title: "AI Health Navigator",
//   description: "Your personal AI-powered health assistant",
// };

// Yeh RootLayout poori website ka "Master Template" ya "Frame" hai.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}
      >
        {/* Poori application ko AuthProvider se wrap kiya */}
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {/* Header ko yahan daala taake yeh har page par nazar aaye */}
            <Header />
            {/* children (yani hamara current page) ko main content area me render kiya */}
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
