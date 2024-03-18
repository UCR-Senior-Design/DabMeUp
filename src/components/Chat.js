import React, { useEffect, useState, useRef } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../firebase';

const Chat = ({ chatId, currentUserID }) => {
    const [messages, setMessages] = useState([]);
    const endOfMessagesRef = useRef(null); // For auto-scrolling to the newest message

    useEffect(() => {
        if (!chatId) {
            console.log("No chat ID provided");
            return;
        }

        const messagesRef = ref(database, `chats/${chatId}/messages`);
        onValue(messagesRef, (snapshot) => {
            const messagesData = snapshot.val();
            const loadedMessages = messagesData ? Object.values(messagesData).sort((a, b) => a.timestamp - b.timestamp) : [];
            setMessages(loadedMessages);
        });

        return () => off(messagesRef);
    }, [chatId]);

    useEffect(() => {
        // Scroll to the end of the messages whenever the messages state updates
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-display">
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.senderId === currentUserID ? 'sent' : 'received'}`}>
                    <div className="message-content">{message.text}</div>
                    <div className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</div>
                </div>
            ))}
            <div ref={endOfMessagesRef}></div> {/* Marker for auto-scrolling */}
        </div>
    );
};

export default Chat;

