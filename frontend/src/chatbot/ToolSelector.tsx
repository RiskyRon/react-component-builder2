// frontend/src/chatbot/ToolSelector.tsx

import React, { useState, useRef, useEffect } from 'react';

interface ToolSelectorProps {
  selectedTools: string[];
  onToolsChange: (tools: string[]) => void;
  tools: string[];
}

const ToolSelector: React.FC<ToolSelectorProps> = ({
  selectedTools,
  onToolsChange,
  tools,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToolChange = (toolName: string) => {
    const newSelectedTools = selectedTools.includes(toolName)
      ? selectedTools.filter((name) => name !== toolName)
      : [...selectedTools, toolName];
    onToolsChange(newSelectedTools);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-600 shadow-sm px-4 py-1 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
        id="tools-menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        Tools
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className="origin-bottom-right absolute right-0 bottom-full mb-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="tools-menu"
        >
          <div className="py-1" role="none">
            {tools.map((toolName) => (
              <label
                key={toolName}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <input
                  type="checkbox"
                  checked={selectedTools.includes(toolName)}
                  onChange={() => handleToolChange(toolName)}
                  className="mr-2"
                />
                {toolName}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolSelector;