// frontend/src/chatbot/MessageBubble.tsx

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  isUser: boolean;
  text: string;
}

interface MessageBubbleProps {
  message: Message;
}

const CopyButton: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className="absolute top-2 right-2 px-2 py-1 bg-gray-800 text-white border border-gray-600 text-sm rounded hover:bg-gray-600 focus:outline-none"
      onClick={handleCopy}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const CodeBlock: React.FC<{ language: string; value: string }> = ({ language, value }) => {
  return (
    <div className="relative">
      <SyntaxHighlighter
        style={{ ...vscDarkPlus }}
        language={language}
        PreTag="div"
      >
        {String(value).replace(/\n$/, '')}
      </SyntaxHighlighter>
      <CopyButton code={value} />
    </div>
  );
};

const InlineCode: React.FC = ({ children }) => {
  return (
    <code className="bg-gray-800 text-green-600 px-1 py-0.5 rounded">
      {children}
    </code>
  );
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <CodeBlock
          language={match[1]}
          value={String(children).replace(/\n$/, '')}
          {...props}
        />
      ) : (
        <InlineCode {...props}>{children}</InlineCode>
      );
    },
  };

  return (
    <div
      className={`${
        message.isUser
          ? 'max-w-[250mm] self-start bg-gray-700 text-gray-200'
          : 'max-w-[250mm] self-end bg-gray-900 text-gray-300'
      } p-4 rounded-lg max-w-[88%]`}
    >
      {message.isUser ? (
        <div className="whitespace-pre-wrap">{message.text}</div>
      ) : (
        <ReactMarkdown components={components}>{message.text}</ReactMarkdown>
      )}
    </div>
  );
};

export default MessageBubble;