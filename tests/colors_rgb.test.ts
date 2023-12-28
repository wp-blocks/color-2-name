/**
 * COMMON FUNCTIONS TESTING:
 */

import {valuesToHex} from "../src/hex-utils";
import {getRgbValues, parseRgb, RGB} from "../src/rgb-utils";
import {rgb_invalid_tests, rgb_valid_tests} from "./fixtures/rgb_colors";
import {normalizeRGB} from "./fixtures/functions";
import {parseColor} from "../src";

describe('RGB COMMON', () => {

  // RGB
  it('Returns the correct rgb representation of the given RGB color', () => {
    expect(parseColor('rgb(255,255,255)')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('rgb(255, 255, 255,.5)')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('rgb(255 255 255)')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('rgb(255 255 255 / .5)')).toMatchObject({r: 255, g: 255, b: 255})
    expect(parseColor('rgba(255 255 255 / 0.1)')).toMatchObject({r: 255, g: 255, b: 255})
  })
})

/**
 * RGB FUNCTIONS TESTING:
 */
describe('RGB', () => {

  describe('RGB Color Parsing and Conversion', () => {
    rgb_valid_tests.forEach(([rgbString, expectedRgbString, description]) => {
      it(description || `Parses RGB: ${rgbString} to RGB: ${expectedRgbString}`, () => {
        expect(RGB(getRgbValues(parseRgb(rgbString)))).toBe(normalizeRGB(expectedRgbString));
      });
    });
  });

  describe('Invalid RGB Color Parsing', () => {
    rgb_invalid_tests.forEach(([rgbString, expectedErrorMessage]) => {
      it(`Fails to Parse Invalid RGB: ${rgbString} ${expectedErrorMessage}`, () => {
        expect(() => RGB(getRgbValues(parseRgb(rgbString)))).toThrowError();
      });
    });
  });

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
