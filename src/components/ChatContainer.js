import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";

const ChatContainer = () => {
    const [currentUserID, setCurrentUserID] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, set the user ID
                setCurrentUserID(user.uid);
            } else {
                // User is signed out
                console.log('No user is logged in');
                setCurrentUserID(null); // Ensure currentUserID is null if no user is logged in
            }
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="chat-container">
            <ChatHeader/>

            <div>
                <button className="option">Matches</button>
                <button className="option">Chat</button>
            </div>

            {/* Conditionally render MatchesDisplay if currentUserID is not null */}
            {currentUserID ? (
                <MatchesDisplay currentUserID={currentUserID}/>
            ) : (
                <p>Loading user data or user not logged in...</p>
            )}

            <ChatDisplay/>
        </div>
    );
};

export default ChatContainer;


