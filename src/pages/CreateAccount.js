import React, { useState } from "react";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";

const CreateAccount = ({ onLogin, onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleLogin = () => {
    // You can perform any additional validation here before calling onLogin
    onLogin(email, password);
    navigate("/Dashboard");
  };

  const handleSignUp = () => {
    // You can perform any additional validation here before calling onSignUp
    onSignUp(email, password);
    navigate("/Dashboard");
  };

  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="input">
            <h2>I am a Signup</h2>
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

            

            <button type="button" className="signupbtn" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;