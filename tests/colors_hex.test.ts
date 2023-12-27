/**
 * COMMON FUNCTIONS TESTING:
 */
import {parseColor} from "../src/common";
import {hexToRgb, parseHex, shortHexToLongHex, toHex} from "../src/hex-utils";
import {hex_invalid_tests, hex_valid_tests} from "./fixtures/hex_colors";
import {valuesToRgb} from "../src/rgb-utils";
import {normalizeRGB} from "./fixtures/functions";

describe('HEX COMMON', () => {

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

  describe('HEX Color Parsing and Conversion', () => {
    hex_valid_tests.forEach(([hexString, expectedRgbString, description]) => {
      it(description || `Parses HEX: ${hexString} to RGB: ${expectedRgbString}`, () => {
        expect(valuesToRgb(hexToRgb(parseHex(hexString)))).toBe(normalizeRGB(expectedRgbString));
      });
    });
  });

  describe('Invalid HEX Color Parsing', () => {
    hex_invalid_tests.forEach(([hexString, expectedErrorMessage]) => {
      it(`Fails to Parse Invalid HEX: ${hexString} ${expectedErrorMessage}`, () => {
        expect(() => valuesToRgb(hexToRgb(parseHex(hexString)))).toThrowError();
      });
    });
  });

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
