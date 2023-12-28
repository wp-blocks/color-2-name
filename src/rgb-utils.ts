import {cleanDefinition, convertToInt8, limitValue, splitValues} from "./common";
import { RGBVALUE } from "./types";

export function fallbackRGB(rgb: string[], err?: string = `Invalid RGB color`): string[] {
  console.warn(err);
  return [rgb[0] ?? 0, rgb[1] ?? 0, rgb[2]];
}

export function safeRgbValues(rgb: string[]): RGBVALUE {
  return {
    r: Math.round(limitValue(parseFloat(rgb[0]), 0, 255)),
    g: Math.round(limitValue(parseFloat(rgb[1]), 0, 255)),
    b: Math.round(limitValue(parseFloat(rgb[2]), 0, 255)),
  };
}

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

    if (rgb.length !== 3 && rgb.length !== 4) {
      return fallbackRGB(rgb, `Too few values to define rgb: ${rgbAsString} -> ${rgbvalue}`)
    } else {
      return [rgb[0], rgb[1], rgb[2]];
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
  if (rgb.length !== 3 && rgb.length !== 4) {
    rgb = fallbackRGB(rgb, `Invalid rgb color: ${rgb.join(", ")}`)
  }

  // use the channel key as the new array key
  return {
    r: limitValue(Math.round(convertToInt8(rgb[0])), 0, 255) || 0,
    g: limitValue(Math.round(convertToInt8(rgb[1])), 0, 255) || 0,
    b: limitValue(Math.round(convertToInt8(rgb[2])), 0, 255) || 0,
  }
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
