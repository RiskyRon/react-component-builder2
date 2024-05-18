// frontend/src/chatbot/ChatbotSidebar.tsx

import React, { useState } from 'react';
import Chatbot from './Chatbot';

const ChatbotSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
            <div
            className="fixed top-0 right-0 h-full bg-gray-800 shadow-lg border-l-2 border-gray-600 z-50 flex flex-col"
            style={{ width: '350px' }}
            >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-semibold text-white">Rons Web Builder</h2>
            <button
              onClick={toggleChatbot}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 4.5l-15 15M4.5 4.5l15 15"
                />
              </svg>
            </button>
          </div>
          <div className="flex-grow overflow-y-auto">
            <Chatbot />
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15M19.5 4.5l-15 15"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ChatbotSidebar;
