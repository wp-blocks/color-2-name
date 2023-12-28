// Regular expressions to match different color formats
import { RGBCOLORDEF } from "./types";

/** The maximum distance possible between colors */
export const MAXDISTANCE = 441.6729559300637;

/** A regex to match hex colors */
export const hexRegex: RegExp = /^#([\da-f]{3,8})/i;
/** A regex to match rgb colors */
export const rgbRegex: RegExp = /^rgba?\(([^)]+)\)/i;
/** A regex to match hsl colors */
export const hslRegex: RegExp = /^hsla?\(([^)]+)\)/i;
/** A regex to match strings that are only valid numbers with and without decimals and the number can be negative and without the 0 in the beginning  */
export const isNumeric: RegExp = /^-?\d*\.?\d+$/i;
/** Remove comments from string */
export const stripComments: RegExp = /(\/\*[^*]*\*\/)|(\/\/[^*]*)/g;

/**
 * This set is used to detect if the color is bright or dark
 *
 * @note the set has been corrected to get pure RGB values (eg. pure red, pure green) in the "bright" area
 */
export const BLACKANDWHITE: RGBCOLORDEF[] = [
  [255, 255, 255, "white"],
  [1, 1, 1, "black"],
];

/**
 * This set is used to detect the nearest rgb color
 */
export const RGBSET: RGBCOLORDEF[] = [
  [255, 0, 0, "red"],
  [0, 255, 0, "green"],
  [0, 0, 255, "blue"],
];

/**
 * split the content of rgb and hsl colors depending on the parsed value of the css property
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb#syntax
 *
 * @param {string} rawValues - the value inside the rgb(.*) css color definition
 *
 * @return {Array} the array of rgb values found inside the passed string
 */
export function splitValues(rawValues: string): string[] {
  return rawValues.split(rawValues.includes(",") ? "," : " ").map((s) => s.trim());
}

/**
 * If the value is an angle in degrees, convert it to the 0-360 range
 *
 * @param {string} angle - the degrees to convert into a number
 *
 * @return {number} the converted value
 */
export function normalizeDegrees(angle: string): number {
  // Strip label and convert to degrees (if necessary)
  let degAngle = parseFloat(angle) || 0;
  if (angle.indexOf("deg") > -1) {
    degAngle = parseFloat(angle.substring(0, angle.length - 3));
  } else if (angle.indexOf("rad") > -1) {
    degAngle = Math.round(parseFloat(angle.substring(0, angle.length - 3)) * (180 / Math.PI));
  } else if (angle.indexOf("turn") > -1) {
    degAngle = Math.round(parseFloat(angle.substring(0, angle.length - 4)) * 360);
  }

  while (degAngle < 0) {
    degAngle += 360;
  }

  // Make sure it's a number between 0 and 360
  if (degAngle >= 360) degAngle %= 360;

  return degAngle;
}

function limitValue(value: number, min: number = 0, max: number = 0): number {
  return Math.min(Math.max(Math.round(value), min), max);
}

export function calculateValue(valueString: string, multiplier: number): number {
  // Regular expression to match the calc() function and extract the numerical value
  const regex = /calc\(([^)]+)\)/;

  // Match the calc() function in the CSS string
  const match = valueString.match(regex);

  if (match) {
    // Extract the content inside the calc() function
    const calcContent = match[1];

    return convertToInt8(calcContent, multiplier);
  } else {
    // Return a default value or handle the case where calc() is not found
    return convertToInt8(valueString, multiplier);
  }
}

export function cleanDefinition(string: string): string {
  // Remove comments from the string
  const cleanString = string.replace(stripComments, "");

  // Find the positions of the first opening and the last closing parentheses
  const firstParenthesisIndex = cleanString.indexOf("(");
  const lastParenthesisIndex = cleanString.lastIndexOf(")");

  // Ensure both parentheses are found
  if (firstParenthesisIndex !== -1 && lastParenthesisIndex !== -1) {
    // Extract the content between the parentheses
    return cleanString.slice(firstParenthesisIndex + 1, lastParenthesisIndex).trim();
  } else {
    throw new Error(`Can't get the rgb color values: ${string}`);
  }
}

export function normalizePercentage(value: string, multiplier: number): number {
  return (parseFloat(value) / 100) * multiplier;
}

export function colorValueFallbacks(value: string, err?: string): number {
  if (value === "none") {
    throw new TypeError(err ?? "Invalid value " + value);
  }

  return 0;
}

/**
 * Takes a string with a css value that could be a number or percentage or an angle in degrees and returns the corresponding 8bit value
 *
 * @param {string} value - a valid value for the css color definition (like 255, "100%", "324deg", etc.) *
 * @param multiplier - the number that represent the maximum - default is 255 decimal - 100 hex
 *
 * @example convertToInt8('100%'); // 255
 *
 * @return {string} the corresponding value in 8-bit format
 */
export function convertToInt8(value: string, multiplier: number = 255): number {
  value = value.trim();
  if (isNumeric.test(value)) {
    // limit the min and the max value
    return limitValue(parseFloat(value) || 0, 0, multiplier);
  } else if (value.endsWith("%")) {
    // If the value is a percentage, divide it by 100 to get a value from 0 to 1
    // and then multiply it by 255 to get a value from 0 to 255
    return normalizePercentage(value, multiplier) || 0;
  } else if (value.endsWith("deg") || value.endsWith("rad") || value.endsWith("turn")) {
    return normalizeDegrees(value);
  } else if (value === "none" || value === "-infinity" || value === "NaN" || value === "transparent" || value === "currentColor") {
    return colorValueFallbacks(value);
  } else if (value === "infinity") {
    return 255;
  } else if (value.startsWith("calc")) {
    // get the value from the calc function
    return limitValue(calculateValue(value, multiplier), 0, multiplier);
  } else {
    // If the value is not a percentage or an angle in degrees, it is invalid
    throw new Error(`Invalid value: ${value}`);
  }
}
