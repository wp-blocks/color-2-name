import cssColorSet from './data/cssColorSet'
import { parseColor } from './common'
import { RgbValuesToHex } from './hex-utils'

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
  colorSet: RGBCOLORDEF[] | undefined = cssColorSet,
  ...args: any[ string | number ]
): COLORDEF | COLORDEFINFO {
  let closestGap = Number.MAX_SAFE_INTEGER
  const closestColor: COLORDEF = { name: 'error', color: '#F00' }

  if (colorSet.length < 1) {
    return closestColor
  }

  const rgbColorValues = Object.values(parseColor(color))
  if (rgbColorValues.length > 2) {
    for (const tested of colorSet) {
      const gap = distance(rgbColorValues as RGBDEF, tested)
      if (gap < closestGap) {
        closestGap = gap
        closestColor.name = tested[3]
        closestColor.color = `rgb(${tested[0]},${tested[1]},${tested[2]})`
      }

      if (gap === 0) {
        break
      }
    }
  }

  if (args?.length > 0) {
    if (args?.info !== null) {
      const rgbValue = parseColor(closestColor.color)
      const hexValue = RgbValuesToHex(rgbValue as RGBVALUE)
      return { ...closestColor, hex: hexValue, gap: closestGap }
    }
  }

  return closestColor
}

/**
 * Calculate the distance between the two RGB values
 * it's possible to remove the square root but the result will be result^2
 * Since nowadays the difference of time to calc a square root or not is almost indifferent, I preferred to keep the result more accurate.
 *
 * @param rgb1
 * @param rgb2
 */
function distance (rgb1: RGBDEF, rgb2: RGBCOLORDEF): number {
  return Math.sqrt(
    Math.pow(rgb2[0] - rgb1[0], 2) +
        Math.pow(rgb2[1] - rgb1[1], 2) +
        Math.pow(rgb2[2] - rgb1[2], 2)
  )
}

export {
  cssColorSet,
  closest,
  distance
}
