// frontend/src/chatbot/ChatbotSidebar.tsx

import React, { useState } from 'react';
import Chatbot from './Chatbot';

interface ChatbotSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const ChatbotSidebar: React.FC<ChatbotSidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed top-0 right-0 h-full bg-gray-800 shadow-lg border-l-2 border-gray-600 z-50 flex flex-col ${
            isExpanded ? 'w-[794px]' : 'w-[350px]'
          }`}
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-semibold text-white">Rons Web Builder</h2>
            <div className="flex space-x-2">
              <button
                onClick={toggleExpand}
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
                  {isExpanded ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  )}
                </svg>
              </button>
              <button
                onClick={toggleSidebar}
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">
            <Chatbot />
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ChatbotSidebar;
