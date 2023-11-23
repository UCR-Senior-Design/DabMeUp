import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

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



// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



const root = ReactDOM.createRoot(document.getElementById('root'));

const handleLogin = async (email, password) => {
  try {
    // Use Firebase signInWithEmailAndPassword function
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // You can access the user from the userCredential if needed
    const user = userCredential.user;
    
    alert("Successfully signed in: " + user);
    
    // Add any additional logic you need after successful login
  } catch (error) {
    // Handle errors, e.g., display an error message to the user
    alert("Error signing in:\n" + error.message);
  }
};

const handleSignUp = async (email, password) => {
  try {
    // Use Firebase createUserWithEmailAndPassword function
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // You can access the user from the userCredential if needed
    const user = userCredential.user;

    alert("Successfully signed up: " + user);

    // Add any additional logic you need after successful sign-up
  } catch (error) {
    // Handle errors, e.g., display an error message to the user
    alert("Error signing up:\n" + error.message);
  }
};

root.render(<Login onLogin={handleLogin} onSignUp={handleSignUp} />);
reportWebVitals();