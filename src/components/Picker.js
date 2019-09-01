import React, {useState, useEffect, useCallback, useRef} from 'react';
import './Picker.css';

const isInvalidInput = value => {
  const hslRgbPattern = RegExp('^[0-9]{1,3}$');
  return !hslRgbPattern.test(value) ||
  (value.startsWith('0') && value.length > 1);
};

const isInvalidHexInput = value => {
  const hexPattern = RegExp('^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$');
  return !hexPattern.test(value);
};

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

const isPartialHexInput = value => {
  const partialHexPattern = RegExp(`^#([a-fA-F0-9]{0,2}|[a-fA-F0-9]{4,5})$|
                              ^([a-fA-F0-9]{1,2}|[a-fA-F0-9]{4,5})$`);
  return partialHexPattern.test(value);
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

  const colorPicker = useRef();
  const red = useRef();
  const green = useRef();
  const blue = useRef();

  const updateColorName = useCallback(() => {
    const longHex = convertShortHexToLongHex(values.hex);
    let color = colorUtil.getColor(longHex);
    color = color === undefined ? colorUtil.getNearestColor(longHex).name : color.name;
    setColorName(color);
  }, [colorUtil, values]);

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
    if (!isPartialHexInput(tempHex)) {
      pickerInstance.color.set(tempHex);
      setRgb(values.rgb);
      setHsl(values.hsl);
    }
  }, [pickerInstance.color, values.rgb, values.hsl]);

  const hasSelection = useCallback(e => {
    const selection = document.getSelection ?
                        document.getSelection().toString() :
                        document.selection.createRange().toString();
    return selection.length > 0;
  }, []);

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

  const handleKeyPress = useCallback(max => e => {
    const outOfBounds = (value, max) => {
      return parseInt(value, 10) > max;
    };
    var value = e.target.value;
    if (hasSelection() && /[0-9]/.test(e.key)) {
      return;
    }
    if (value !== '') {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        return;
      }
      var digits = [...value];
      const index = e.target.selectionStart;
      digits.splice(index, 0, e.key);
      var tempValue = digits.join('');
      if (isInvalidInput(tempValue) ||
          (value.length === 2 && outOfBounds(tempValue, max))) {
        e.preventDefault();
        return;
      }
      else {
        setTemp(tempValue);
      }
    }
    else {
      if (e.key === 'Enter') {
        e.target.value = '0';
      }
    }
  }, [hasSelection]);

  const handleHexKeyPress = useCallback(e => {
    var value = e.target.value;
    const index = e.target.selectionStart;
    if (hasSelection && /[#a-fA-F0-9]/.test(e.key)) {
      if (e.key === '#' && index !== 0) {
        e.preventDefault();
      }
      return;
    }
    if (value !== '') {
      if (!/[#a-fA-F0-9]/.test(e.key)) {
        e.preventDefault();
        return;
      }
      var hexValues = [...value];
      if (e.key === '#' && index !== 0) {
        e.preventDefault();
        return;
      }
      hexValues.splice(index, 0, e.key);
      var tempValue = hexValues.join('');
      if (isInvalidHexInput(tempValue) && !isPartialHexInput(tempValue)) {
        e.preventDefault();
        return;
      }
      else {
        setTemp(tempValue);
      }
    }
    else {
      if (e.key === 'Enter') {
        e.target.value = '#FFFFFF';
      }
    }
  }, [hasSelection]);

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

  const handleRgbChange = useCallback(prop => e => {
    if (temp !== null) {
      e.target.value = temp;
      setTemp(null);
    }
    var value = e.target.value === '' ? '0' : e.target.value;
    var tempRgb = values.rgb;
    tempRgb[prop] = value;
    updateRgb(tempRgb);
  }, [temp, values.rgb, updateRgb]);

  const handleHslChange = useCallback(prop => e => {
    if (temp !== null) {
      e.target.value = temp;
      setTemp(null);
    }
    var value = e.target.value === '' ? '0' : e.target.value;
    var tempHsl = values.hsl;
    tempHsl[prop] = value;
    updateHsl(tempHsl);
  }, [temp, values.hsl, updateHsl]);

  const handleHexChange = useCallback(e => {
    if (temp !== null) {
      e.target.value = temp;
      setTemp(null);
    }
    var value = e.target.value === '' ? '#000' : e.target.value;
    updateHex(value);
  }, [temp, updateHex]);

  useEffect(() => {
    const updateValues = () => {
      setHex(values.hex);
      setRgb(values.rgb);
      setHsl(values.hsl);
      updateColorName();
    }
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
        <div className="color-container" style={{backgroundColor: hex}}>
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
              <input ref={red} type="text" value={rgb.r} maxLength="3"
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(255)}
                onBlur={handleBlur}
                onChange={handleRgbChange('r')}
              />
            </div>
            <div>
              g:&nbsp;
              <input ref={green} type="text" value={rgb.g} maxLength="3"
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(255)}
                onBlur={handleBlur}
                onChange={handleRgbChange('g')}
              />
            </div>
            <div>
              b:&nbsp;
              <input ref={blue} type="text" value={rgb.b} maxLength="3"
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
