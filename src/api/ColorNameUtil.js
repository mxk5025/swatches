import namedColors from 'color-name-list';
import nearestColor from 'nearest-color';

export default class ColorNameUtil {
  constructor() {
    this.namedColors = namedColors;
    this.nearestColors = nearestColor.from(namedColors.reduce(
      (o, { name, hex }) => Object.assign(o, { [name]: hex }), {},
    ));
  }

  getAllColors() {
    return this.namedColors;
  }

  // Get the exact matching color using a hex color code with '#' prepended
  getColor(hex) {
    return this.namedColors.find((color) => color.hex === hex);
  }

  // Get the exact hex from a color's name
  getHex(colorName) {
    return this.namedColors.find((color) => color.name === colorName);
  }

  // Get the nearest color using a hex color code with '#' prepended
  getNearestColor(hex) {
    return this.nearestColors(hex);
  }
}
