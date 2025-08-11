import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { environment } from "../config/environment";

// Debug: Log the configuration being used
console.log("Firebase configuration:", environment.firebase);

// Initialize Firebase with environment configuration
const app = initializeApp(environment.firebase);

// Debug: Log successful initialization
console.log("Firebase app initialized successfully:", app.name);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Debug: Log services initialization
console.log("Firebase services initialized:", { auth, db, storage });

export default app;
