
// This is a stub for the Firestore admin database.
// In a real production environment, this would be initialized with service account credentials.
// For this demo, we are creating a placeholder that will prevent the app from crashing at build time.
// Any API route that attempts to use this will gracefully fail with a clear error.

const createMockDb = () => {
  const handler = {
    get: function(target: any, prop: any, receiver: any) {
        // This function is called whenever any property of adminDb is accessed.
        // We'll throw a specific, clear error to make debugging easy.
        throw new Error(`DEMO MODE: The server-side database (adminDb) is not configured. This is intentional for the free demo. Feature attempting to use it: '${String(prop)}'.`);
    }
  };
  // We return a Proxy object. It looks like a normal object, but its behavior is controlled by the handler.
  return new Proxy({}, handler);
};

// We will export a mock 'admin' and 'adminDb' object.
// This ensures that any code importing them will not fail at build time.
const adminDb = createMockDb();

// Mock the admin object itself to avoid 'apps' property errors.
const admin = {
    apps: [], 
    // We can add other mock properties here if needed by other parts of the code.
};

export { admin, adminDb };
