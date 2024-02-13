import React from "react";
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';

const Home = () => {
   
    const authToken = false;
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('clicked');
        if (authToken) {
            // Implement signout logic if needed
        } else {
            // Navigate to Create Account page
            navigate('/CreateAccount'); // Replace with the actual path to your Create Account page
        }
    };
    
    return (
        <div className= "overlay">
            <Nav minimal={false} authToken={authToken} />
            <div className="home">
                <h1>Click Right</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>
            </div>
        </div>
    );
}
export default Home