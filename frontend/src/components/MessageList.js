import React, { useEffect, useRef } from "react";
import "./MessageList.css";

function MessageList({ messages, currentUser }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messages-container">
      {messages.length === 0 ? (
        <div className="no-messages">
          <div className="no-messages-icon">Chat</div>
          <h3>No messages yet</h3>
          <p>Start the conversation and say hello.</p>
        </div>
      ) : (
        messages.map((msg, index) => {
          const isSentByMe = msg.type === "message" && msg.user === currentUser;
          const initials = msg.user ? msg.user.charAt(0).toUpperCase() : "?";

          if (msg.type === "system") {
            return (
              <div key={index} className="message system">
                <div className="message-text">{msg.text}</div>
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`message-row ${isSentByMe ? "mine" : "theirs"}`}
            >
              {!isSentByMe && <div className="message-avatar">{initials}</div>}

              <div className={`message ${isSentByMe ? "sent" : "received"}`}>
                <div className="message-user">{msg.user}</div>
                <div className="message-text">{msg.text}</div>
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {isSentByMe && <div className="message-avatar me">{initials}</div>}
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;