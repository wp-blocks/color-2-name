import { RGBCOLORDEF, RGBVALUE } from './types';
/** The maximum distance possible between colors */
export declare const MAXDISTANCE = 441.6729559300637;
/** A regex to match hex colors */
export declare const hexRegex: RegExp;
/** A regex to match rgb colors */
export declare const rgbRegex: RegExp;
/** A regex to match hsl colors */
export declare const hslRegex: RegExp;
/** A regex to match strings that are only int numbers */
export declare const isNumeric: RegExp;
/**
 * This set is used in order to detect if the color is bright or dark
 *
 * @note the set has been corrected to get pure RGB values (eg. pure red, pure green) in the "bright" area
 */
export declare const BLACKANDWHITE: RGBCOLORDEF[];
/**
 * This set is used in order to detect the nearest rgb color
 */
export declare const RGBSET: RGBCOLORDEF[];
/**
 * split the content of rgb and hsl colors depending on the parsed value of the css property
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb#syntax
 *
 * @param {string} rawValues - the value inside the rgb(.*) css color definition
 *
 * @return {Array} the array of rgb values finded inside the passed string
 */
export declare function splitValues(rawValues: string): string[];
/**
 * If the value is an angle in degrees, convert it to the 0-360 range
 *
 * @param {string} value - the degrees to convert into a number
 * @param {number} multiplier - the number that represent the maximum - default is 100
 *
 * @return {number} the converted value
 */
export declare function normalizeDegree(value: string, multiplier?: number): number;
/**
 * Takes a string with a css value that could be a number or percentage or an angle in degrees and returns the corresponding 8bit value
 *
 * @param {string} value - a valid value for the css color definition (like 255, "100%", "324deg", etc)
 * @param {string} value - a valid value for the css color definition (like 255, "100%", "324deg", etc)
 *
 * @example convertToInt8('100%'); // 255
 *
 * @return {string} the corresponding value in 8 bit format
 */
export declare function convertToInt8(value: string, multiplier?: number): number;
/**
 * This function takes a string representing a color (color) and uses regular expressions to check if it matches any of the following formats: hex, hex+alpha, RGB, RGBA, HSL, or HSLA.
 * If the color string matches one of these formats, the function returns an object with the type of color and the value of the color.
 * If the color string does not match any of the formats, the function throws an error.
 *
 * @param {string} colorString - the color string to test and convert to rgb values
 *
 * @return {Object|Error} the object with rgb values of that color
 */
export declare function parseColor(colorString: string): RGBVALUE | Error;
//# sourceMappingURL=common.d.ts.map