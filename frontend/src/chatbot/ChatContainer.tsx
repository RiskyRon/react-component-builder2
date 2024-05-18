// frontend/src/chatbot/ChatContainer.tsx

import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import ThinkingAnimation from './ThinkingAnimation';

interface Message {
  isUser: boolean;
  text: string;
}

interface ChatContainerProps {
  messages: Message[];
  isThinking: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isThinking }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="chat-container flex flex-col space-y-4 overflow-y-auto max-h-[calc(100vh-20px)] p-4"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(75, 85, 99, 0.5) rgba(31, 41, 55, 0.5)',
      }}
    >
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
      {isThinking && (
        <div className="flex justify-end">
          <ThinkingAnimation />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;