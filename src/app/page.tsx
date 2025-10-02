// src/app/page.tsx - Yahan poora content replace hoga

// src/app/page.tsx me yeh line badlo

// Fix: '..' se app se bahar 'src' tak aao, phir 'components/GoogleSignIn' dhoondo.
import GoogleSignIn from '../component/GoogleSignIn'; // Sahi path

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">AI Health Navigator (Hackathon Build)</h1>
      <GoogleSignIn /> 
    </main>
  );
}