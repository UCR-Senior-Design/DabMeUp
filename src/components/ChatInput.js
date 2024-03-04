import React, { useState } from "react";

const ChatInput = () => {
    const [textArea, setTextArea] = useState(""); // Initialize with an empty string

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log(textArea); // Log the text area content or handle it as needed
        setTextArea(""); // Reset the text area after submission
    };

    return (
        <form className="chat-input" onSubmit={handleSubmit}>
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button type="submit" className="secondary-button">Submit</button>
        </form>
    );
}

export default ChatInput;
