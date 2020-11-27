// Wrapper for color manipulation libraries
import tinycolor from 'tinycolor2';

// Create the color object from an input
function createColor(input) {
  return tinycolor(input);
}

// Spin the hue around the color wheel
export function spinHue(input, amount) {
  const color = createColor(input);
  return color.spin(amount).toHexString();
}

// Get a randomly generated color in hex
export function random() {
  return tinycolor.random().toHexString();
}

// Get the complementary color in hex
export function complementary(input) {
  const color = createColor(input);
  return color.complement().toHexString();
}

// Get the analogous colors in hex
export function analogous(input) {
  const color = createColor(input);
  return color.analogous()
    .map((c) => c.toHexString());
}

// Get the monochromatic colors in hex
export function monochromatic(input) {
  const color = createColor(input);
  return color.monochromatic()
    .map((c) => c.toHexString());
}

// Get the split complement colors in hex
export function splitComplement(input) {
  const color = createColor(input);
  return color.splitcomplement()
    .map((c) => c.toHexString());
}

// Get the triad colors in hex
export function triad(input) {
  const color = createColor(input);
  return color.triad()
    .map((c) => c.toHexString());
}

// Get the tetrad colors in hex
export function tetrad(input) {
  const color = createColor(input);
  return color.tetrad()
    .map((c) => c.toHexString());
}

export default {
  spinHue,
  random,
  complementary,
  analogous,
  monochromatic,
  splitComplement,
  triad,
  tetrad,
};
