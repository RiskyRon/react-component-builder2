import React from 'react';

interface BlueButtonProps {
  text: string;
  onClick: () => void;
}

const BlueButton: React.FC<BlueButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BlueButton;