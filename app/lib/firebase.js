import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjbNEkixyCWeDvqqaanwJfTmh3Zu7qdHo",
  authDomain: "yogeshwartailor-a066d.firebaseapp.com",
  projectId: "yogeshwartailor-a066d",
  storageBucket: "yogeshwartailor-a066d.firebasestorage.app",
  messagingSenderId: "618242979701",
  appId: "1:618242979701:web:6e3da05f9f2caa96ff853c",
  measurementId: "G-VPFYV8YK41"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };