import React, { useState } from 'react';

const FastCarSelector = () => {
  const [selectedCar, setSelectedCar] = useState('');

  const handleSelect = (e) => {
    setSelectedCar(e.target.value);
  };

  return (
    <div>
      <h2>Select a Fast Car:</h2>
      <select value={selectedCar} onChange={handleSelect}>
        <option value=''>Select a car</option>
        <option value='Ferrari'>Ferrari</option>
        <option value='Lamborghini'>Lamborghini</option>
        <option value='Porsche'>Porsche</option>
        <option value='McLaren'>McLaren</option>
      </select>
      {selectedCar && <p>You selected: {selectedCar}</p>}
    </div>
  );
};

export default FastCarSelector;