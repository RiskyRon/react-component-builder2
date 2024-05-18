// frontend/src/chatbot/ChatbotPopup.tsx

import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Chatbot from './Chatbot';

const ChatbotPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState({ width: 500, height: 600 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      setSize({ width: 500, height: 600 });
      setPosition({
        x: window.innerWidth - 520,
        y: window.innerHeight - 620,
      });
    }
  }, [isOpen]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <Rnd
          size={size}
          position={position}
          onResize={(e, direction, ref, delta, position) => {
            setSize({
              width: ref.offsetWidth,
              height: ref.offsetHeight,
            });
          }}
          onDragStop={(e, d) => {
            setPosition({ x: d.x, y: d.y });
          }}
          minWidth={400}
          minHeight={500}
          maxWidth={800}
          maxHeight={1000}
          bounds="window"
          className="fixed z-50 bg-gray-800 rounded-lg shadow-lg border-2 border-gray-600"
        >
          <div className="flex flex-col h-full">
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
                    d="M4.5 4.5l15 15M4.5 19.5L19.5 4.5"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
              <Chatbot />
            </div>
          </div>
        </Rnd>
      ) : (
        <button
          onClick={toggleChatbot}
          className="fixed bottom-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ChatbotPopup;
