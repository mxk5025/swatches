import iro from '@jaames/iro';

export default class PickerCreator {
  constructor(pickerName) {
    this.pickerName = pickerName;
    this.pickerId = 0;
  }

  generate() {
    // Create a new color picker instance
    // https://iro.js.org/guide.html#getting-started
    var pickerInstance = new iro.ColorPicker('.' + this.pickerName + this.pickerId, {
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
    this.pickerId++;
    return [pickerInstance, values];
  }
}
