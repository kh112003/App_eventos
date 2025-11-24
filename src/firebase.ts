// src/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Configuración REAL de tu Firebase ---
const firebaseConfig = {
  apiKey: 'AIzaSyBxkfjrna9fpuFE0nB3qsVhSikPe2mv1cg',
  authDomain: 'reactnative-a2d89.firebaseapp.com',
  projectId: 'reactnative-a2d89',
  storageBucket: 'reactnative-a2d89.firebasestorage.app',
  messagingSenderId: '376229643748',
  appId: '1:376229643748:web:7a7938afc7e1b36897f3f1',
};
// -----------------------------------------

// Evitar inicialización doble
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializar Auth especial para React Native (con AsyncStorage para que no explote el build de expo)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore
export const db = getFirestore(app);

export default app;
