import { COLORSTRING, HEX, RGBVALUE } from "./types";

/**
 * It returns an object with the hex values of the 3 digit hex color
 *
 * @param {string} value 3 digit hex
 * @return {string[]} 6 digit hex
 */
export function shortHexToLongHex(value: string): string[] {
  // split the string in to an array of digits then return an array that contains that digit doubled for each item
  return Array.from(value).map((v: string) => (v + v).toUpperCase());
}

export function isHex(num: string): boolean {
  return Boolean(num.match(/^[0-9a-f]+$/i));
}

/**
 * Get the hex value of the color and convert it to an Object of R G And B values (still in hex format)
 *
 * @param value the string that contains the color in hex format
 *
 * @return {string[]} an array of 6 digit hex values in a triplet of R G and B (HEX format)
 */
export function parseHex(value: COLORSTRING): string[] {
  // remove # at the beginning of the hex color
  const hexColor: string = Array.from(value)[0] === "#" ? value.substring(1) : value;

  /**
   * then if the number of digits is greater than 2 (so it's something like 123 or abc456)
   * breakdown the string into an object that contains the r g and b values in hex
   */
  let hexArray: string[] = [];
  if (hexColor.length) {
    if (hexColor.length === 3 || hexColor.length === 4) {
      hexArray = shortHexToLongHex(hexColor);
    } else if (hexColor.length === 6 || hexColor.length === 8) {
      // match the hex value in groups of 2
      hexArray = hexColor.match(/../g)?.map((value) => value) ?? [];
    }
  }

  if (hexArray.length) {
    hexArray?.forEach((value, index) => {
      if (isHex(value)) {
        hexArray[index] = value.toUpperCase();
      } else {
        throw new Error(`Invalid Hex value: ${value}`);
      }
    });

    return hexArray;
  }

  throw new Error(`Invalid Hex: ${value}`);
}

/**
 * Converts a Hex color to rgb
 *
 * @param {string} hex a tuple of hex values
 *
 * @return {string} the rgb color values for the given hex color
 */
export function hexToRgb(hex: string[]): RGBVALUE {
  // Extract the RGB values from the hex string
  if (hex.length >= 2) {
    return {
      r: parseInt(hex[0], 16),
      g: parseInt(hex[1], 16),
      b: parseInt(hex[2], 16),
    };
  }
  throw new Error(`Invalid Hex color: ${hex.join(", ")}`);
}

/**
 * Convert a INT8 value to HEX
 *
 * @param {number} int8 - the integer value to convert
 *
 * @return {string} the hex string
 */
export function toHex(int8: number): string {
  return int8.toString(16).padStart(2, "0");
}

/**
 * Convert rgb values to hex color
 *
 * @param {Object} rgb an object with the rgb values
 *
 * @return {string} the hex string
 */
export function valuesToHex(rgb: RGBVALUE): HEX {
  // Extract the RGB values from the hex string
  if (typeof rgb?.r === "number" && typeof rgb?.g === "number" && typeof rgb?.b === "number") {
    return `#${toHex(rgb?.r)}${toHex(rgb?.g)}${toHex(rgb?.b)}`;
  }
  return "#errorr";
}
