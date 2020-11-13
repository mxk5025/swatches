import React, { useState, useCallback } from 'react';
import './Swatch.css';

const Swatch = ({ colorId, color, removeColor, changeColor }) => {
  const [currentColor, setCurrentColor] = useState(color);

  const changeColorToCurrent = useCallback(() => {
    changeColor(color, currentColor);
  }, [color, currentColor, changeColor]);

  // On blur update the array of colors in the parent scheme
  const handleBlur = useCallback((e) => {
    changeColor(color, e.target.value);
  }, [color, changeColor]);

  // On change set the local current color
  const handleChange = useCallback((e) => {
    setCurrentColor(e.target.value);
  }, []);

  const handleRemove = useCallback(() => {
    changeColorToCurrent();
    removeColor(color);
  }, []);

  return (
    <div className="swatch" style={{ backgroundColor: currentColor, color: currentColor.slice(1) < 'a00000' ? '#fff' : '#000' }}>
      <button
        type="button"
        onClick={() => handleRemove()}
      >
        Remove
      </button>
      <span>{currentColor}</span>
      <input
        id={`swatch-input-${colorId}`}
        type="text"
        value={currentColor}
        maxLength="7"
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  );
};

export default Swatch;
