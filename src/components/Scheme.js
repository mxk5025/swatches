import React, {useState, useCallback} from 'react';
import Swatch from './Swatch';
import './Scheme.css'

const minColors = 3;
const maxColors = 10;
var colorId = 0;

export default function Scheme({schemeId, remove, easelColor}) {
  const [colors, setColors] = useState(['#ffffff']);

  const addColor = useCallback(() => {
    if (colors.length >= maxColors) {
      return;
    }
    setColors([...colors, easelColor]);
  }, [colors, easelColor]);

  const removeColor = useCallback(color => {
    if (colors.length <= minColors) {
      return;
    }
    var colorsCopy = [...colors];
    for (var i = colorsCopy.length - 1; i >= 0; i--) {
      var c = colorsCopy[i];
      if (c === color) {
        colorsCopy.splice(i, 1);
        break;
      }
    }
    setColors(colorsCopy);
  }, [colors]);

  const changeColor = useCallback((color, replacement) => {
    var colorsCopy = [...colors];
    for (var i = colorsCopy.length - 1; i >= 0; i--) {
      var c = colorsCopy[i];
      if (c === color) {
        colorsCopy.splice(i, 1, replacement);
        break;
      }
    }
    setColors(colorsCopy);
  }, [colors]);

  return (
    <div className="scheme">
      <div className="scheme-name">{schemeId.split('-').join(' ')}</div>
      <div className="scheme-buttons">
        <button onClick={e => addColor()}>Add Current Color</button>
        <button onClick={e => remove(schemeId)}>Delete Scheme</button>
      </div>
      <div className="swatch-container">
        {colors.map(color => (
          <Swatch
            key={color + '-' + colorId++}
            color={color}
            removeColor={removeColor}
            chanceColor={changeColor}
          />
        ))}
      </div>
    </div>
  );
}
