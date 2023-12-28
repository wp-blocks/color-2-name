/**
 * COMMON FUNCTIONS TESTING:
 */
import {convertToInt8} from "../src/common";
import {RGB} from "../src/rgb-utils";
import {parseColor} from "../src";
import {parseHsl, hslToRgb} from "../src/hsl-utils";
import {hsl_invalid_tests, hsl_valid_tests} from "./fixtures/hsl_colors";
import {normalizeRGB} from "./fixtures/functions";


describe('HSL COMMON', () => {

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
    expect(convertToInt8('180deg')).toBe(180)
    expect(convertToInt8('360deg')).toBe(0)
    expect(convertToInt8('720deg')).toBe(0)
    expect(convertToInt8('-360deg')).toBe(0)
    expect(() => convertToInt8('five')).toThrowError()
  })
})

/**
 * HSL FUNCTIONS TESTING:
 */
describe('HSL', () => {

  describe('HSL Color Parsing and Conversion', () => {
    hsl_valid_tests.forEach(([hslString, expectedRgbString, description]) => {
      it(description || `Parses HSL: ${hslString} to RGB: ${expectedRgbString}`, () => {
        expect(RGB(hslToRgb(parseHsl(hslString)))).toBe(normalizeRGB(expectedRgbString));
      });
    });
  });

  describe('Invalid HSL Color Parsing', () => {
    hsl_invalid_tests.forEach(([hslString, expectedErrorMessage]) => {
      it(`Fails to Parse Invalid HSL: ${hslString} ${expectedErrorMessage}`, () => {
        expect(() => RGB(hslToRgb(parseHsl(hslString)))).toThrow();
      });
    });
  });
})
