import React, { useState, useCallback } from 'react';
import Swatch from './Swatch';
import './Scheme.css'

const maxColors = 8;

const Scheme = ({schemeId, remove, easelColor}) => {
  const [colors, setColors] = useState([]);
  const [name, setName] = useState(schemeId.split('-').join(' '));
  const [selected, setSelected] = useState(false);

  const addColor = useCallback(() => {
    if (colors.length >= maxColors || colors.includes(easelColor)) {
      return;
    }
    setColors([...colors, easelColor]);
  }, [colors, easelColor]);

  const removeColor = useCallback(color => {
    setColors(colors.filter(otherColor => otherColor !== color));
  }, [colors]);

  const changeColor = useCallback((color, replacement) => {
    setColors(colors.map(otherColor => otherColor !== color ? otherColor : replacement));
  }, [colors]);

  return (
    <div className="scheme">
      <div className="scheme-name">
        <span onClick={() => setSelected(true)}>{name}</span>
      </div>
      <div className="scheme-buttons">
        <button onClick={() => addColor()}>Add Current Color</button>
        <button onClick={() => remove(schemeId)}>Delete Scheme</button>
      </div>
      <div className="swatch-container">
        {colors.map((color, colorId) => (
          <Swatch
            key={`Color-${color}`}
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
