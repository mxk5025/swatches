import React, {useState} from 'react';
import Clipboard from 'clipboard';
import PickerCreator from '../api/PickerCreator.js';
import ColorUtil from '../api/ColorUtil.js';
import Picker from './Picker';
import Scheme from './Scheme';
import './Easel.css';

const defaultPickerName = 'colorPicker';

// Initialize copy to clipboard buttons for Pickers
new Clipboard('.clip-name');
new Clipboard('.clip-hex');

const pickerCreator = new PickerCreator(defaultPickerName);
const [pickerInstance, values] = pickerCreator.generate();
const colorUtil = new ColorUtil();

var schemeId = 0;

export default function Easel() {
  const [schemes, setSchemes] = useState([]);
  const [easelColor, setEaselColor] = useState(values.hex);
  const [currentSwatch, setCurrentSwatch] = useState(null);

  const addScheme = () => {
    var schemeInstance = {
      id: schemeId++,
      colors: ['#ffffff'],
    };
    setSchemes([...schemes, schemeInstance]);
  };

  const removeScheme = (scheme) => {
    var schemesCopy = [...schemes];
    for (var i = schemesCopy.length - 1; i >= 0; i--) {
      var s = schemesCopy[i];
      if (s.id === scheme.id) {
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
        colorUtil={colorUtil}
        setEaselColor={setEaselColor}
      />
      <div className="scheme-container">
        <button onClick={addScheme}>Add Scheme</button>
        {schemes.map(scheme => (
          <Scheme
            key={scheme.id}
            colors={scheme.colors}
            easelColor={easelColor}
          />
        ))}
      </div>
    </div>
  );
}
