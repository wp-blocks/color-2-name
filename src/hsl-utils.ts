import { convertToInt8, hslRegex, splitValues } from './common'

/**
 *
 * @param value
 */
export function parseHsl (hslAsString: string): string[] {
  const hslvalue = hslAsString.match(hslRegex)
  if (hslvalue != null) {
    const hsl: string[] = splitValues(hslvalue[1])

    if (hsl.length >= 2) {
      return [
        hsl[0],
        hsl[1],
        hsl[2]
      ]
    }
  }
  throw new Error(`Can't parse hsl color: ${hslAsString}`)
}

export function getHslValues (hsl: string[]): HSLVALUE {
  if (hsl.length >= 2) {
    return {
      h: convertToInt8(hsl[0]),
      s: convertToInt8(hsl[1], 100),
      l: convertToInt8(hsl[2], 100)
    }
  }
  throw new Error(`Invalid hsl color: ${hsl.join(', ')}`)
}

/**
 * Parses an array of HSL values and the related RGB value
 *
 * @param hsl the HSL value to parse
 * @return {Object} rgb value
 */
export function hslToRgb (hsl: string[]): RGBVALUE {
  if (hsl === null || hsl.length < 2) {
    throw new Error(`Invalid hsl color: ${hsl.join(', ')}`)
  }

  let {
    h,
    s,
    l
  } = getHslValues(hsl)

  // Must be fractions of 1
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x
  }
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return { r, g, b }
}
