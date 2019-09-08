import React from 'react';
import './Swatch.css'

export default function Swatch({color, removeColor, changeColor}) {
  // TODO: change the color via the input field
  return (
    <div className="swatch" style={{backgroundColor: color, color: color.slice(1) < 'a00000' ? '#fff' : '#000'}}>
      <button onClick={() => removeColor(color)}>Remove</button>
      <span>{color}</span>
      <input id="swatch-input" type="text" value={color} maxLength="7"
        onChange={e => {return}}
      />
    </div>
  );
}
