module.exports = [
"[project]/.next-internal/server/app/api/diagnose/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/diagnose/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Dummy AI: This function simulates a basic diagnosis AI without any external API calls.
async function getDummySpecialist(symptoms) {
    console.log("INFO: Running in dummy specialist mode for demo.");
    const lowerSymptoms = symptoms.toLowerCase();
    // Keyword-to-Specialist Mapping
    const keywordMap = {
        'Cardiologist': [
            'heart',
            'chest pain',
            'blood pressure',
            'palpitations'
        ],
        'Dermatologist': [
            'skin',
            'rash',
            'acne',
            'eczema',
            'mole'
        ],
        'Orthopedic': [
            'bone',
            'joint',
            'fracture',
            'knee',
            'back pain'
        ],
        'Neurologist': [
            'headache',
            'migraine',
            'seizure',
            'numbness',
            'dizziness'
        ],
        'Gastroenterologist': [
            'stomach',
            'abdomen',
            'indigestion',
            'diarrhea',
            'acid reflux'
        ],
        'Pulmonologist': [
            'breathing',
            'cough',
            'asthma',
            'lungs'
        ],
        'Otolaryngologist (ENT)': [
            'ear',
            'nose',
            'throat',
            'sore throat',
            'sinus'
        ]
    };
    // Find the best match
    for(const specialist in keywordMap){
        const keywords = keywordMap[specialist];
        if (keywords.some((keyword)=>lowerSymptoms.includes(keyword))) {
            return specialist;
        }
    }
    // Default fallback if no keyword matches
    return "General Physician";
}
async function POST(req) {
    try {
        const { symptoms } = await req.json();
        // Input validation
        if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Symptoms are required and must be a non-empty string.'
            }, {
                status: 400
            });
        }
        // Call the local dummy specialist function
        const specialist = await getDummySpecialist(symptoms);
        // Return only the specialist's name
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            specialist: specialist
        });
    } catch (error) {
        console.error("Error in dummy diagnose API: ", error);
        // It's good practice to not expose internal error details to the client
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'An internal error occurred.'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__99183072._.js.map