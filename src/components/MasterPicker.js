import React, {useState, useEffect} from 'react';
import Clipboard from 'clipboard';
import PickerCreator from '../api/PickerCreator.js';
import ColorUtil from '../api/ColorUtil.js';
import Picker from './Picker';
import './MasterPicker.css';

const defaultPickerName = 'colorPicker';

// Initialize copy to clipboard buttons for Pickers
new Clipboard('.clip-name');
new Clipboard('.clip-hex');

export default function MasterPicker() {
  const [pickerCreator] = useState(new PickerCreator(defaultPickerName));
  const [pickers, setPickers] = useState([pickerCreator.generate()]);

  const addPicker = () => {
    var nextPickers = [...pickers, pickerCreator.generate()];
    setPickers(nextPickers);
  };

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <div className="masterPicker">
      {pickers.map((picker, index) => (
        <Picker
          key={defaultPickerName + index}
          id={index}
          pickerInstance={picker[0]}
          values={picker[1]}
          colorUtil ={new ColorUtil()}
        />
      ))}
    </div>
  );
}
