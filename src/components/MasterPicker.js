import React, {useState, useEffect} from 'react';
import PickerCreator from '../api/PickerCreator.js';
import Picker from './Picker';
import './MasterPicker.css';

const defaultPickerName = 'colorPicker';

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
          pickerName={defaultPickerName + index}
          pickerInstance={picker[0]}
          values={picker[1]}
        />
      ))}
    </div>
  );
}
