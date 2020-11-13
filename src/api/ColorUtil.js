import tinycolor from 'tinycolor2';

export default class ColorUtil {
  constructor() {
    this.tinycolor = tinycolor.bind(this);
  }

  // Create the color object from an input
  createColor(input) {
    return this.tinycolor(input);
  }

  // Spin the hue around the color wheel
  spinHue(input, amount) {
    const color = this.createColor(input);
    return color.spin(amount).toHexString();
  }

  // Get a randomly generated color in hex
  getRandom() {
    return this.tinycolor.random().toHexString();
  }

  // Get the complementary color in hex
  getComplementary(input) {
    const color = this.createColor(input);
    return color.complement().toHexString();
  }

  // Get the analogous colors in hex
  getAnalogous(input) {
    const color = this.createColor(input);
    return color.analogous()
      .map((c) => c.toHexString());
  }

  // Get the monochromatic colors in hex
  getMonochromatic(input) {
    const color = this.createColor(input);
    return color.monochromatic()
      .map((c) => c.toHexString());
  }

  // Get the splitcomplement colors in hex
  getSplitcomplement(input) {
    const color = this.createColor(input);
    return color.splitcomplement()
      .map((c) => c.toHexString());
  }

  // Get the triad colors in hex
  getTriad(input) {
    const color = this.createColor(input);
    return color.triad()
      .map((c) => c.toHexString());
  }

  getTetrad(input) {
    const color = this.createColor(input);
    return color.tetrad()
      .map((c) => c.toHexString());
  }
}
