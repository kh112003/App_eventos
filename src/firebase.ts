import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// --- Tu configuración REAL de Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyBxkfjrna9fpuFE0nB3qsVhSikPe2mv1cg",
  authDomain: "reactnative-a2d89.firebaseapp.com",
  projectId: "reactnative-a2d89",
  storageBucket: "reactnative-a2d89.firebasestorage.app",
  messagingSenderId: "376229643748",
  appId: "1:376229643748:web:7a7938afc7e1b36897f3f1"
};
// -----------------------------------------

// Evitar inicialización doble
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
