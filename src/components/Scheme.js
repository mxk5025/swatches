import React, {useState, useEffect} from 'react';
import Swatch from './Swatch';
import './Scheme.css'

var colorId = 0;

export default function Scheme({schemeId, remove, easelColor}) {
  const [colors, setColors] = useState(['#ffffff']);

  const addColor = () => {
    setColors([...colors, easelColor]);
  };

  const removeColor = () => {
    var colorsCopy = [...colors];
    for (var i = colorsCopy.length - 1; i >= 0; i--) {
      var c = colorsCopy[i];
      if (c === colors) {
        colorsCopy.splice(i, 1);
        break;
      }
    }
    setColors(colorsCopy);
  }

  return (
    <div className="scheme">
      <button onClick={e => {remove(schemeId)}}>Delete</button>
      <button onClick={e => {addColor()}}>Add current color</button>
      {colors.map(color => (
        <Swatch
          key={color + '-' + colorId++}
          color={color}
        />
      ))}
    </div>
  );
}
