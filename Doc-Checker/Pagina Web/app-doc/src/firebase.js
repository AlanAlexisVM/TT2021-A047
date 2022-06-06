// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA95HUqhiL5fCDWNwgqkFwsW7I6CAJTg4",
  authDomain: "notificaciones-docchecker.firebaseapp.com",
  projectId: "notificaciones-docchecker",
  storageBucket: "notificaciones-docchecker.appspot.com",
  messagingSenderId: "885627162754",
  appId: "1:885627162754:web:5c18a12d913b717e6be49b",
  measurementId: "G-Y819D9VC1H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);