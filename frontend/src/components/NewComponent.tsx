import React from 'react';

const BlueCard: React.FC = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-500 text-white p-6">
      <h1 className="text-xl font-bold mb-2">Blue Card</h1>
      <p className="text-base">
        This is a simple card component with a blue background. Blue is a calming color that represents stability and tranquility.
      </p>
    </div>
  );
};

export default BlueCard;