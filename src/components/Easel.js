import React, { useState } from 'react';
import Clipboard from 'clipboard';
import PickerCreator from '../api/PickerCreator.js';
import ColorNameUtil from '../api/ColorNameUtil.js';
import Picker from './Picker';
import Scheme from './Scheme';
import './Easel.css';

const defaultPickerName = 'colorPicker';

// Initialize copy to clipboard buttons for Pickers
new Clipboard('.clip-name');
new Clipboard('.clip-hex');

const colorNameUtil = new ColorNameUtil();

const pickerCreator = new PickerCreator(defaultPickerName);
const [pickerInstance, values] = pickerCreator.generate();

const schemeName = 'Scheme-';
var schemeId = 0;

const Easel = () => {
  const [schemes, setSchemes] = useState([]);
  const [easelColor, setEaselColor] = useState(values.hex);

  const addScheme = () => {
    setSchemes([...schemes, schemeName + schemeId++]);
  };

  const removeScheme = (scheme) => {
    setSchemes(schemes.filter(otherScheme => otherScheme !== scheme));
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
