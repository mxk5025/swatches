import React, {useState, useCallback} from 'react';
import './Swatch.css'

export default function Swatch({color, removeColor, changeColor}) {
  const [currentColor, setCurrentColor] = useState(color);

  const changeColorToCurrent = useCallback(e => {
    changeColor(color, currentColor);
  }, [color, currentColor, changeColor])

  // On blur update the array of colors in the parent scheme
  const handleBlur = useCallback(e => {
    changeColor(color, e.target.value);
  }, [color, changeColor]);

  // On change set the local current color
  const handleChange = useCallback(e => {
    setCurrentColor(e.target.value);
  }, []);

  return (
    <div className="swatch" style={{backgroundColor: currentColor, color: currentColor.slice(1) < 'a00000' ? '#fff' : '#000'}}>
      <button onClick={() => {
          changeColorToCurrent();
          removeColor(currentColor);
        }}
      >
        Remove
      </button>
      <span>{currentColor}</span>
      <input id="swatch-input" type="text" value={currentColor} maxLength="7"
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  );
}
