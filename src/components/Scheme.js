import React, { useState, useCallback } from 'react';
import Swatch from './Swatch';
import './Scheme.css'

const minColors = 0;
const maxColors = 8;

const Scheme = ({schemeId, remove, easelColor}) => {
  const [colors, setColors] = useState(['#ffffff']);
  const [name, setName] = useState(schemeId.split('-').join(' '));
  const [selected, setSelected] = useState(false);

  const addColor = useCallback(() => {
    if (colors.length >= maxColors) {
      return;
    }
    setColors([...colors, easelColor]);
  }, [colors, easelColor]);

  const removeColor = useCallback(colorId => {
    if (colors.length <= minColors) {
      return;
    }
    var colorsCopy = [...colors];
    colorsCopy.splice(colorId, 1);
    setColors(colorsCopy);
  }, [colors]);

  const changeColor = useCallback((color, replacement) => {
    var colorsCopy = [...colors];
    for (var i = colorsCopy.length - 1; i >= 0; i--) {
      var c = colorsCopy[i];
      if (c === color) {
        console.log(colorsCopy);
        console.log(colorsCopy.splice(i, 1, replacement));
        break;
      }
    }
    setColors(colorsCopy);
    console.log(colors);
  }, [colors]);

  const rename = (name) => setName(name);

  return (
    <div className="scheme">
      <div className="scheme-name">
        {selected ?
          <input
            value={name}
          />
          :
          <span onClick={e => setSelected(true)}>{name}</span>
        }
      </div>
      <div className="scheme-buttons">
        <button onClick={e => addColor()}>Add Current Color</button>
        <button onClick={e => remove(schemeId)}>Delete Scheme</button>
      </div>
      <div className="swatch-container">
        {colors.map((color, colorId) => (
          <Swatch
            key={'Color-' + colorId}
            colorId={colorId}
            color={color}
            removeColor={removeColor}
            changeColor={changeColor}
          />
        ))}
      </div>
    </div>
  );
}

export default Scheme;
