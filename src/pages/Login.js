import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from "firebase/auth"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleSignUp = () => {
    navigate("/CreateAccount");
  };

  return (
    <div>
      <div className="overlay">
        <div className="header">
        <h2>Login</h2>
        </div>
        <div className="container">
          <div className="input">
            
            <label htmlFor="email"><b>Email</b></label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password"><b>Password</b></label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="button" className="loginbtn" onClick={handleLogin}>
              Log In
            </button>

            <button type="button" className="signupbtn" onClick={handleSignUp}>
             Signup Here
            </button>

            <button type="button" className="pswdbtn" onClick={handleSignUp}>
             Forgot Password?
            </button>
          </div>

        </div>
        </div>
      
    </div>
  );
};

export default Login;