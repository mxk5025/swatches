import React from 'react';
import Clipboard from 'clipboard';
import PickerCreator from '../api/PickerCreator.js';
import ColorUtil from '../api/ColorUtil.js';
import Picker from './Picker';
import './MasterPicker.css';

const defaultPickerName = 'colorPicker';

// Initialize copy to clipboard buttons for Pickers
new Clipboard('.clip-name');
new Clipboard('.clip-hex');

const pickerCreator = new PickerCreator(defaultPickerName);
const picker = pickerCreator.generate();
const colorUtil = new ColorUtil();

export default function MasterPicker() {

  return (
    <div className="masterPicker">
      <Picker
        key={defaultPickerName}
        pickerInstance={picker[0]}
        values={picker[1]}
        colorUtil={colorUtil}
      />

    </div>
  );
}
