/**
 * It returns an object with the hex values of the 3 digit hex color
 *
 * @param {string} value 3 digit hex
 * @return {string[]} 6 digit hex
 */
export declare function shortHexToLongHex(value: string): string[];
/**
 *
 * @param value
 */
export declare function parseHex(value: colorString): string[];
/**
 * Convert a Hex color to rgb
 *
 * @param {string} hex without the "#"
 */
export declare function hexToRgb(hex: string[]): RGBVALUE | Error;
/**
* Convert rgb values to hex color
*
* @param {Object} rgb an object with the rgb values
*/
export declare function RgbValuesToHex(rgb: RGBVALUE): HEX;
