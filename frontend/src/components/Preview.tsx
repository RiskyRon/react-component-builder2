// frontend/src/components/Preview.tsx

import React from 'react';
import NewComponent from './NewComponent';

interface PreviewProps {
  onElementClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Preview: React.FC<PreviewProps> = ({ onElementClick }) => {
  return (
    <div className="bg-white shadow-lg p-4 rounded-md w-full max-w-lg" onClick={onElementClick}>
      <NewComponent componentName="ExampleComponent" componentProps={{ /* Pass any props here */ }} />
    </div>
  );
};
