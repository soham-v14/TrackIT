 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1WMFLVwfNdYSX31uPyFLhN8OpdrWTKkk",
  authDomain: "trackit-575c7.firebaseapp.com",
  projectId: "trackit-575c7",
  storageBucket: "trackit-575c7.firebasestorage.app",
  messagingSenderId: "470557894811",
  appId: "1:470557894811:web:f49783629ca5fd951b3e3e",
  measurementId: "G-YZH7Q34WMV"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};