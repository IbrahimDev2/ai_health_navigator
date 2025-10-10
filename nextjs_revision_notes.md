
# Next.js Revision Notes for a "Pro Coder"

Yeh notes aapke "AI Health Navigator" project ke context me banaye gaye hain. Inko parhne ke baad aap Next.js ke kisi bhi project me confidently kaam kar sakte hain.

---

## 1. Project Ka Dhancha (File System)

Next.js me har file ki ek khaas jagah aur maqsad hota hai.

- **`ai_health_navigator/app/`**: Yeh aapke project ka "dil" hai. Saare pages aur routes isi folder me rehte hain.

- **`app/layout.tsx`**: Yeh poori website ka **Master Template** hai. Isme likha gaya code (jaise Header, Footer) har page par nazar aata hai. Yeh `{children}` ko apne andar "wrap" karta hai.

- **`app/globals.css`**: Yeh aapki website ki **Global Stylesheet** hai. Isme likhe gaye styles (jaise background color, font) poori website par apply hote hain.

- **`app/page.tsx`**: Yeh aapki website ka **Home Page** (`/`) hota hai.

- **`app/login/page.tsx`**: Ek naya folder (`login`) bana kar uske andar `page.tsx` rakhne se ek naya page (`/login`) ban jaata hai.

- **`app/api/diagnose/route.ts`**: `api` folder ke andar banayi gayi file aapka **Backend API Endpoint** ban jaati hai. User isay dekh nahi sakta, yeh server par chalti hai.

- **`components/`**: Is folder me hum chotay-chotay **Reusable UI Pieces** (jaise custom button, cards) rakhte hain taake unhein baar-baar na likhna pare.

- **`.env.local`**: Yeh **SECRET** file hai. Isme hum saari **API Keys** aur passwords rakhte hain. Yeh file kabhi bhi public (GitHub par) nahi ki jaati.

---

## 2. Core Concepts (Next.js Ki "Rooh")

- **Server Components (Default)**:
  - By default, Next.js me har component **Server Par** chalta hai.
  - **Fayda**: Yeh fast aur secure hota hai. Aap iske andar seedha database se baat kar sakte hain ya API keys mehfooz tareeqay se istemal kar sakte hain.
  - **Pehchan**: Iske upar kuch nahi likha hota.

- **Client Components**:
  - Yeh component user ke **Browser Me** chalta hai.
  - **Kab Istemaal Karein**: Jab bhi aapko user se interaction chahiye ho. Jaise `onClick`, `onChange`, `useState`, `useEffect`.
  - **Pehchan**: Is file ke sab se upar **`'use client';`** likhna zaroori hai.

- **Navigation (Ek Page Se Doosre Par Jana)**:
  - **`<Link href="/about">`**: Yeh HTML ke `<a>` tag ka "supercharged" version hai. Isay istemal karne se page refresh nahi hota aur website bohat taiz chalti hai.
  - **`useRouter()`**: Isay hum functions ke andar istemal karte hain. Jaise "Login kamyab hone ke baad user ko dashboard par bhej do." (`router.push('/dashboard')`).

---

## 3. "Pro Coder" Ki Aadaat (Habits)

- **Pseudocode (Code Likhne Se Pehle)**:
  - Logic banane ka sab se behtareen tareeqa.
  - Code likhne se pehle, aasan English/Urdu me `//` comments daal kar poora plan likh lein.
  - Is se "Code kaise shuru karun?" aur "Logic kaise banaun?" wala masla hamesha ke liye khatam ho jaata hai.

- **Flow Tracing & Comments (Code Likhne Ke Baad)**:
  - Sirf mushkil ya ajeeb code ke upar comment likhein.
  - Comment me yeh na batayen ke code **KYA** kar raha hai, balke yeh batayen ke **KYUN** kar raha hai.
  - Is se aapko 6 mahine baad bhi apna code samajhne me aasani hogi.

- **Security - API Keys**:
  - **KABHI BHI** API Keys ya passwords ko seedha code me na likhein.
  - Hamesha unhein `.env.local` file me rakhein.
    ```
    GEMINI_API_KEY="xyz-123"
    NEXT_PUBLIC_FIREBASE_API_KEY="abc-456"
    ```
  - **Server par** key istemal karne ke liye: `process.env.GEMINI_API_KEY`.
  - **Browser (Client) par** key istemal karne ke liye: Key ke naam se pehle `NEXT_PUBLIC_` lagana zaroori hai. (`process.env.NEXT_PUBLIC_FIREBASE_API_KEY`).

---
In notes ko parhne ke baad, aap is project me koi bhi change karne ya naya feature add karne ke liye tayyar hain.
