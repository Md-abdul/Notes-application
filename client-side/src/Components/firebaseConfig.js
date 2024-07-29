// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_ix1XQkWDphfM-l8V7-QDPeFboQSDAO8",
  authDomain: "note-app-21749.firebaseapp.com",
  projectId: "note-app-21749",
  storageBucket: "note-app-21749.appspot.com",
  messagingSenderId: "846886942549",
  appId: "1:846886942549:web:fa55ef01c66f375af4a1dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
