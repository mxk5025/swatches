import React, {useState, useEffect, useCallback, useRef} from 'react';
import './Picker.css';

// Check for invalid HSL and RGB input
const isInvalidInput = value => {
  const hslRgbPattern = RegExp('^[0-9]{1,3}$');
  return !hslRgbPattern.test(value) ||
  (value.startsWith('0') && value.length > 1);
};

// Check for invalid Hex input
const isInvalidHexInput = value => {
  const hexPattern = RegExp('^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$');
  return !hexPattern.test(value);
};

// Check for partial hex input
const isPartialHexInput = value => {
  const partialHexPattern = RegExp(`^#([a-fA-F0-9]{0,2}|[a-fA-F0-9]{4,5})$|
  ^([a-fA-F0-9]{1,2}|[a-fA-F0-9]{4,5})$`);
  return partialHexPattern.test(value);
};

// Convert short hex to long hex when using color names
const convertShortHexToLongHex = hexVal => {
  var longHex = "#";
  const index = hexVal.startsWith('#') ? 1 : 0;
  if (hexVal.length - index === 6) {
    return hexVal;
  }
  for (var ch of hexVal.slice(index)) {
    longHex += ch + ch;
  }
  return longHex;
};

// Determine if document has a selection
const hasSelection = e => {
  const selection = document.getSelection ?
                      document.getSelection().toString() :
                      document.selection.createRange().toString();
  return selection.length > 0;
};

// Convert any string to a valid hex color
const stringToColour = str => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
};

