import { convertToInt8, rgbRegex, splitValues } from './common'

/**
 * Get the values of the rgb string
 *
 * @param rgbAsString - the rgb color as string split into values
 *
 * @return {Array} the values of the rgb string as Array of strings that represent the rgb color
 */
export function parseRgb (rgbAsString: string): string[] {
  const rgbvalue = rgbAsString.match(rgbRegex)
  if (rgbvalue != null) {
    const rgb: string[] = splitValues(rgbvalue[1])

    if (rgb.length >= 2) {
      return [
        rgb[0],
        rgb[1],
        rgb[2]
      ]
    }
  }
  throw new Error(`Can't parse rgb color: ${rgbAsString}`)
}

/**
 * This function takes an array of strings and returns and object with the rgb values converted into INT8 (0-255)
 *
 * @param {Array} rgb - rgb color as Array of strings
 *
 * @return {Object} an object that contains the r, g and b values as INT8
 */
export function getRgbValues (rgb: string[]): RGBVALUE {
  if (rgb.length >= 2) {
    return {
      r: convertToInt8(rgb[0]),
      g: convertToInt8(rgb[1]),
      b: convertToInt8(rgb[2])
    }
  }
  throw new Error(`Invalid rgb color: ${rgb.join(', ')}`)
}

/**
 * returns a string representation of the rgb values
 *
 * @param {Object} rgb the rgb color object
 *
 * @return {string} a string representation of the rgb values
 */
export function valuesToRgb (rgb: RGBVALUE): string {
  return `rgb(${rgb.r},${rgb.g},${rgb.b})`
}
