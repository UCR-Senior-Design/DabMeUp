import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, off } from 'firebase/database';
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import ChatList from "./ChatList"; // Assume this is your new component for chat list
import { database } from '../firebase';

const ChatContainer = () => {
    const [currentUserID, setCurrentUserID] = useState(null);
    const [chatId, setChatId] = useState(null);
    const [view, setView] = useState("matches");
    const [unreadCount, setUnreadCount] = useState(0); // New state for tracking unread messages

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUserID(user.uid);
                listenForUnreadMessages(user.uid); // Listen for unread messages
            } else {
                console.log('No user is logged in');
                setCurrentUserID(null);
            }
        });

        return () => {
            unsubscribe();
            // Make sure to unsubscribe from the unread messages listener when the component unmounts
            if (currentUserID) {
                const unreadRef = ref(database, `unread/${currentUserID}`);
                off(unreadRef);
            }
        };
    }, [currentUserID]);

    const handleSelectMatch = (matchedUserID) => {
        const generatedChatId = `${currentUserID}_${matchedUserID}`;
        setChatId(generatedChatId);
        setView("chat");
    };

    // Function to listen for unread messages
    const listenForUnreadMessages = (userId) => {
        const unreadRef = ref(database, `unread/${userId}`);
        onValue(unreadRef, (snapshot) => {
            let totalUnread = 0;
            snapshot.forEach(childSnapshot => {
                totalUnread += childSnapshot.val(); // Assuming each child's value is an unread count
            });
            setUnreadCount(totalUnread);
        });
    };

    return (
        <div className="chat-container">
            <ChatHeader/>

            <div>
                <button className="option" onClick={() => setView("matches")}>Matches</button>
                <button className="option" onClick={() => setView("chat")}>
                    Chat {unreadCount > 0 && <span className="notification-icon">🔴</span>}
                </button>
            </div>

            {currentUserID ? (
                <>
                    {view === "matches" && <MatchesDisplay currentUserID={currentUserID} onSelectMatch={handleSelectMatch}/>}
                    {view === "chat" && (
                        <>
                            <ChatList currentUserID={currentUserID} onSelectChat={setChatId}/>
                            <ChatDisplay chatId={chatId} currentUserID={currentUserID}/>
                        </>
                    )}
                </>
            ) : (
                <p>Loading user data or user not logged in...</p>
            )}
        </div>
    );
};

export default ChatContainer;





