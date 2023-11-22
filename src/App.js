import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing the new page components
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import LandingPage from './LandingPage';
import ProfilePage from './ProfilePage';

function App() {
  // State to manage user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} /> {/* Default route */}
      </Routes>
      </div>
    </Router>
  );
}

export default App;
