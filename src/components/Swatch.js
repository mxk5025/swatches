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
    changeColorToCurrent();
    setCurrentColor(e.target.value);
  }, [changeColorToCurrent]);

  const handleRemove = useCallback(() => {
    changeColorToCurrent();
    removeColor(currentColor);
  }, [changeColorToCurrent, currentColor]);

  return (
    <div className="swatch" style={{ backgroundColor: currentColor }}>
      <button
        type="button"
        onClick={() => handleRemove()}
      >
        Remove
      </button>
      <input
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
