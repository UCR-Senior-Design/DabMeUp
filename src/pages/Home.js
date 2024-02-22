import React from "react";
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';

const Home = () => {
<<<<<<< HEAD
=======
   
>>>>>>> 23c5173b2f777d7db17a93c895b8731a2a4e1144
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
<<<<<<< HEAD

    return (
        <div className="overlay">
=======
    
    return (
        <div className= "overlay">
>>>>>>> 23c5173b2f777d7db17a93c895b8731a2a4e1144
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
<<<<<<< HEAD

export default Home;
=======
export default Home
>>>>>>> 23c5173b2f777d7db17a93c895b8731a2a4e1144
