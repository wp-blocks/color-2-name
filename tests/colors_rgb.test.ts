/**
 * COMMON FUNCTIONS TESTING:
 */

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
    console.warn = jest.fn();
    rgb_invalid_tests.forEach(([rgbString, expectedErrorMessage]) => {
      it(`Fails to Parse Invalid RGB: ${rgbString} ${expectedErrorMessage}`, () => {
        RGB(getRgbValues(parseRgb(rgbString)))
        expect(console.warn).toBeCalled();
      });
    });
  });
})
