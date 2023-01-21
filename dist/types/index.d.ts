import colorSet from './data/colorSet';
import { COLORDEF, HEX } from './types';
/**
 * Given a color string it returns the closest corresponding name of the color.
 * Uses the Euclidean distance formula to calculate the distance between colors in the RGB color space.
 *
 * @param {string} color - the color string you want to find the closest color name
 * @param {Object} set - the color set that will be used to find the closest color
 * @param {Object} args - Optionally you can pass some additional arguments
 * @param args.info - Set a non nullish value to return some additional information (like the distance between the colors, or the hex color value) about the closest color.
 *
 * @return {Object} the closest color name and rgb value
 *
 * @example // Returns the closest color name and rgb value given a css color string
 * closest('#f00'); // { name: 'red', color: 'rgb(255,0,0)' }
 *
 * closest('#f00', undefined, {info:true}); // { name: 'red', color: 'rgb(255,0,0)', hex: '#ff0000', hsl: 'hsl(0, 100%, 50%)', distance: 0 ) }
 */
declare function closest(color: string, set?: Array<[number, number, number, string]> | undefined, ...args: any[string | number]): COLORDEF;
/**
 * Given a color returns if the color is light (by light is meant more mathematically closer to white)
 *
 * @param {string} color - The color to check
 *
 * @returns {boolean} true when the color is light, false otherwise
 *
 * @example isLight('#ddd'); // true
 */
declare function isLight(color: string): boolean;
/**
 * Given a color returns if the color is dark (by dark is meant more mathematically closer to black)
 *
 * @param {string} color - The color to check
 *
 * @returns {boolean} true when the color is dark, false otherwise
 *
 * @example isDark('#333'); // true
 */
declare function isDark(color: string): boolean;
/**
 * Given a color returns if the color is light or dark (by dark is meant more mathematically closer to black)
 *
 * @param {string} color - The color to check
 *
 * @returns {string} light when the color is close to white, dark otherwise
 *
 * @example isLightOrDark('#fff'); // 'light'
 */
declare function isLightOrDark(color: string): string;
/**
 * Given a color returns if the color is closer to "red", "green" or "blue".
 *
 * @param {string} color - The color to check
 *
 * @returns {string} light when the color is close to white, dark otherwise
 *
 * @example closestRGB('#f00'); // 'red'
 */
declare function closestRGB(color: string): string;
/**
 * Compute the distance between the two RGB values
 * There are two modes:
 * fast = true -> the distance is calculated without using the Euclidean formula completely, it is reliable but its result is exponential
 * fast = false -> the distance is calculated with the Euclidean formula, its result is linear
 *
 * @param rgb1 - The RGB value of the first color to compare
 * @param rgb2 - The RGB value of the second color to compare
 * @param fast - If you want to calculate the distance without calculating the square root, the result will be exponential otherwise is linear
 *
 * @return {number} the distance between the two RGB values
 *
 * @example distance([10, 20, 30], [120, 120, 120]); // 173.78147196982766
 */
declare function distance(rgb1: [number, number, number], rgb2: [number, number, number, string] | number[], fast?: boolean): number;
/**
 * Given a color string it returns the hex representation
 *
 * @param rgbString - the rgb color string to convert to hex
 *
 * @return {string} the corresponding color hex
 *
 * @example rgbToHex("rgba(100% 0 0 / .5)"); // #FF0000
 */
declare function rgbToHex(rgbString: string): HEX | Error;
export { colorSet, closest, rgbToHex, distance, isLight, isDark, isLightOrDark, closestRGB };
//# sourceMappingURL=index.d.ts.map