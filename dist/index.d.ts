import colorSet from './data/colorSet';
/**
 * Given a color string it returns the closest corresponding name of the color.
 * Uses the Euclidean distance formula to calculate the distance between colors in the RGB color space.
 *
 * @param {string} color - the color string you want to find the closest color name
 * @param {Array} colorSet - the array of colors you want to find the closest color in. leave empty to use the default css color nameset
 * @param {Object} args - Optionally you can pass some additional arguments
 * @param args.info - Set a non nullish value to return some additional information (like the distance between the colors, or the hex color value) about the closest color.
 *
 * @return {Object} the closest color name and rgb value
 *
 */
declare function closest(color: colorString, set?: RGBCOLORDEF[] | undefined, ...args: any[string | number]): COLORDEF | COLORDEFINFO;
/**
 * Given a color returns if the color is light (by light is meant more mathematically closer to white)
 * @param {string} color - The color to check
 * @returns {boolean} true when the color is light, false otherwise
 */
declare function isLight(color: colorString): boolean;
/**
 * Given a color returns if the color is dark (by dark is meant more mathematically closer to black)
 * @param {string} color - The color to check
 * @returns {boolean} true when the color is dark, false otherwise
 */
declare function isDark(color: colorString): boolean;
/**
 * Given a color returns if the color is light or dark (by dark is meant more mathematically closer to black)
 * @param {string} color - The color to check
 * @returns {string} light when the color is close to white, dark otherwise
 */
declare function isLightOrDark(color: colorString): string;
/**
 * Given a color returns if the color is closer to "red", "green" or "blue".
 * @param {string} color - The color to check
 * @returns {string} light when the color is close to white, dark otherwise
 */
declare function closestRGB(color: colorString): string;
/**
 * Compute the distance between the two RGB values
 * There are two modes:
 * fast = true -> the distance is calculated without using the Euclidean formula completely, it is reliable but its result is exponential
 * fast = false -> the distance is calculated with the Euclidean formula, its result is linear
 *
 * @param rgb1 - The RGB value of the first color to compare
 * @param rgb2 - The RGB value of the second color to compare
 * @param fast - If you want to calculate the distance without calculating the square root, the result will be exponential otherwise is linear
 */
declare function distance(rgb1: RGBDEF, rgb2: RGBCOLORDEF, fast?: boolean): number;
/**
 * Given a color string it returns the hex representation
 *
 * @param rgbString - the rgb color string to convert to hex
 *
 * @return {string} the corresponding color hex
 */
declare function rgbToHex(rgbString: RGB): HEX | Error;
export { colorSet, closest, rgbToHex, distance, isLight, isDark, isLightOrDark, closestRGB };
