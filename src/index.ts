import colorSet from './data/colorSet'
import {BLACKANDWHITE, parseColor, rgbRegex, RGBSET} from './common'
import { valuesToHex } from './hex-utils'
import { getRgbValues, parseRgb } from './rgb-utils'

/**
 * Given a color string it returns the closest corresponding name of the color
 *
 * @param color
 * @param colorSet
 * @param args
 * @param args.colors
 *
 * @return {string} the corresponding color name
 */
function closest (
  color: colorString,
  set: RGBCOLORDEF[] | undefined = colorSet,
  ...args: any[ string | number ]
): COLORDEF | COLORDEFINFO {
  let closestGap = Number.MAX_SAFE_INTEGER
  const closestColor: COLORDEF = { name: 'error', color: '#F00' }

  if (set.length < 1) {
    return closestColor
  }

  const rgbColorValues = Object.values(parseColor(color))
  if (rgbColorValues.length > 2) {
    for (const tested of set) {
      const gap = distance(rgbColorValues as RGBDEF, tested, true)
      if (gap < closestGap) {
        closestGap = gap
        closestColor.name = tested[3]
        closestColor.color = `rgb(${tested[0]},${tested[1]},${tested[2]})`
      }

      // TODO: add a minimum acceptable value in order to speed up the calculation. for example #ff0001 should return red since is very very close to red
      if (gap === 0) {
        break
      }
    }
  }

  if (args?.length > 0) {
    if (args?.info !== null) {
      const rgbValue = parseColor(closestColor.color)
      const hexValue = valuesToHex(rgbValue as RGBVALUE)
      return { ...closestColor, hex: hexValue, gap: Math.sqrt(closestGap) }
    }
  }

  return closestColor
}

function isLight (color: colorString): boolean {
  return closest(color, BLACKANDWHITE).name === 'white'
}
function isDark (color: colorString): boolean {
  return closest(color, BLACKANDWHITE).name === 'black'
}

function isLightOrDark (color: colorString): string {
  return isLight(color) ? 'light' : 'dark'
}

function closestRGB (color: colorString): string {
  return closest(color, RGBSET).name
}

/**
 * Compute the distance between the two RGB values
 * There are two modes:
 * fast = true -> the distance is calculated without using the Euclidean formula completely, it is reliable but its result is exponential
 * fast = false -> the distance is calculated with the Euclidean formula, its result is linear
 *
 * @param rgb1
 * @param rgb2
 * @param fast - whether to calculate the distance without computing the square root, the result will be
 */
function distance (rgb1: RGBDEF, rgb2: RGBCOLORDEF, fast: boolean = false): number {
  return fast
    ? Math.pow(rgb2[0] - rgb1[0], 2) +
    Math.pow(rgb2[1] - rgb1[1], 2) +
    Math.pow(rgb2[2] - rgb1[2], 2)
    : Math.sqrt(
      Math.pow(rgb2[0] - rgb1[0], 2) +
        Math.pow(rgb2[1] - rgb1[1], 2) +
        Math.pow(rgb2[2] - rgb1[2], 2)
    )
}

/**
 * Given a color string it returns the hex representation
 *
 * @param rgbString
 *
 * @return {string} the corresponding color hex
 */
function rgbToHex (rgbString: RGB): HEX | Error {
  // if is a rgb string
  if (rgbRegex.test(rgbString)) {
    const rgb = parseRgb(rgbString)
    if (rgb.length > 0) {
      const RgbValues = getRgbValues(rgb)
      return valuesToHex(RgbValues)
    }
  }
  throw new Error(`Invalid color: ${rgbString}`)
}

export {
  colorSet,
  closest,
  rgbToHex,
  distance,
  isLight,
  isDark,
  isLightOrDark,
  closestRGB
}
