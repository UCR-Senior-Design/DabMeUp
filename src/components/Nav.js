import React from "react"; 
import { useNavigate } from 'react-router-dom';

const Nav = ({minimal, authToken}) => {
  let navigate = useNavigate();

  const handleLoginClick = () =>{ 
      navigate('/Login'); 
  };

  return (
    <nav>

        {!authToken && <button className='nav-button'onClick={handleLoginClick}>Login</button>}
    </nav>
)
}


export default Nav
