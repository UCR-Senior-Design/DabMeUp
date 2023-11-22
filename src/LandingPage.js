import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to the Landing Page</h1>
            <button onClick={() => navigate('/profile')}>Go to Profile</button>
        </div>
    );
}

export default LandingPage;
