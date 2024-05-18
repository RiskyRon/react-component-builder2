// frontend/src/chatbot/ThinkingAnimation.tsx

import React from 'react';

const ThinkingAnimation: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce animation-delay-200"></div>
      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce animation-delay-400"></div>
    </div>
  );
};

export default ThinkingAnimation;