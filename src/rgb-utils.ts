import { cleanDefinition, convertToInt8, splitValues } from "./common";
import { RGBVALUE } from "./types";

/**
 * Get the values of the rgb string
 *
 * @param rgbAsString - the rgb color as string split into values
 *
 * @return {Array} the values of the rgb string as Array of strings that represent the rgb color
 */
export function parseRgb(rgbAsString: string): string[] {
  const rgbvalue = cleanDefinition(rgbAsString);

  if (rgbvalue !== null) {
    const rgb: string[] = splitValues(rgbvalue);

    if (rgb.length >= 2) {
      return [rgb[0], rgb[1], rgb[2]];
    } else {
      throw new Error(`Too few values to define rgb: ${rgbAsString} -> ${rgbvalue}`);
    }
  }
  throw new Error(`Can't parse rgb color: ${rgbAsString} -> ${rgbvalue}`);
}

/**
 * This function takes an array of strings and returns and object with the rgb values converted into INT8 (0-255)
 *
 * @param {Array} rgb - rgb color as Array of strings
 *
 * @return {Object} an object that contains the r, g and b values as INT8
 */
export function getRgbValues(rgb: string[]): RGBVALUE {
  if (rgb.length >= 2) {
    return {
      r: Math.round(convertToInt8(rgb[0])),
      g: Math.round(convertToInt8(rgb[1])),
      b: Math.round(convertToInt8(rgb[2])),
    };
  }
  throw new Error(`Invalid rgb color: ${rgb.join(", ")}`);
}

/**
 * returns a string representation of the rgb values
 *
 * @param {Object} rgb the rgb color object
 *
 * @return {string} a string representation of the rgb values
 */
export function RGB(rgb: RGBVALUE): string {
  return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
}
