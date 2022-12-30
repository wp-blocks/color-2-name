/**
 * It returns an object with the hex values of the 3 digit hex color
 *
 * @param {string} value 3 digit hex
 * @return {string[]} 6 digit hex
 */
export function shortHexToLongHex (value: string): string[] {
  // split the string in to an array of digits then return an array that contains that digit doubled for each item
  return Array.from(value).map((v: string) => (v + v).toUpperCase())
}

/**
 *
 * @param value
 */
export function parseHex (value: colorString): string[] {
  // remove # at the beginning of the hex color
  const hexColor: string = (Array.from(value)[0] === '#') ? value.substring(1) : value

  /**
   * then if the number of digits is greater than 2 (so it's something like 123 or abc456)
   * breakdown the string into an object that contains the r g and b values in hex
   */
  if (hexColor.length > 2) {
    if (hexColor.length < 6) { // >=6 is the long notation
      return shortHexToLongHex(hexColor)
    } else {
      const hex = hexColor.match(/../g)
      return (hex != null) ? [hex[0].toUpperCase(), hex[1].toUpperCase(), hex[2].toUpperCase()] : []
    }
  }

  return []
}

/**
 * Convert a Hex color to rgb
 *
 * @param {string} hex without the "#"
 */
export function hexToRgb (hex: string[]): RGBVALUE | Error {
  // Extract the RGB values from the hex string
  if (hex.length >= 2) {
    return {
      r: parseInt(hex[0], 16),
      g: parseInt(hex[1], 16),
      b: parseInt(hex[2], 16)
    }
  }
  throw new Error(`Invalid Hex color: ${hex.join(', ')}`)
}

export function toHex (int8: number): string {
  return int8.toString(16).padStart(2, '0')
}

/**
* Convert rgb values to hex color
*
* @param {Object} rgb an object with the rgb values
*/
export function valuesToHex (rgb: RGBVALUE): HEX {
  // Extract the RGB values from the hex string
  if (
    typeof rgb?.r === 'number' &&
    typeof rgb?.g === 'number' &&
    typeof rgb?.b === 'number') {
    return `#${toHex(rgb?.r)}${toHex(rgb?.g)}${toHex(rgb?.b)}`
  }
  return '#errorr'
}
