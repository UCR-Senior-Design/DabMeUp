<<<<<<< HEAD

=======
>>>>>>> 23c5173b2f777d7db17a93c895b8731a2a4e1144
import React from "react"; 
import { useNavigate } from 'react-router-dom';

const Nav = ({minimal, authToken}) => {
  let navigate = useNavigate();

<<<<<<< HEAD
    return (
        <nav>
            
            {!authToken && <button className='nav-button'onClick={handleLoginClick}>Login</button>}
        </nav>
    )
=======
  const handleLoginClick = () =>{ 
      navigate('/Login'); 
  };

  return (
    <nav>

        {!authToken && <button className='nav-button'onClick={handleLoginClick}>Login</button>}
    </nav>
)
>>>>>>> 23c5173b2f777d7db17a93c895b8731a2a4e1144
}


export default Nav
