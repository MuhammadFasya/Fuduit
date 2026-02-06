import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Firebase configuration - Replace with your actual config values
const firebaseConfig = {
  apiKey: "AIzaSyAi2CaiUszAIu5G8_hvzUj4ZysFD72FwRo",
  authDomain: "fuduit-315e3.firebaseapp.com",
  projectId: "fuduit-315e3",
  storageBucket: "fuduit-315e3.firebasestorage.app",
  messagingSenderId: "311510279900",
  appId: "1:311510279900:web:4d35d24d8bdb3fa8f57619",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Initialize Firebase only if it hasn't been initialized yet
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  db = getFirestore(app);
} else {
  app = getApps()[0];
  // For subsequent calls, we need to get the existing auth instance
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  db = getFirestore(app);
}

export { app, auth, db };
