// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyodiB5e0ZwjG6MaD3eT1MdYKJIUU4ql0",
  authDomain: "palz-53350.firebaseapp.com",
  projectId: "palz-53350",
  storageBucket: "palz-53350.appspot.com",
  messagingSenderId: "605826956457",
  appId: "1:605826956457:web:b8c307be733921c8287db8",
  measurementId: "G-KQ8L33TDQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);