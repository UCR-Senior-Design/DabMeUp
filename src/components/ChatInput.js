import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";

// Assume currentUserID is passed as a prop
const ChatInput = ({ chatId, currentUserID }) => {
    const [textArea, setTextArea] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!chatId) return; // Guard clause if chatId is not set

        const db = getDatabase();
        const chatRef = ref(db, `chats/${chatId}/messages`);
        // Use the passed currentUserID for the senderId
        const message = {
            senderId: currentUserID, // Now directly using the currentUserID
            text: textArea,
            timestamp: Date.now(),
        };
        push(chatRef, message); // Push the new message to the database
        setTextArea(""); // Reset the text area after submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ChatInput;
