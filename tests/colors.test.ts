/**
 * COMMON FUNCTIONS TESTING:
 */
import {convertToInt8, parseColor} from "../src/common";
import {hexToRgb, parseHex, shortHexToLongHex, toHex, valuesToHex} from "../src/hex-utils";
import {getRgbValues, parseRgb, valuesToRgb} from "../src/rgb-utils";
import {getHslValues, hslToRgb, parseHsl} from "../src/hsl-utils";


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
    expect(() => parseColor('blue')).toThrowError()
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
    expect(convertToInt8('720deg')).toBe(255)
    expect(convertToInt8('-360deg')).toBe(0)
    expect(() => convertToInt8('five')).toThrowError()
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
    expect(parseHex('#00')).toMatchObject([])
    expect(parseHex('#')).toMatchObject([])
    expect(parseHex('000')).toMatchObject(['00', '00', '00'])
  })

  it('Returns transformation of the hex object into a RGB object', () => {
    expect(hexToRgb(['0', '0', '0'])).toMatchObject({ r: 0, g: 0, b: 0 })
    expect(hexToRgb(['FF', '00', '00'])).toMatchObject({ r: 255, g: 0, b: 0 })
    expect(hexToRgb(['FF', 'FF', 'FF'])).toMatchObject({ r: 255, g: 255, b: 255 })
    expect(() => hexToRgb(['FFFFFF'])).toThrowError()
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

  it('Returns an array with the rgb values given a rgb string of a css color', () => {
    expect(parseRgb('rgb(0,0,0, 0.1)')).toMatchObject(["0","0","0"])
    expect(parseRgb('rgb(100% 100% 100%)')).toMatchObject(["100%","100%","100%"])
    expect(parseRgb('rgb(160 160 160 / .55)')).toMatchObject(["160","160","160"])
    expect(() => parseRgb('hsl(50%,100%,100%,1)')).toThrowError()
    expect(() => parseRgb('#000')).toThrowError()
  })

  it('Returns an Object with the rgb int8 values given and array of values', () => {
    expect(getRgbValues(["0","0","0"])).toMatchObject({r: 0, g: 0, b: 0})
    expect(() => getRgbValues(["0"])).toThrowError("Invalid rgb color: 0")
  })

  it('Returns an hex values given a rgb values', () => {
    expect(valuesToHex({ r: 0, g: 0, b: 0 })).toBe("#000000")
    expect(valuesToHex({ r: 0, g: 0, b: 'a' })).toBe('#errorr')
    expect(valuesToHex({ r: 0, g: '0', b: 255 })).toBe('#errorr')
    expect(valuesToHex({ r: 'asd' })).toBe('#errorr')
    expect(valuesToHex({ b: false })).toBe('#errorr')
    expect(valuesToHex({ g: undefined })).toBe('#errorr')
  })
})

/**
 * HSL FUNCTIONS TESTING:
 */
describe('HSL', () => {
  it('Returns an Object with the r,g and b color values of a hsl color', () => {
    expect(
      valuesToRgb(hslToRgb(parseHsl('hsl(0,0%,100%)')))
    ).toBe('rgb(255,255,255)')

    expect(
      valuesToRgb(hslToRgb(parseHsl('hsl(60,100%,100%)')))
    ).toBe('rgb(255,255,255)')

    expect(
      valuesToRgb(hslToRgb(parseHsl('hsl(120,100%,100%)')))
    ).toBe('rgb(255,255,255)')

    expect(
      valuesToRgb(hslToRgb(parseHsl('hsl(180,100%,100%)')))
    ).toBe('rgb(255,255,255)')

    expect(
      valuesToRgb(hslToRgb(parseHsl('hsl(240,33%,38%)')))
    ).toBe('rgb(65,65,129)')

    expect(
      valuesToRgb(hslToRgb(parseHsl('hsl(300,66%,66%)')))
    ).toBe('rgb(226,111,226)')

    expect(
      () => valuesToRgb(
        hslToRgb(parseHsl('rgb(100%,100%,100%)'))
      )
    ).toThrowError()
  })

  it('Returns an Object with the r,g and b color values of a hsl color', () => {
    expect(
      getHslValues(["255", "100%", "100%"])
    ).toMatchObject({h:255, s:100, l:100})

    expect(
      () => getHslValues(["100"])
    ).toThrowError()
  })

  it('Returns an Object with the r,g and b color values of a hsl color', () => {
    expect(
      hslToRgb(["255", "100%", "100%"])
    ).toMatchObject({r:255, g:255, b:255})

    expect(
      () => hslToRgb([255])
    ).toThrowError()
  })
})
