// frontend/src/chatbot/ChatForm.tsx

import React, { useRef } from 'react';
import ModelSelector from './ModelSelector';
import ToolSelector from './ToolSelector';

interface Model {
  id: string;
  name: string;
}

interface ChatFormProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: (value: string) => void;
  selectedModel: string;
  onModelChange: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  models: Model[];
  selectedTools: string[];
  onToolsChange: (tools: string[]) => void;
  tools: string[];
}

const ChatForm: React.FC<ChatFormProps> = ({
  inputValue,
  setInputValue,
  onSubmit,
  selectedModel,
  onModelChange,
  models,
  selectedTools,
  onToolsChange,
  tools,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
      resetTextareaHeight();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'inherit';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
    e.currentTarget.style.maxHeight = '300px';
  };

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
    }
  };

  return (
    <div className="flex p-3 bg-gray-900 rounded-lg">
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className="flex-grow px-4 py-2 mb-2 bg-gray-900 text-white focus:outline-none rounded-t-lg overflow-hidden resize-none"
          placeholder="Type your message..."
          style={{ maxHeight: '300px' }}
        />
        <div className="flex justify-between items-center">

          <div className="flex-grow flex justify-end space-x-2">
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={onModelChange}
              models={models}
            />
            <ToolSelector
              selectedTools={selectedTools}
              onToolsChange={onToolsChange}
              tools={tools}
            />
                      <button
            type="submit"
            className="px-2 py-0.5 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none"
          >
            Send
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
