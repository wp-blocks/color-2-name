import { COLORSTRING, HEX, RGBVALUE } from './types';
/**
 * It returns an object with the hex values of the 3 digit hex color
 *
 * @param {string} value 3 digit hex
 * @return {string[]} 6 digit hex
 */
export declare function shortHexToLongHex(value: string): string[];
/**
 * Get the hex value of the color and convert it to an Object of R G And B values (still in hex format)
 *
 * @param value the string that contains the color in hex format
 *
 * @return {string[]} an array of 6 digit hex values in a triplet of R G and B (HEX format)
 */
export declare function parseHex(value: COLORSTRING): string[];
/**
 * Converts a Hex color to rgb
 *
 * @param {string} hex without the "#"
 *
 * @return {string} the rgb color values for the given hex color
 */
export declare function hexToRgb(hex: string[]): RGBVALUE | Error;
/**
 * Convert a INT8 value to HEX
 *
 * @param {number} int8 - the integer value to convert
 *
 * @return {string} the hex string
 */
export declare function toHex(int8: number): string;
/**
* Convert rgb values to hex color
*
* @param {Object} rgb an object with the rgb values
 *
 * @return {string} the hex string
*/
export declare function valuesToHex(rgb: RGBVALUE): HEX;
//# sourceMappingURL=hex-utils.d.ts.map