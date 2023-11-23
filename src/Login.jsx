import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin, onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // You can perform any additional validation here before calling onLogin
    onLogin(email, password);
  };

  const handleSignUp = () => {
    // You can perform any additional validation here before calling onSignUp
    onSignUp(email, password);
  };

  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="input">
            <h2>I am a login</h2>
            <label htmlFor="email"><b>Email</b></label>
            <input
              type="email"
              placeholder="enter email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password"><b>Password</b></label>
            <input
              type="password"
              placeholder="enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="button" className="loginbtn" onClick={handleLogin}>
              Log In
            </button>

            <button type="button" className="signupbtn" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
