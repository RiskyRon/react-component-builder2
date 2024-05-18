import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-jsx';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/snippets/typescript';
import 'ace-builds/src-noconflict/snippets/jsx';

const filePath = '/Users/ron/Documents/projects/vite element highlighter/frontend/src/components/NewComponent.tsx';

const EditorPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [size, setSize] = useState({ width: 500, height: 600 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      setSize({ width: 500, height: 600 });
      setPosition({
        x: window.innerWidth - 1040,
        y: window.innerHeight - 620,
      });
      fetchContent();
    }
  }, [isOpen]);

  const fetchContent = async () => {
    try {
      const response = await fetch(`http://localhost:8010/file?path=${encodeURIComponent(filePath)}`);
      if (response.ok) {
        const data = await response.text();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };

  const saveContent = async () => {
    try {
      const response = await fetch('http://localhost:8010/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: filePath, content }),
      });
      if (response.ok) {
        alert('File saved successfully');
      }
    } catch (error) {
      console.error('Error saving file content:', error);
    }
  };

  const toggleEditor = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <Rnd
          size={size}
          position={position}
          onResize={(e, direction, ref, delta, position) => {
            setSize({
              width: ref.offsetWidth,
              height: ref.offsetHeight,
            });
          }}
          onDragStop={(e, d) => {
            setPosition({ x: d.x, y: d.y });
          }}
          minWidth={400}
          minHeight={500}
          maxWidth={800}
          maxHeight={1000}
          bounds="window"
          className="fixed z-50 bg-gray-800 rounded-lg shadow-lg border-2 border-gray-600"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold text-white">Editor</h2>
              <button
                onClick={toggleEditor}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
              <AceEditor
                mode="typescript"
                theme="monokai"
                name="editor"
                width="100%"
                height="100%"
                value={content}
                onChange={setContent}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  tabSize: 2,
                  wrap: true,
                  indentedSoftWrap: false,
                }}
              />
            </div>
            <div className="p-4">
              <button
                onClick={saveContent}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </Rnd>
      ) : (
        <button
          onClick={toggleEditor}
          className="fixed bottom-20 right-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 3.75v-1.5A1.5 1.5 0 006.75 0h10.5a1.5 1.5 0 011.5 1.5v1.5M9 3h6m-8.25 6.75H2.25m19.5 0H15.75m-3 10.5h-6m9 0h1.5a1.5 1.5 0 001.5-1.5v-1.5m-12 0v1.5a1.5 1.5 0 001.5 1.5h1.5M4.5 10.5v12h15v-12h-15z"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default EditorPopup;
