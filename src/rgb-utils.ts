import { convertToInt8, rgbRegex, splitValues } from './common'

/**
 *
 * @param rgbAsString - the rgb color as string to convert
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
 *
 * @param rgb - rgb value
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

export function valuesToRgb (rgb: RGBVALUE): string {
  return `rgb(${rgb.r},${rgb.g},${rgb.b})`
}
