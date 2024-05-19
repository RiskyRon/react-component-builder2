// frontend/src/chatbot/Chatbot.tsx

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatContainer from './ChatContainer';
import ChatForm from './ChatForm';

interface Message {
  isUser: boolean;
  text: string;
}

interface Model {
  id: string;
  name: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [sessionID, setSessionID] = useState(() => {
    const storedSessionID = localStorage.getItem('sessionID');
    if (storedSessionID) {
      return storedSessionID;
    } else {
      const newSessionID = uuidv4();
      localStorage.setItem('sessionID', newSessionID);
      return newSessionID;
    }
  });

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8010/chat/history?session_id=${sessionID}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.chat_history.map((msg: any) => ({
            isUser: msg.role === 'human',
            text: msg.content,
          })));
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [sessionID]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('http://localhost:8010/tools');
        if (response.ok) {
          const data = await response.json();
          setTools(data.tools);
        }
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };

    fetchTools();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:8010/models');
        if (response.ok) {
          const data = await response.json();
          setModels(data.models);
          setSelectedModel('gpt-4o-2024-05-13');
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  const handleToolsChange = (newSelectedTools: string[]) => {
    setSelectedTools(newSelectedTools.length > 0 ? newSelectedTools : tools);
  };

  const handleSubmit = async (inputValue: string) => {
    console.log('Sending Session ID:', sessionID);
    const userMessage: Message = { isUser: true, text: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsThinking(true);
    try {
      const response = await fetch('http://localhost:8010/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: inputValue,
          chat_history: messages.map((msg) => ({
            role: msg.isUser ? 'human' : 'ai',
            content: msg.text,
          })),
          model_id: selectedModel,
          selected_tools: selectedTools.length > 0 ? selectedTools : tools,
          session_id: sessionID,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = { isUser: false, text: data.output };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsThinking(false);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLButtonElement>) => {
    setSelectedModel(e.target.value);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        <ChatContainer messages={messages} isThinking={isThinking} />
      </div>
      <div className="sticky bottom-0 bg-gray-800">
        <ChatForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmit={handleSubmit}
          selectedModel={selectedModel}
          onModelChange={handleModelChange}
          models={models}
          selectedTools={selectedTools}
          onToolsChange={handleToolsChange}
          tools={tools}
        />
      </div>
    </div>
  );
};

export default Chatbot;
