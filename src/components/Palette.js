import React from 'react';
import Swatch from './Swatch';
import './Palette.css'

export default function Palette({colors, easelColor}) {

  const addColor = () => {
    colors.push(easelColor);
  };

  return (
    <div className="palette">
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
