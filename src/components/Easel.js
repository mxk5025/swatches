import React, {useState} from 'react';
import Clipboard from 'clipboard';
import PickerCreator from '../api/PickerCreator.js';
import ColorUtil from '../api/ColorUtil.js';
import Picker from './Picker';
import Palette from './Palette';
import './Easel.css';

const defaultPickerName = 'colorPicker';

// Initialize copy to clipboard buttons for Pickers
new Clipboard('.clip-name');
new Clipboard('.clip-hex');

const pickerCreator = new PickerCreator(defaultPickerName);
const [pickerInstance, values] = pickerCreator.generate();
const colorUtil = new ColorUtil();

var paletteId = 0;

export default function Easel() {
  const [palettes, setPalettes] = useState([]);
  const [currentColor, setCurrentColor] = useState(values.hex);
  const [currentSwatch, setCurrentSwatch] = useState(null);

  const addPalette = () => {
    var paletteInstance = {
      id: paletteId++,
      colors: [],
    };
    setPalettes([...palettes, paletteInstance]);
  };

  const removePalette = (palette) => {
    var palettesCopy = [...palettes];
    for (var i = palettesCopy.length - 1; i >= 0; i--) {
      var p = palettesCopy[i];
      if (p.id === palette.id) {
        palettesCopy.splice(i, 1);
        break;
      }
    }
    setPalettes(palettesCopy);
  };

  return (
    <div className="easel">
      <Picker
        key={defaultPickerName}
        pickerInstance={pickerInstance}
        values={values}
        colorUtil={colorUtil}
        setCurrentColor={setCurrentColor}
        currentColor={currentColor}
      />
      <div className="palette-container">\
        {palettes.map(palette => (
          <Palette
            key={palette.id}
            colors={palette.colors}
          />
        ))}
      </div>
    </div>
  );
}
