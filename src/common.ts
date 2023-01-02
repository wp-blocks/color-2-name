// Regular expressions to match different color formats
import { hexToRgb, parseHex } from './hex-utils'
import { getRgbValues, parseRgb } from './rgb-utils'
import { hslToRgb, parseHsl } from './hsl-utils'

/** The maximum distance possible between colors */
export const MAXDISTANCE = 441.6729559300637

/** A regex to match hex colors */
export const hexRegex = /^#([\da-f]{6,}|[\da-f]{3,})/i
/** A regex to match rgb colors */
export const rgbRegex = /^rgba?\(([^)]+)\)/i
/** A regex to match hsl colors */
export const hslRegex = /^hsla?\(([^)]+)\)/i
/** A regex to match strings that are only int numbers */
export const isNumeric = /^[0-9]*$/

/**
 * This set is used in order to detect if the color is bright or dark
 *
 * @note the set has been corrected to get pure RGB values (eg. pure red, pure green) in the "bright" area
 */
export const BLACKANDWHITE: RGBCOLORDEF[] = [
  [255, 255, 255, 'white'],
  [1, 1, 1, 'black']
]

/**
 * This set is used in order to detect the nearest rgb color
 */
export const RGBSET: RGBCOLORDEF[] = [
  [255, 0, 0, 'red'],
  [0, 255, 0, 'green'],
  [0, 0, 255, 'blue']
]

/**
 * split the content of rgb and hsl colors depending on the parsed value of the css property
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb#syntax
 *
 * @param {string} rawValues - the value inside the rgb(.*) css color definition
 *
 * @return {Array} the array of rgb values finded inside the passed string
 */
export function splitValues (rawValues: string): string[] {
  if (rawValues.includes(',')) {
    return rawValues.split(/[,\\/]/).map(val => val.trim())
  }

  return rawValues.split(/[ \\/]/).map(val => val.trim()).filter(Boolean)
}

/**
 * If the value is an angle in degrees, convert it to the 0-360 range
 *
 * @param {string} value - the degrees to convert into a number
 * @param {number} multiplier - the number that represent the maximum - default is 100
 *
 * @return {number} the converted value
 */
export function normalizeDegree (value: string, multiplier: number = 360): number {
  let angle = parseFloat(value)
  while (angle < 0) {
    angle += 360
  }
  while (angle > 360) {
    angle -= 360
  }
  return (angle / 360) * multiplier
}

/**
 * Takes a string with a css value that could be a number or percentage or an angle in degrees and returns the corresponding 8bit value
 *
 * @param {string} value - a valid value for the css color definition (like 255, "100%", "324deg", etc)
 * @param {string} value - a valid value for the css color definition (like 255, "100%", "324deg", etc)
 *
 * @example convertToInt8('100%'); // 255
 *
 * @return {string} the corresponding value in 8 bit format
 */
export function convertToInt8 (value: string, multiplier: number = 255): number {
  value = value.trim()
  if (isNumeric.test(value)) {
    // If the value is an int number return it as number
    return parseInt(value, 10)
  } else if (value.endsWith('%')) {
    // If the value is a percentage, divide it by 100 to get a value from 0 to 1
    // and then multiply it by 255 to get a value from 0 to 255
    return parseFloat(value) / 100 * multiplier
  } else if (value.endsWith('deg')) {
    return normalizeDegree(value, 255)
  } else {
    // If the value is not a percentage or an angle in degrees, it is invalid
    throw new Error(`Invalid value: ${value}`)
  }
}

/**
 * This function takes a string representing a color (color) and uses regular expressions to check if it matches any of the following formats: hex, hex+alpha, RGB, RGBA, HSL, or HSLA.
 * If the color string matches one of these formats, the function returns an object with the type of color and the value of the color.
 * If the color string does not match any of the formats, the function throws an error.
 *
 * @param {string} colorString - the color string to test and convert to rgb values
 *
 * @return {Object|Error} the object with rgb values of that color
 */
export function parseColor (colorString: colorString | string): RGBVALUE | Error {
  // Check if the color string matches any of the regular expressions
  if (hexRegex.test(colorString)) {
    const hex = parseHex(colorString as HEX)
    if (hex.length > 0) {
      return hexToRgb(hex)
    }
  } else if (rgbRegex.test(colorString)) {
    const rgb = parseRgb(colorString as RGB)
    if (rgb.length > 0) {
      return getRgbValues(rgb)
    }
  } else if (hslRegex.test(colorString)) {
    const hsl = parseHsl(colorString as HSL)
    if (hsl.length > 0) {
      return hslToRgb(hsl)
    }
  }

  // If the color string does not match any of the regular expressions, return an error
  throw new Error(`Invalid color: ${colorString}`)
}
