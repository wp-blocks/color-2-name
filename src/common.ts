// Regular expressions to match different color formats
import {hexToRgb, parseHex} from './hex-utils'
import { getRgbValues, parseRgb } from './rgb-utils'
import { hslToRgb, parseHsl } from './hsl-utils'

export const MAXDISTANCE = 441.6729559300637

export const hexRegex = /^#([\da-f]{6,}|[\da-f]{3,})/i
export const rgbRegex = /^rgba?\(([^)]+)\)/i
export const hslRegex = /^hsla?\(([^)]+)\)/i
export const isNumeric = /^[0-9]*$/

/**
 * split the content of rgb and hsl colors depending on the parsed value of the css property
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb#syntax
 *
 * @param rawValues
 */
export function splitValues (rawValues: string): string[] {
  if (rawValues.includes(',')) {
    return rawValues.split(/[,\\/]/).map(val => val.trim())
  }

  return rawValues.split(/[ \\/]/).map(val => val.trim()).filter(Boolean)
}

/**
 * takes a string with a css value that could be a number or percentage or an angle in degrees and returns the corresponding 8bit value
 *
 * @param value
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
    // If the value is an angle in degrees, convert it to the 0-360 range
    // and then divide it by 360 to get a value from 0 to 1
    // and then multiply it by 255 to get a value from 0 to 255
    let angle = parseFloat(value)
    while (angle < 0) {
      angle += 360
    }
    while (angle > 360) {
      angle -= 360
    }
    return angle / 360 * multiplier
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
 * @param colorString
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
