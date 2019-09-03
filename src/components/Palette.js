import React from 'react';
import Swatch from './Swatch';
import './Palette.css'

export default function Palette({colors}) {

  return (
    <div className="palette">
      {colors.map(color => (
        <Swatch
          key={color}
          color={color}
        />
      ))}
    </div>
  );
}
