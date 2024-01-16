import whitelogo from '../images/logo.png'
import colorLogo from '../images/colorlogo.png'
import React from "react"; 
import { useNavigate } from 'react-router-dom';


const Nav = ({minimal, authToken}) => {
    let navigate = useNavigate();
    
    const handleLoginClick = () =>{ 
        navigate('/Login'); 
    };

    const handleSettings = () => { 
        navigate("/Settings"); 
    }; 

    const handleLogoutClick = () =>{ 
        navigate("/"); 
    };

    const handleProfileClick = () =>{ 
        navigate("/Profile"); 
    }; 

    
    return (
        <nav>
            <div className = "logo-container">
            <img className="logo" src={minimal ? colorLogo : whitelogo} alt="" />
            </div>
            {!authToken && <button className='nav-button'>Log in</button>}
            {authToken && (
        <>
          <button onClick={handleSettings}>Settings</button>
          <button onClick={handleProfileClick}>Profile</button>
          <button onClick={handleLogoutClick}>Logout</button>
          <button onClick={handleLoginClick}>Login</button>
        </>
      )}
        </nav>
    )
}

export default Nav 