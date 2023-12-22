// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLCr1A-r2-sCbiJTZqb6-pLOTGgsGWASg",
  authDomain: "lets-chat-e41d6.firebaseapp.com",
  projectId: "lets-chat-e41d6",
  storageBucket: "lets-chat-e41d6.appspot.com",
  messagingSenderId: "546300740091",
  appId: "1:546300740091:web:b86c94874744587f0b8b5e",
  measurementId: "G-6S7JZZELHZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
