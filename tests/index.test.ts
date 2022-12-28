import cssColorSet from '../src/data/cssColorSet'

import { closest, distance, rgbToHex } from '../src'
import { hexToRgb, parseHex, shortHexToLongHex } from '../src/hex-utils'
import {convertToInt8, parseColor} from '../src/common'
import { parseRgb } from "../src/rgb-utils";

describe('Main ColorSet functions', () => {

  it('Returns the correct numbers of color', () => {
    expect(cssColorSet.length).toBeGreaterThan(140)
  })

  // it('Can rebuild the original Color Set', () => {
  //   expect( buildColorSet( hexColorSet ) ).toMatchObject(RgbColorSet)
  // })

})

describe('Color Conversions functions', () => {
  it('Returns the correct distance between colors', () => {
    expect(distance([0, 0, 0], [255, 255, 255, 'White'])).toBeGreaterThan(400)
    expect(distance([255, 255, 255], [255, 255, 255, 'White'])).toBe(0)
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
  })

  it('Returns an Object with the HEX values r g b given a color in hex notation', () => {
    expect(parseHex('#000')).toMatchObject(['00', '00', '00'])
    expect(parseHex('#FF0000')).toMatchObject(['FF', '00', '00'])
    expect(parseHex('#1234ab')).toMatchObject(['12', '34', 'AB'])
    expect(parseHex('#123')).toMatchObject(['11', '22', '33'])
  })

  it('Returns transformation of the hex object into a RGB object', () => {
    expect(hexToRgb(['0', '0', '0'])).toMatchObject({ r: 0, g: 0, b: 0 })
    expect(hexToRgb(['FF', '00', '00'])).toMatchObject({ r: 255, g: 0, b: 0 })
    expect(hexToRgb(['FF', 'FF', 'FF'])).toMatchObject({ r: 255, g: 255, b: 255 })
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
