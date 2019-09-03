import React from 'react';
import Swatch from './Swatch';
import './Scheme.css'

export default function Scheme({colors, easelColor}) {

  const addColor = () => {
    colors.push(easelColor);
  };

  return (
    <div className="scheme">
      <button onClick={addColor}>Add current color</button>
      {colors.map(color => (
        <Swatch
          key={color}
          color={color}
        />
      ))}
    </div>
  );
}
