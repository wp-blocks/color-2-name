import colorSet from '../src/data/colorSet'

import { closest, distance, rgbToHex } from '../src'
import {hexToRgb, parseHex, shortHexToLongHex, toHex} from '../src/hex-utils'
import {convertToInt8, MAXDISTANCE, parseColor} from '../src/common'
import {parseRgb, valuesToRgb} from "../src/rgb-utils";
import {hslToRgb, parseHsl} from "../src/hsl-utils";
import getColor from "../src/color-utils";

describe('Main ColorSet functions', () => {

  it('Returns the correct numbers of color', () => {
    expect(colorSet.length).toBeGreaterThan(140)
  })

  // it('Can rebuild the original Color Set', () => {
  //   expect( buildColorSet( hexColorSet ) ).toMatchObject(RgbColorSet)
  // })

})

describe('Color Conversions functions', () => {
  it('Returns the correct distance between colors', () => {
    // default args
    expect(distance([0, 0, 0], [255, 255, 255, 'White'])).toBeCloseTo(MAXDISTANCE, 10)
    expect(distance([255, 255, 255], [255, 255, 255, 'White'])).toBe(0)
    // fast calculation
    expect(distance([255, 255, 255], [255, 255, 255, 'White'], true)).toBe(0)
    expect(distance([0, 0, 0], [255, 255, 255, 'White'], true)).toBe(195075)

    // this need to return the same distance as the first test, since the fast mode is exponential
    expect(
      Math.sqrt(
        distance([0, 0, 0], [255, 255, 255, 'White'], true)
      )
    ).toBeCloseTo(MAXDISTANCE, 10)
  })

  it('Returns the correct name of the color', () => {
    expect(closest('#000000')).toMatchObject({ name: 'black', color: 'rgb(0,0,0)' })
    expect(closest('#ff0000')).toMatchObject({ name: 'red', color: 'rgb(255,0,0)' })
    expect(closest('#ffffff')).toMatchObject({ name: 'white', color: 'rgb(255,255,255)' })
    expect(closest('#fffffe')).toMatchObject({ name: 'white', color: 'rgb(255,255,255)' })
    expect(closest('rgb(255,255,255)')).toMatchObject({ name: 'white', color: 'rgb(255,255,255)' })
    expect(closest('rgba(255,255,255,0.1)')).toMatchObject({ name: 'white', color: 'rgb(255,255,255)' })
    expect(closest('rgba(255,255,255,.1)')).toMatchObject({ name: 'white', color: 'rgb(255,255,255)' })
    expect(closest('rgba(255 255 255 /.1)')).toMatchObject({ name: 'white', color: 'rgb(255,255,255)' })
    expect(closest('hsl(255,0deg,100%,.1)')).toMatchObject({ name: 'white', color: 'rgb(255,255,255)' })
  })
})

/**
 * COMMON FUNCTIONS TESTING:
 */
describe('COMMON', () => {

  // HEX
  it('Returns the correct rgb representation of the given HEX color', () => {
    expect(parseColor('#000')).toMatchObject({r: 0, g: 0, b: 0})
    expect(parseColor('#000000')).toMatchObject({r: 0, g: 0, b: 0})
    expect(parseColor('#ff0000')).toMatchObject({r: 255, g: 0, b: 0})
    expect(parseColor('#f00')).toMatchObject({r: 255, g: 0, b: 0})
    expect(parseColor('#ffffff')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('#fff')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('#ffff')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('#fffff')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('#fffffff')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('#ffffffffffffffffffffffffffff')).toMatchObject({r: 255, g: 255, b: 255})
  })

  // RGB
  it('Returns the correct rgb representation of the given RGB color', () => {
    expect(parseColor('rgb(255,255,255)')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('rgb(255, 255, 255,.5)')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('rgb(255 255 255)')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('rgb(255 255 255 / .5)')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('rgba(255 255 255 / 0.1)')).toMatchObject({r: 255, g: 255, b: 255})
  })

  // HSL
  it('Returns the correct rgb representation of the given HSL color', () => {
    expect(parseColor('hsl(0,0%,100%)')).toMatchObject({ r: 255, g: 255, b: 255 })
    expect(parseColor('hsl(255,100%,100%)')).toMatchObject({ r: 255, g: 255, b: 255 })
    expect(parseColor('hsl(0,100%,100%)')).toMatchObject({ r: 255, g: 255, b: 255 })
    expect(parseColor('hsl(127,100%,100%)')).toMatchObject({ r: 255, g: 255, b: 255 })
  })

  it('Returns the INT8 value of the css value', () => {
    expect(convertToInt8('0')).toBe(0)
    expect(convertToInt8('100')).toBe(100)
    expect(convertToInt8('0%')).toBe(0)
    expect(convertToInt8('100%')).toBe(255)
    expect(convertToInt8('0deg')).toBe(0)
    expect(convertToInt8('180deg')).toBe(127.5)
    expect(convertToInt8('360deg')).toBe(255)
  })

  it('Returns convert rgb values to hex', () => {
    expect(rgbToHex('rgb(255,255,255)')).toBe("#ffffff")
    expect(rgbToHex('rgb(255, 255, 255,.5)')).toBe("#ffffff")
    expect(rgbToHex('rgb(255 255 255)')).toBe("#ffffff")
    expect(rgbToHex('rgb(255 255 255 / .5)')).toBe("#ffffff")
    expect(rgbToHex('rgba(255 255 255 / 0.1)')).toBe("#ffffff")
  })
})

