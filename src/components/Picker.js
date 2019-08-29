import React, {useState, useEffect, useRef} from 'react';
import iro from '@jaames/iro';
import './Picker.css';

// Create a new color picker instance
// https://iro.js.org/guide.html#getting-started
var pickerInstance = new iro.ColorPicker('.colorPicker', {
  // color picker options
  // Option guide: https://iro.js.org/guide.html#color-picker-options
  width: 280,
  color: 'rgb(255, 0, 0)',
  borderWidth: 1,
  borderColor: '#fff',
});

// pickerInstance.color.hexString = '#fff'
// pickerInstance.color.rgb = { r: 255, g: 255, b: 255};
// pickerInstance.color.rgbString = 'rgb(255,255,255)';
// pickerInstance.color.hslString = 'hsl(360, 100%, 50%)';

var values = {};
// https://iro.js.org/guide.html#color-picker-events
pickerInstance.on(['color:init', 'color:change'], function(color){
  // Show the current color in different formats
  // Using the selected color: https://iro.js.org/guide.html#selected-color-api
  values.hex = color.hexString;
  values.rgb = color.rgb;
  values.hsl = color.hsl;
});

export default function Picker() {
  const [inputSelected, setInputSelected] = useState(false);
  const [temp, setTemp] = useState(null);
  const [hex, setHex] = useState(values.hex);
  const [rgb, setRgb] = useState(values.rgb);
  const [hsl, setHsl] = useState(values.hsl);

  // TODO: clean-up refs
  const colorPicker = useRef();
  const colorValues = useRef();
  const colorContainer = useRef();
  const hexCode = useRef();
  const red = useRef();
  const green = useRef();
  const blue = useRef();
  const hue = useRef();
  const saturation = useRef();
  const lightness = useRef();


  const updateRgb = tempRgb => {
    setRgb(tempRgb);
    pickerInstance.color.set(tempRgb);
    setHex(values.hex);
    setHsl(values.hsl);
  };

  const updateHsl = tempHsl => {
    setHsl(tempHsl);
    pickerInstance.color.set(tempHsl);
    setHex(values.hex);
    setRgb(values.rgb);
  };

  const updateHex = tempHex => {
    setHex(tempHex);
    if (!isPartialHexInput(tempHex)) {
      pickerInstance.color.set(tempHex);
      setRgb(values.rgb);
      setHsl(values.hsl);
    }
  };

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
  }

  const hslRgbPattern = RegExp('^[0-9]{1,3}$');
  const isInvalidInput = value => {
    return !hslRgbPattern.test(value) || (value.startsWith('0') && value.length > 1);
  };

  const hexPattern = RegExp('^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$');
  const isInvalidHexInput = value => {
    return !hexPattern.test(value);
  };

  const partialHexPattern = RegExp('^#([a-fA-F0-9]{0,2}|[a-fA-F0-9]{4,5})$|^([a-fA-F0-9]{1,2}|[a-fA-F0-9]{4,5})$');
  const isPartialHexInput = value => {
    return partialHexPattern.test(value);
  };

  const outOfBounds = (value, max) => {
    return parseInt(value, 10) > max;
  };

  const handleSelect = e => {
    const selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();
    if (selection.length > 0 && !inputSelected) {
      setInputSelected(true);
    } else if (inputSelected) {
      setInputSelected(false);
    }
  }

  const handleKeyDown = e => {
    const index = e.target.selectionStart;
    if (e.target.value === '0' &&
      ((e.key === 'Backspace' && index === 1) ||
      (e.key === 'Delete' && index === 0))) {
      e.target.value = '';
    }
  }

  const handleKeyPress = max => e => {
    var value = e.target.value;
    if (inputSelected && /[0-9]/.test(e.key)) {
      setInputSelected(false);
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
  };

  // TODO
  const handleHexKeyPress = e => {
    console.log(e.key);
    var value = e.target.value;
    const index = e.target.selectionStart;
    if (inputSelected && /[#a-fA-F0-9]/.test(e.key)) {
      if (e.key === '#' && index !== 0) {
        e.preventDefault();
        return;
      }
      setInputSelected(false);
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
  };

  const handleBlur = e => {
    var value = e.target.value;
    if (value === '') {
      e.target.value = '0';
    }
  };

  const handleHexBlur = e => {
    var value = e.target.value;
    if (value === '') {
      e.target.value = '#FFFFFF';
    }
  }

  const handleRgbChange = prop => e => {
    if (temp !== null) {
      e.target.value = temp;
      setTemp(null);
    }
    var value = e.target.value;
    var tempRgb = values.rgb;
    tempRgb[prop] = value;
    updateRgb(tempRgb);
  }

  const handleHslChange = prop => e => {
    if (temp !== null) {
      e.target.value = temp;
      setTemp(null);
    }
    var value = e.target.value;
    var tempHsl = values.hsl;
    tempHsl[prop] = value;
    updateHsl(tempHsl);
  }

  const handleHexChange = e => {
    if (temp !== null) {
      e.target.value = temp;
      setTemp(null);
    }
    var value = e.target.value;
    updateHex(value);
  }

  const hasColorChanged = () => {
    return values.hex !== hexCode.current.value;
  }

  useEffect(() => {
    const handleMouseDown = e => {
      if (colorPicker.current.contains(e.target) && hasColorChanged()) {
        setHex(values.hex);
        setRgb(values.rgb);
        setHsl(values.hsl);
      }
    };
    const handleMouseMove = e => {
      if (!colorContainer.current.contains(e.target) && hasColorChanged()) {
        setHex(values.hex);
        setRgb(values.rgb);
        setHsl(values.hsl);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="picker">
      <div className="colorPicker" ref={colorPicker} />
      <div className="colorValues" ref={colorValues}>
        <div className="color-container" ref={colorContainer} style={{ backgroundColor: hex }}>
          <div className="string-container">
            <div id="string-label">

            </div>
          </div>
          <div className="hex-container">
            <div id="hex-label">
              hex:&nbsp;
              <input ref={hexCode} type="text" value={hex} maxLength="7"
                onSelect={handleSelect}
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
              <input ref={hue} type="text" value={hsl.h} maxLength="3"
                onSelect={handleSelect}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(350)}
                onBlur={handleBlur}
                onChange={handleHslChange('h')}
              />
            </div>
            <div>
              s:&nbsp;
              <input ref={saturation} type="text" value={hsl.s} maxLength="3"
                onSelect={handleSelect}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(100)}
                onBlur={handleBlur}
                onChange={handleHslChange('s')}
              />
            </div>
            <div>
              l:&nbsp;
              <input ref={lightness} type="text" value={hsl.l} maxLength="3"
                onSelect={handleSelect}
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
                onSelect={handleSelect}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(255)}
                onBlur={handleBlur}
                onChange={handleRgbChange('r')}
              />
            </div>
            <div>
              g:&nbsp;
              <input ref={green} type="text" value={rgb.g} maxLength="3"
                onSelect={handleSelect}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress(255)}
                onBlur={handleBlur}
                onChange={handleRgbChange('g')}
              />
            </div>
            <div>
              b:&nbsp;
              <input ref={blue} type="text" value={rgb.b} maxLength="3"
                onSelect={handleSelect}
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
