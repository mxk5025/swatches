import React, { useState, useEffect, useCallback, useRef } from 'react';
import rdfc from 'rfdc';
import { complementary } from '../api/ColorUtil';
import clippy from '../assets/clippy.svg';
import './Picker.css';

const clone = rdfc();

// Check if value exceeds max
const outOfBounds = (value, max) => parseInt(value, 10) > max;

// Check for invalid HSL and RGB input
const isInvalidInput = (value) => {
  const hslRgbPattern = RegExp('^[0-9]{1,3}$');
  return !hslRgbPattern.test(value)
  || (value.startsWith('0') && value.length > 1);
};

// Check for invalid Hex input
const isInvalidHexInput = (value) => {
  const hexPattern = RegExp('^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$');
  return !hexPattern.test(value);
};

// Check for partial hex input
const isPartialHexInput = (value) => {
  const partialHexPattern = RegExp(`^#([a-fA-F0-9]{0,2}|[a-fA-F0-9]{4,5})$|
  ^([a-fA-F0-9]{1,2}|[a-fA-F0-9]{4,5})$`);
  return partialHexPattern.test(value);
};

// Determine if document has a selection
const hasSelection = (element) => element.selectionEnd - element.selectionStart !== 0;

// Convert any string to a valid hex color
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += (`00${value.toString(16)}`).substr(-2);
  }
  return color;
};

