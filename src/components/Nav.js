import whitelogo from '../images/logo.png'
import colorLogo from '../images/colorlogo.png'
import React from "react"; 
import { useNavigate } from 'react-router-dom';


const Nav = ({minimal, authToken}) => {
    let navigate = useNavigate();
    
    const handleLoginClick = () =>{ 
        navigate('/Login'); 
    };

    return (
        <nav>
            <div className = "logo-container">
            <img className="logo" src={minimal ? colorLogo : whitelogo} alt="" />
            </div>
            {!authToken && <button className='nav-button'onClick={handleLoginClick}>Login</button>}
        </nav>
    )
}

export default Nav 