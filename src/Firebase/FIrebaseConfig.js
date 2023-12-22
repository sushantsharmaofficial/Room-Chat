// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD0nQw9MmcoTRIrIlXOwf2ro3TnxqzY7Q",
  authDomain: "chat-app-63b9a.firebaseapp.com",
  projectId: "chat-app-63b9a",
  storageBucket: "chat-app-63b9a.appspot.com",
  messagingSenderId: "252266012818",
  appId: "1:252266012818:web:b9dac0b53a5da2c7b5464b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
