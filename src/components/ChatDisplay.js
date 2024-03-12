import React from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

// Now ChatDisplay also needs to accept currentUserID as a prop
const ChatDisplay = ({ chatId, currentUserID }) => { 
    return (
        <>
            {/* Pass chatId and currentUserID to Chat */}
            <Chat chatId={chatId} currentUserID={currentUserID}/> 
            {/* Pass chatId and currentUserID to ChatInput */}
            <ChatInput chatId={chatId} currentUserID={currentUserID}/> 
        </>
    );
};

export default ChatDisplay;


