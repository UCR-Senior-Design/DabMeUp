import React, { useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../firebase'; // Ensure your Firebase setup is correctly imported

const ChatList = ({ currentUserID, onSelectChat }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (!currentUserID) return;

        // Example path to user's chats, adjust based on your actual data structure
        const userChatsRef = ref(database, `userChats/${currentUserID}`);
        onValue(userChatsRef, snapshot => {
            const chatsData = snapshot.val();
            if (chatsData) {
                // Assuming each chat entry contains the ID of the other user and possibly last message or timestamp
                const loadedChats = Object.entries(chatsData).map(([key, value]) => ({
                    chatId: key,
                    ...value
                }));

                // Now, for each chat, fetch the details of the other user (name, photo)
                const profilesPromises = loadedChats.map(chat =>
                    new Promise(resolve => {
                        const otherUserId = chat.otherUserId; // Assuming this structure, adjust as necessary
                        const userRef = ref(database, `users/${otherUserId}`);
                        onValue(userRef, snap => {
                            const userProfile = snap.val();
                            resolve({ ...chat, name: userProfile?.name, photoUrl: userProfile?.photoUrl });
                        }, { onlyOnce: true });
                    })
                );

                Promise.all(profilesPromises).then(chatsWithProfiles => {
                    setChats(chatsWithProfiles);
                });
            } else {
                setChats([]);
            }
        });

        return () => off(userChatsRef);
    }, [currentUserID]);

    return (
        <div className="chat-list">
            {chats.map(chat => (
                <div key={chat.chatId} className="chat-preview" onClick={() => onSelectChat(chat.chatId)}>
                    <img src={chat.photoUrl || 'defaultProfilePicUrl'} alt={`${chat.name}'s profile`} style={{ width: 50, height: 50, borderRadius: '50%' }} />
                    <div className="chat-info">
                        <h4>{chat.name}</h4>
                        {/* Display last message or timestamp if available */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
