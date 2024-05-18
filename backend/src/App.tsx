import React from 'react';
import Slider from './Slider';

const App: React.FC = () => {
  const handleSliderChange = (value: number) => {
    console.log('Slider value:', value);
  };

  return (
    <div>
      <h1>Slider Component</h1>
      <Slider min={0} max={5} step={1} initialValue={0} onChange={handleSliderChange} />
    </div>
  );
};

export default App;