import React, { useState } from "react";
import { FiSend, FiUser, FiMessageSquare } from "react-icons/fi";
import "./ChatInput.css";

function ChatInput({ onSendMessage, onTyping }) {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const handleSend = () => {
    if (message.trim() && username.trim()) {
      onSendMessage(message, username);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (username.trim()) {
      onTyping(username);
    }
  };

  return (
    <div className="chat-input-container">
      <div className="field-shell username-shell">
        <FiUser className="field-icon" aria-hidden="true" />
        <input
          type="text"
          className="username-input"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Your name"
        />
      </div>

      <div className="field-shell message-shell">
        <FiMessageSquare className="field-icon" aria-hidden="true" />
        <input
          type="text"
          className="message-input"
          placeholder="Write your message"
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyPress}
          aria-label="Type a message"
        />
      </div>

      <button
        className="send-button"
        onClick={handleSend}
        disabled={!message.trim() || !username.trim()}
        aria-label="Send message"
      >
        <FiSend />
        <span>Send</span>
      </button>
    </div>
  );
}

export default ChatInput;