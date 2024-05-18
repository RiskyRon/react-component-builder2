import React, { useState } from 'react';
import { Modal } from './components/Modal';
import { Preview } from './components/Preview';
import ChatbotPopup from './chatbot/ChatbotPopup';
import EditorPopup from './components/EditorPopup';
import './index.css';

const App: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  const handleElementClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setSelectedElement(event.currentTarget);
  };

  const closeModal = () => setSelectedElement(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
      <h1 className="text-2xl text-gray-300 font-bold mb-4">React Component Generator</h1>
      <Preview onElementClick={handleElementClick} />
      {selectedElement && <Modal element={selectedElement} closeModal={closeModal} />}
      <ChatbotPopup />
      <EditorPopup />
    </div>
  );
};

export default App;
