import React, { useState, useEffect } from 'react';
import HotWrapper from './HotWrapper';

interface PreviewProps {
  onElementClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Preview: React.FC<PreviewProps> = ({ onElementClick }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.accept('./NewComponent.tsx', () => {
        setKey((prevKey) => prevKey + 1);
      });
    }
  }, []);

  return (
    <div className="bg-gray-800 p-0 rounded-md w-full" onClick={onElementClick}>
      <HotWrapper key={key} />
    </div>
  );
};
