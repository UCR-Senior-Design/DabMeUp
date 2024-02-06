import React from "react"; 
import { useNavigate } from 'react-router-dom';

const Nav = ({ authToken, setShowModal, showModal }) => {
  let navigate = useNavigate();

  const handleLoginClick = () => { 
    navigate('/Login'); 
  };

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        {/* Any other navigation elements or branding can be added here */}
      </div>
      
      {!authToken && (
        <button className="nav-button" onClick={handleClick} disabled={showModal}>
          Log in
        </button>
      )}
    </nav>
  );
};

export default Nav;
