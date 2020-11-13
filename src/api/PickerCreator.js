import iro from '@jaames/iro';

export default class PickerCreator {

  constructor(pickerName) {
    this.pickerName = pickerName;
  }

  generate() {
    // Create a new color picker instance
    // https://iro.js.org/guide.html#getting-started
    const pickerInstance = new iro.ColorPicker('.' + this.pickerName, {
      // color picker options
      // Option guide: https://iro.js.org/guide.html#color-picker-options
      width: 280,
      color: 'rgb(255, 0, 0)',
      borderWidth: 1,
      borderColor: '#fff',
    });

    let values = {};
    // https://iro.js.org/guide.html#color-picker-events
    pickerInstance.on(['color:init', 'color:change'], function(color){
      // Show the current color in different formats
      // Using the selected color: https://iro.js.org/guide.html#selected-color-api
      values.hex = color.hexString;
      values.rgb = color.rgb;
      values.hsl = color.hsl;
    });
    return [pickerInstance, values];
  }
}
