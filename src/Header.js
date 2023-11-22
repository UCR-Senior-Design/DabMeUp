import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Header({ isAuthenticated }) {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return(
        <div>
            <h2>Palz App</h2>
            {isAuthenticated && (
                <button onClick={toggleMenu}>Menu</button>
            )}
            {showMenu && (
                <div className="menu">
                    <Link to="/profile">Profile Page</Link>
                    <Link to="/settings">Settings</Link>
                    <Link to="/find-friends">Find New Friend</Link>
                    <button onClick={() => {/* logic to handle logout */}}>Log Out</button>
                    <button onClick={() => {/* logic to handle account deletion */}}>Delete Account</button>
                </div>
            )}
        </div>
    )
}

export default Header;
