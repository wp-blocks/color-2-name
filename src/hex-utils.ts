/**
 * It returns an object with the hex values of the 3 digit hex color
 *
 * @param {string} value 3 digit hex
 * @return {string[]} 6 digit hex
 */
export function shortHexToLongHex (value: string): string[] {
  // split the string in to an array of digits then return an array that contains that digit doubled for each item
  return [...value].map((v: string) => (v + v).toUpperCase())
}

/**
 *
 * @param value
 */
export function parseHex (value: colorString): string[] {
  // remove # at the beginning of the hex color
  const hexColor: string = value.substring(1)

  /**
   * then if the number of digits is greater than 2 (so it's something like 123 or abc456)
   * breakdown the string into an object that contains the r g and b values in hex
   */
  if (hexColor.length > 2) {
    if (hexColor.length === 3) {
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

/**
* Convert rgb values to hex color
*
* @param {Object} rgb an object with the rgb values
*/
export function RgbValuesToHex (rgb: RGBVALUE): HEX {
  // Extract the RGB values from the hex string
  if (rgb?.r !== null && rgb?.g !== null && rgb?.b !== null) {
    return `#${rgb?.r.toString(16)}${rgb?.g.toString(16)}${rgb?.b.toString(16)}`
  }
  return '#errorr'
}
