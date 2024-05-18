// frontend/src/App.tsx

import React, { useState } from 'react';
import { Preview } from './components/Preview';
import ChatbotSidebar from './chatbot/ChatbotSidebar';
import './index.css';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // Ensure this state is defined

  const handleElementClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4 ${
        isSidebarOpen ? 'mr-[350px]' : ''
      } ${isSidebarOpen && isExpanded ? 'mr-[794px]' : ''}`}
    >
      <h1 className="text-2xl text-gray-300 font-bold mb-4">React Component Generator</h1>
      <Preview onElementClick={handleElementClick} />
      <ChatbotSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default App;
