import React from 'react';

interface ModalProps {
  element: HTMLElement;
  closeModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({ element, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Modify Element</h2>
        <p>Element Tag: {element.tagName}</p>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-gray-800 text-gray-400 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};
