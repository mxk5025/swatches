import React, { useState } from 'react';
import Clipboard from 'clipboard';
import PickerCreator from '../api/PickerCreator.js';
import ColorNameUtil from '../api/ColorNameUtil.js';
import ColorUtil from '../api/ColorUtil.js';
import Picker from './Picker';
import Scheme from './Scheme';
import './Easel.css';

const defaultPickerName = 'colorPicker';

// Initialize copy to clipboard buttons for Pickers
new Clipboard('.clip-name');
new Clipboard('.clip-hex');

const colorNameUtil = new ColorNameUtil();
const colorUtil = new ColorUtil();

const pickerCreator = new PickerCreator(defaultPickerName);
const [pickerInstance, values] = pickerCreator.generate();

const schemeName = 'Scheme-';
var schemeId = 0;

const Easel = () => {
  const [schemes, setSchemes] = useState([]);
  const [easelColor, setEaselColor] = useState(values.hex);
  const [currentSwatch, setCurrentSwatch] = useState(null);

  const addScheme = () => {
    setSchemes([...schemes, schemeName + schemeId++]);
  };

  const removeScheme = (scheme) => {
    var schemesCopy = [...schemes];
    for (var i = schemesCopy.length - 1; i >= 0; i--) {
      var s = schemesCopy[i];
      if (s === scheme) {
        schemesCopy.splice(i, 1);
        break;
      }
    }
    setSchemes(schemesCopy);
  };

  return (
    <div className="easel">
      <Picker
        key={defaultPickerName}
        pickerInstance={pickerInstance}
        values={values}
        colorNameUtil={colorNameUtil}
        setEaselColor={setEaselColor}
      />
      <div className="scheme-container">
        <button onClick={e => addScheme()}>New Scheme</button>
        {schemes.map(scheme => (
          <Scheme
            key={scheme}
            schemeId={scheme}
            remove={removeScheme}
            easelColor={easelColor}
          />
        ))}
      </div>
    </div>
  );
}

export default Easel;