/**
 * HEX FUNCTIONS TESTING:
 */
describe('HEX', () => {
  it('Returns an Object with the triplets of hex color values', () => {
    expect(shortHexToLongHex('')).toMatchObject([])
    expect(shortHexToLongHex('00')).toMatchObject(['00', '00'])
    expect(shortHexToLongHex('000')).toMatchObject(['00', '00', '00'])
    expect(shortHexToLongHex('0000')).toMatchObject(['00', '00', '00', '00'])
    expect(shortHexToLongHex('F00')).toMatchObject(['FF', '00', '00'])
    expect(shortHexToLongHex('123')).toMatchObject(['11', '22', '33'])
    expect(shortHexToLongHex('123')).toMatchObject(['11', '22', '33'])
  })

  it('Returns an Object with the HEX values r g b given a color in hex notation', () => {
    expect(parseHex('#000')).toMatchObject(['00', '00', '00'])
    expect(parseHex('#FF0000')).toMatchObject(['FF', '00', '00'])
    expect(parseHex('#1234ab')).toMatchObject(['12', '34', 'AB'])
    expect(parseHex('#123')).toMatchObject(['11', '22', '33'])
    expect(parseHex('#1234')).toMatchObject(['11', '22', '33', '44'])
  })

  it('Returns transformation of the hex object into a RGB object', () => {
    expect(hexToRgb(['0', '0', '0'])).toMatchObject({ r: 0, g: 0, b: 0 })
    expect(hexToRgb(['FF', '00', '00'])).toMatchObject({ r: 255, g: 0, b: 0 })
    expect(hexToRgb(['FF', 'FF', 'FF'])).toMatchObject({ r: 255, g: 255, b: 255 })
  })

  it('Return the int8 to hex conversion', () => {
    expect(toHex(0)).toBe("00")
    expect(toHex(127)).toBe("7f")
    expect(toHex(255)).toBe("ff" )
  })
})


/**
 * RGB FUNCTIONS TESTING:
 */
describe('RGB', () => {
  it('Returns an Object with the r,g and b color values of a rgb color', () => {
    expect(parseRgb('rgb(0,0,0)')).toMatchObject(['0', '0', '0'])
    expect(parseRgb('rgb(255,255,255)')).toMatchObject(['255', '255', '255'])
    expect(parseRgb('rgb(255,255,255,1)')).toMatchObject(['255', '255', '255'])
    expect(parseRgb('rgba(255,255,255,1)')).toMatchObject(['255', '255', '255'])
    expect(parseRgb('rgb(50%,100%,100%,1)')).toMatchObject(['50%', '100%', '100%'])
  })
})

/**
 * HSL FUNCTIONS TESTING:
 */
describe('HSL', () => {
  it('Returns an Object with the r,g and b color values of a rgb color', () => {

    expect(
      valuesToRgb(
        hslToRgb(
          parseHsl('hsl(0,0%,100%)')
        )
      )
      ).toBe('rgb(255,255,255)')

    expect(
      valuesToRgb(
        hslToRgb(
          parseHsl('hsl(255,100%,100%)')
        )
      )
      ).toBe('rgb(255,255,255)')

    expect(
      valuesToRgb(
        hslToRgb(
          parseHsl('hsl(0,100%,100%)')
        )
      )
      ).toBe('rgb(255,255,255)')

    expect(
      valuesToRgb(
        hslToRgb(
          parseHsl('hsl(127,100%,100%)')
        )
      )
      ).toBe('rgb(255,255,255)')
  })
})

describe('name-2-color', () => {
  it('Returns an Object with the hex, rgb and hsl value of the color (by name)', () => {
    expect( getColor('white') ).toMatchObject({"hex": "#ffffff", "hsl": "hsl(0,0%,100%)", "rgb": "rgb(255,255,255)"})
    expect( getColor('red') ).toMatchObject({"hex": "#ff0000", "hsl": "hsl(0,100%,50%)", "rgb": "rgb(255,0,0)"})
    expect( getColor('tomato') ).toMatchObject({"hex": "#ff6347", "hsl": "hsl(9,100%,63.9%)", "rgb": "rgb(255,99,71)"})
    expect( getColor('yellowgreen') ).toMatchObject({"hex": "#9acd32", "hsl": "hsl(80,60.8%,50%)", "rgb": "rgb(154,205,50)"})
    expect( getColor('greenyellow') ).toMatchObject({"hex": "#adff2f", "hsl": "hsl(84,100%,59.2%)", "rgb": "rgb(173,255,47)"})
    expect( getColor('darkblue') ).toMatchObject({"hex": "#00008b", "hsl": "hsl(240,100%,27.3%)", "rgb": "rgb(0,0,139)"})
  } )
} )
