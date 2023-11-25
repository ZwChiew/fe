import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFSDFAbQEfDmLotevlnqWv5OuGcalm2wg",
  authDomain: "legalsystem-43af8.firebaseapp.com",
  projectId: "legalsystem-43af8",
  storageBucket: "legalsystem-43af8.appspot.com",
  messagingSenderId: "638765109595",
  appId: "1:638765109595:web:3d7833453019ced2958a7e",
  measurementId: "G-R5XK72J6W6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
