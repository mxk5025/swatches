import React from 'react';
import './Swatch.css'

export default function Swatch({color, removeColor}) {
  return (
    <div className="swatch" style={{backgroundColor: color, color: color.slice(1) < 'a00000' ? '#fff' : '#000'}}>
      <button onClick={() => removeColor(color)}>Remove</button>
      <span>{color}</span>
    </div>
  );
}