export default function Picker({pickerName, pickerInstance, values, colorUtil}) {
  const [temp, setTemp] = useState(null);
  const [colorName, setColorName] = useState("Red");
  const [hex, setHex] = useState(values.hex);
  const [rgb, setRgb] = useState(values.rgb);
  const [hsl, setHsl] = useState(values.hsl);

  // Ref for event handling in useEffect
  const colorPicker = useRef();

  // Update the color name when necessary
  const updateColorName = useCallback(() => {
    const longHex = convertShortHexToLongHex(values.hex);
    let color = colorUtil.getColor(longHex);
    // Use the nearest color name if not defined
    color = color === undefined ? colorUtil.getNearestColor(longHex).name : color.name;
    setColorName(color);
  }, [colorUtil, values]);

  // Update Hex, RGB, and HSL in component as well as the widget
  const updateRgb = useCallback(tempRgb => {
    setRgb(tempRgb);
    pickerInstance.color.set(tempRgb);
    setHex(values.hex);
    setHsl(values.hsl);
  }, [pickerInstance.color, values.hex, values.hsl]);

  const updateHsl = useCallback(tempHsl => {
    setHsl(tempHsl);
    pickerInstance.color.set(tempHsl);
    setHex(values.hex);
    setRgb(values.rgb);
  }, [pickerInstance.color, values.hex, values.rgb]);

  const updateHex = useCallback(tempHex => {
    setHex(tempHex);
    // Do not update other values unless hex is valid
    if (!isInvalidHexInput(tempHex)) {
      pickerInstance.color.set(tempHex);
      setRgb(values.rgb);
      setHsl(values.hsl);
    }
  }, [pickerInstance.color, values.rgb, values.hsl]);

  // On key down, handle backspace and delete properly
  const handleKeyDown = useCallback(e => {
    const index = e.target.selectionStart;
    if (e.target.value === '0' &&
      ((e.key === 'Backspace' && index === 1) ||
      (e.key === 'Delete' && index === 0))) {
      e.target.value = '';
    }
  }, []);

  const handleNamePress = useCallback(e => {
  }, []);

  // On input key press, perform validation for on change event
  const handleKeyPress = useCallback(max => e => {
    const outOfBounds = (value, max) => {
      return parseInt(value, 10) > max;
    };
    var value = e.target.value;
    // If selected and valid key
    if (hasSelection() && /[0-9]/.test(e.key)) {
      return;
    }
    // If has a value
    if (value !== '') {
      // Validate the key entered; otherwise prevent input
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        return;
      }
      // Generate the temp value based on where selection started
      var digits = [...value];
      const index = e.target.selectionStart;
      digits.splice(index, 0, e.key);
      var tempValue = digits.join('');
      // If the temp value is invalid, prevent input
      if (isInvalidInput(tempValue) ||
          (value.length === 2 && outOfBounds(tempValue, max))) {
        e.preventDefault();
        return;
      }
      // Valid temp value; set the temp
      setTemp(tempValue);
    }
    else {
      if (e.key === 'Enter') {
        e.target.value = '0';
      }
    }
  }, []);

  const handleHexKeyPress = useCallback(e => {
    var value = e.target.value;
    const index = e.target.selectionStart;
    // If selected and valid key
    if (hasSelection && /[#a-fA-F0-9]/.test(e.key)) {
      if (e.key === '#' && index !== 0) {
        e.preventDefault();
      }
      return;
    }
    // If has a value
    if (value !== '') {
      // Validate the key entered; otherwise prevent input
      if (!/[#a-fA-F0-9]/.test(e.key)) {
        e.preventDefault();
        return;
      }
      // Generate the temp value based on where selection started
      var hexValues = [...value];
      // Validate that # starts on the 0th index
      if (e.key === '#' && index !== 0) {
        e.preventDefault();
        return;
      }
      hexValues.splice(index, 0, e.key);
      var tempValue = hexValues.join('');
      // If the temp value is invalid, prevent input
      if (isInvalidHexInput(tempValue) && !isPartialHexInput(tempValue)) {
        e.preventDefault();
        return;
      }
      // Valid temp value; set the temp
      setTemp(tempValue);
    }
    else {
      if (e.key === 'Enter') {
        e.target.value = '#FFFFFF';
      }
    }
  }, []);

  // On out of focus and value is empty string, set to default value
  const handleBlur = useCallback(e => {
    var value = e.target.value;
    if (value === '') {
      e.target.value = '0';
    }
  }, []);

  const handleHexBlur = useCallback(e => {
    var value = e.target.value;
    if (value === '') {
      e.target.value = '#FFFFFF';
    }
  }, []);

  // On change, update Hex, RGB, and HSL values
  const handleRgbChange = useCallback(prop => e => {
    if (temp !== null) {
      e.target.value = temp;
      setTemp(null);
    }
    var value = e.target.value === '' ? '0' : e.target.value;
    var tempRgb = values.rgb;
    tempRgb[prop] = value;
    updateRgb(tempRgb);
    updateColorName();
  }, [temp, values.rgb, updateRgb, updateColorName]);

  const handleHslChange = useCallback(prop => e => {
    if (temp !== null) {
      e.target.value = temp;
      setTemp(null);
    }
    var value = e.target.value === '' ? '0' : e.target.value;
    var tempHsl = values.hsl;
    tempHsl[prop] = value;
    updateHsl(tempHsl);
    updateColorName();
  }, [temp, values.hsl, updateHsl, updateColorName]);

  const handleHexChange = useCallback(e => {
    if (temp !== null) {
      e.target.value = temp;
      setTemp(null);
    }
    var value = e.target.value === '' ? '#000' : e.target.value;
    updateHex(value);
    updateColorName();
  }, [temp, updateHex, updateColorName]);

  useEffect(() => {
    // Define update values
    const updateValues = () => {
      setHex(values.hex);
      setRgb(values.rgb);
      setHsl(values.hsl);
      updateColorName();
    }
    // Define mouse events
    let isColorChanging = false;
    const handleMouseDown = e => {
      if (colorPicker.current.contains(e.target)) {
        updateValues();
        isColorChanging = true;
      }
    };
    const handleMouseMove = e => {
      if (isColorChanging) {
        updateValues();
      }
    };
    const handleMouseUp = e => {
      if (isColorChanging) {
        isColorChanging = false;
      }
    }
    // Add the event listeners
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [updateColorName, values]);

  return (
    <div className="picker">
      <div className={pickerName} ref={colorPicker}/>
      <div className="colorValues">
        <div className="color-container" style={{backgroundColor: values.hex}}>
          <div className="string-container">
            <div id="string-label">
              name:&nbsp;
              <input type="text" value={colorName} maxLength="40"
                onKeyDown={handleKeyDown}
                onKeyPress={() => {return}}
                onBlur={() => {return}}
                onChange={() => {return}}
              />
            </div>
          </div>
          <div className="hex-container">
            <div id="hex-label">
              hex:&nbsp;
              <input type="text" value={hex} maxLength="7"
                onKeyDown={handleKeyDown}
                onKeyPress={handleHexKeyPress}
                onBlur={handleHexBlur}
                onChange={handleHexChange}
              />
            </div>
          </div>
          <div className="hsl-container">
            hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
            <div>
              h:&nbsp;
              <input type="text" value={hsl.h} maxLength="3"
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(360)}
                onBlur={handleBlur}
                onChange={handleHslChange('h')}
              />
            </div>
            <div>
              s:&nbsp;
              <input type="text" value={hsl.s} maxLength="3"
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(100)}
                onBlur={handleBlur}
                onChange={handleHslChange('s')}
              />
            </div>
            <div>
              l:&nbsp;
              <input type="text" value={hsl.l} maxLength="3"
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(100)}
                onBlur={handleBlur}
                onChange={handleHslChange('l')}
              />
            </div>
          </div>
          <div className="rgb-container">
            rgb({rgb.r}, {rgb.g}, {rgb.b})
            <div>
              r:&nbsp;
              <input type="text" value={rgb.r} maxLength="3"
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(255)}
                onBlur={handleBlur}
                onChange={handleRgbChange('r')}
              />
            </div>
            <div>
              g:&nbsp;
              <input type="text" value={rgb.g} maxLength="3"
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(255)}
                onBlur={handleBlur}
                onChange={handleRgbChange('g')}
              />
            </div>
            <div>
              b:&nbsp;
              <input type="text" value={rgb.b} maxLength="3"
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(255)}
                onBlur={handleBlur}
                onChange={handleRgbChange('b')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