const Picker = ({ pickerInstance, values, colorNameUtil, setEaselColor }) => {
  const [temp, setTemp] = useState('');
  const [colorName, setColorName] = useState('Red');
  const [comp, setComp] = useState(complementary(values.hex));
  // TODO: Allow ability to toggle what is displayed
  // const [showOptions, setShowOptions] = useState({
  //   name: true,
  //   hex: true,
  //   rgb: true,
  //   hsl: true
  // });

  // Ref for event handling in useEffect
  const colorPicker = useRef();

  // Update the color name when necessary
  const updateColorName = useCallback(() => {
    let color = colorNameUtil.getColor(values.hex);
    // Use the nearest color name if not defined
    color = color === undefined ? colorNameUtil.getNearestColor(values.hex).name : color.name;
    setColorName(color);
  }, [colorNameUtil, values]);

  // Update Hex, RGB, and HSL in component as well as the widget
  const updateRgb = useCallback((tempRgb) => {
    pickerInstance.color.set(tempRgb);
    setEaselColor(values.hex);
  }, [pickerInstance.color, values.hex, values.hsl, setEaselColor]);

  const updateHsl = useCallback((tempHsl) => {
    pickerInstance.color.set(tempHsl);
    setEaselColor(values.hex);
  }, [pickerInstance.color, values.hex, values.rgb, setEaselColor]);

  const updateHex = useCallback((tempHex) => {
    // Do not update other values unless hex is valid
    if (!isInvalidHexInput(tempHex)) {
      pickerInstance.color.set(tempHex);
      setEaselColor(tempHex);
    }
  }, [pickerInstance.color, values.rgb, values.hsl, setEaselColor]);

  // On key down, handle backspace and delete properly
  const handleKeyDown = useCallback((e) => {
    const index = e.target.selectionStart;
    if (e.target.value.length === 1
      && ((e.key === 'Backspace' && index === 1)
      || (e.key === 'Delete' && index === 0))) {
      e.target.value = '';
    }
  }, []);

  // On input key press, perform validation for on change event
  const handleKeyPress = useCallback((max) => (e) => {
    const { value } = e.target;
    // If selected and valid key
    if (hasSelection(e.target) && /[0-9]/.test(e.key)) {
      return;
    }
    // Validate the key entered; otherwise prevent input
    if (!/[0-9]/.test(e.key) || e.key === 'Enter') {
      e.preventDefault();
      return;
    }
    // If input has characters
    if (value !== '') {
      // Generate the temp value based on where selection started
      const digits = [...value];
      const index = e.target.selectionStart;
      digits.splice(index, 0, e.key);
      const tempValue = digits.join('');
      // If the temp value is invalid, prevent input
      if (isInvalidInput(tempValue)
          || (value.length === 2 && outOfBounds(tempValue, max))) {
        e.preventDefault();
        return;
      }
      // Valid temp value; set the temp
      setTemp(tempValue);
    }
  }, []);

  const handleNamePress = useCallback((e) => {
    // Value before e.key is added
    const { value } = e.target;
    // If there is a selection allow input
    if (hasSelection(e.target)) {
      // If replacing entire input, make sure key is upper case
      if (window.getSelection().toString() === value) {
        e.key = e.key.toUpperCase();
        setTemp(e.key);
      }
      return;
    }
    // Only allow these characters for naming conventions
    if (!/[a-zA-Z0-9!@#$%^&*)(+=._-\s]/.test(e.key) || e.key === 'Enter') {
      e.preventDefault();
      return;
    }
    // If input has characters
    if (value !== '') {
      // Generate the temp value based on where selection started
      const chars = [...value];
      const index = e.target.selectionStart;
      chars.splice(index, 0, e.key);
      const tempValue = chars.join('');
      setTemp(tempValue);
    } else {
      // Handle backspace to capitalize first char
      const index = e.target.selectionStart;
      // first char, make it upper case
      if (index === 0 && /[a-z]/.test(e.key)) {
        e.key = e.key.toUpperCase();
      }
      setTemp(e.key);
    }
  }, []);

  const handleHexKeyPress = useCallback((e) => {
    const { value } = e.target;
    const index = e.target.selectionStart;
    // If selected and valid key
    if (hasSelection(e.target) && /[#a-fA-F0-9]/.test(e.key)) {
      if (e.key === '#' && index !== 0) {
        e.preventDefault();
      }
      return;
    }
    // If input has characters
    if (value !== '') {
      // Validate the key entered; otherwise prevent input
      if (!/[#a-fA-F0-9]/.test(e.key) || e.key === 'Enter') {
        e.preventDefault();
        return;
      }
      // Generate the temp value based on where selection started
      const hexValues = [...value];
      // Validate that # starts on the 0th index
      if (e.key === '#' && index !== 0) {
        e.preventDefault();
        return;
      }
      hexValues.splice(index, 0, e.key);
      const tempValue = hexValues.join('');
      // If the temp value is invalid, prevent input
      if (isInvalidHexInput(tempValue) && !isPartialHexInput(tempValue)) {
        e.preventDefault();
        return;
      }
      // Valid temp value; set the temp
      setTemp(tempValue);
    } else if (e.key !== '#') {
      e.preventDefault();
    }
  }, []);

  // On paste, validate that the text data is within bounds for RGB and HSL
  const handlePaste = useCallback((max) => (e) => {
    const textData = e.clipboardData.getData('text');
    // Text data must be a number
    if (Number.isNaN(parseInt(textData, 10))) {
      e.preventDefault();
      return;
    }
    const { value } = e.target;
    const index = e.target.selectionStart;
    const count = e.target.selectionEnd - index;
    const digits = [...value];
    digits.splice(index, count, textData);
    const tempValue = digits.join('');
    // Prevent if out of bounds
    if (outOfBounds(tempValue, max)) {
      e.preventDefault();
      return;
    }
    setTemp(tempValue);
  }, []);

  // On paste, validate that the resulting input is a valid or partial Hex
  const handleHexPaste = useCallback((e) => {
    const textData = e.clipboardData.getData('text');
    // Prevent other characters
    if (!/[#a-fA-F0-9]+/.test(textData)) {
      e.preventDefault();
      return;
    }
    const { value } = e.target;
    const index = e.target.selectionStart;
    const count = e.target.selectionEnd - index;
    const chars = [...value];
    chars.splice(index, count, textData);
    const tempValue = chars.join('');
    // Prevent if invalid and not a partial
    if (isInvalidHexInput(tempValue) && !isPartialHexInput(tempValue)) {
      e.preventDefault();
      return;
    }
    setTemp(tempValue);
  }, []);

  // On out of focus and value is empty string, set to default value of 0
  const handleRgbBlur = useCallback((prop) => (e) => {
    if (e.target.value === '') {
      e.target.value = '0';
      const tempRgb = clone(values.rgb);
      tempRgb[prop] = e.target.value;
      updateRgb(tempRgb);
      updateColorName();
    }
  }, [values.rgb, updateRgb, updateColorName]);

  const handleHslBlur = useCallback((prop) => (e) => {
    if (e.target.value === '') {
      e.target.value = '0';
      const tempHsl = clone(values.hsl);
      tempHsl[prop] = e.target.value;
      updateHsl(tempHsl);
      updateColorName();
    }
  }, [values.hsl, updateHsl, updateColorName]);

  // On out of focus of color name, update to the actual color name
  const handleNameBlur = useCallback(() => {
    updateColorName();
  }, [updateColorName]);

  // On change, update Hex, RGB, and HSL values
  const handleRgbChange = useCallback((prop) => (e) => {
    if (temp !== '') {
      e.target.value = temp;
      setTemp('');
    }
    const { value } = e.target;
    const tempRgb = clone(values.rgb);
    tempRgb[prop] = value;
    if (value !== '') {
      updateRgb(tempRgb);
      updateColorName();
    }
  }, [temp, values.rgb, updateRgb, updateColorName]);

  const handleHslChange = useCallback((prop) => (e) => {
    if (temp !== '') {
      e.target.value = temp;
      setTemp('');
    }
    const { value } = e.target;
    const tempHsl = clone(values.hsl);
    tempHsl[prop] = value;
    if (value !== '') {
      updateHsl(tempHsl);
      updateColorName();
    }
  }, [temp, values.hsl, updateHsl, updateColorName]);

  const handleHexChange = useCallback((e) => {
    if (temp !== '') {
      e.target.value = temp;
      setTemp('');
    }
    const value = e.target.value === '' ? '#000' : e.target.value;
    updateHex(value);
    updateColorName();
  }, [temp, updateHex, updateColorName]);

  const handleNameChange = useCallback((e) => {
    const index = e.target.selectionStart;
    if (temp !== '') {
      e.target.value = temp;
      setTemp('');
    }
    const value = e.target.value === '' ? 'Black' : e.target.value;
    const color = colorNameUtil.getHex(value);
    const hexFromName = color === undefined ? stringToColor(value) : color.hex;
    updateHex(hexFromName);
    // Set, but do not update internal values
    setColorName(value);
    // Maintain the selection index
    e.target.selectionStart = index;
    e.target.selectionEnd = index;
  }, [temp, updateHex, colorNameUtil]);

  useEffect(() => {
    // Define update values
    const updateValues = () => {
      setComp(complementary(values.hex));
      updateColorName();
      setEaselColor(values.hex);
    };
    // Define mouse events
    let isColorChanging = false;
    const handleMouseDown = (e) => {
      if (colorPicker.current.contains(e.target)) {
        updateValues();
        isColorChanging = true;
      }
    };
    const handleMouseMove = () => {
      if (isColorChanging) {
        updateValues();
      }
    };
    const handleMouseUp = () => {
      if (isColorChanging) {
        isColorChanging = false;
      }
    };
    // Add the event listeners
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [updateColorName, values, setEaselColor]);

  return (
    <div className="picker">
      <div className="colorPicker" ref={colorPicker} />
      <div className="colorValues">
        <div className="color-container">
          <div className="info-container" style={{ backgroundColor: '#fff' }}>
            <div className="name-container">
              <div className="name-label">
                name:&nbsp;
                <input
                  id="name-input"
                  type="text"
                  value={colorName}
                  maxLength="40"
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleNamePress}
                  onBlur={handleNameBlur}
                  onChange={handleNameChange}
                />
                <button
                  type="button"
                  className="clip-name"
                  data-clipboard-target="#name-input"
                >
                  <img width="14" src={clippy} alt="Copy" />
                </button>
              </div>
            </div>
            <div className="hex-container">
              <div className="hex-label">
                hex:&nbsp;
                <input
                  id="hex-input"
                  type="text"
                  value={values.hex}
                  maxLength="7"
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleHexKeyPress}
                  onPaste={handleHexPaste}
                  onChange={handleHexChange}
                />
                <button
                  type="button"
                  className="clip-hex"
                  data-clipboard-target="#hex-input"
                >
                  <img width="14" src={clippy} alt="Copy" />
                </button>
              </div>
            </div>
            <div className="rgb-container">
              <span>{`rgb(${values.rgb.r}, ${values.rgb.g}, ${values.rgb.b})`}</span>
              <div>
                r:&nbsp;
                <input
                  type="text"
                  value={values.rgb.r}
                  maxLength="3"
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress(255)}
                  onPaste={handlePaste(255)}
                  onBlur={handleRgbBlur('r')}
                  onChange={handleRgbChange('r')}
                />
              </div>
              <div>
                g:&nbsp;
                <input
                  type="text"
                  value={values.rgb.g}
                  maxLength="3"
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress(255)}
                  onPaste={handlePaste(255)}
                  onBlur={handleRgbBlur('g')}
                  onChange={handleRgbChange('g')}
                />
              </div>
              <div>
                b:&nbsp;
                <input
                  type="text"
                  value={values.rgb.b}
                  maxLength="3"
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress(255)}
                  onPaste={handlePaste(255)}
                  onBlur={handleRgbBlur('b')}
                  onChange={handleRgbChange('b')}
                />
              </div>
            </div>
            <div className="hsl-container">
              <span>{`hsl(${values.hsl.h}, ${values.hsl.s}%, ${values.hsl.l}%)`}</span>
              <div>
                h:&nbsp;
                <input
                  type="text"
                  value={values.hsl.h}
                  maxLength="3"
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress(360)}
                  onPaste={handlePaste(360)}
                  onBlur={handleHslBlur('h')}
                  onChange={handleHslChange('h')}
                />
              </div>
              <div>
                s:&nbsp;
                <input
                  type="text"
                  value={values.hsl.s}
                  maxLength="3"
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress(100)}
                  onPaste={handlePaste(100)}
                  onBlur={handleHslBlur('s')}
                  onChange={handleHslChange('s')}
                />
              </div>
              <div>
                l:&nbsp;
                <input
                  type="text"
                  value={values.hsl.l}
                  maxLength="3"
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress(100)}
                  onPaste={handlePaste(100)}
                  onBlur={handleHslBlur('l')}
                  onChange={handleHslChange('l')}
                />
              </div>
            </div>
          </div>
          <div className="preview">
            <div className="current-color" style={{ backgroundColor: values.hex }}>
              <span>{values.hex}</span>
            </div>
            <div className="comp-color" style={{ backgroundColor: comp }}>
              <span>{comp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Picker;
