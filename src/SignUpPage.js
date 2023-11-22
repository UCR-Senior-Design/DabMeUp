import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = (event) => {
        event.preventDefault();
        // Logic for creating a new account goes here
        // On success:
        navigate('/login');
    };

    return (
        <div>
            <form onSubmit={handleSignUp}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpPage;
