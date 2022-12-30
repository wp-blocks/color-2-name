import colorSet from './data/colorSet';
/**
 * Given a color string it returns the closest corresponding name of the color
 *
 * @param color
 * @param colorSet
 * @param args
 * @param args.colors
 *
 * @return {string} the corresponding color name
 */
declare function closest(color: colorString, set?: RGBCOLORDEF[] | undefined, ...args: any[string | number]): COLORDEF | COLORDEFINFO;
declare function isLight(color: colorString): boolean;
declare function isDark(color: colorString): boolean;
declare function isLightOrDark(color: colorString): string;
declare function closestRGB(color: colorString): string;
/**
 * Compute the distance between the two RGB values
 * There are two modes:
 * fast = true -> the distance is calculated without using the Euclidean formula completely, it is reliable but its result is exponential
 * fast = false -> the distance is calculated with the Euclidean formula, its result is linear
 *
 * @param rgb1
 * @param rgb2
 * @param fast - whether to calculate the distance without computing the square root, the result will be
 */
declare function distance(rgb1: RGBDEF, rgb2: RGBCOLORDEF, fast?: boolean): number;
/**
 * Given a color string it returns the hex representation
 *
 * @param rgbString
 *
 * @return {string} the corresponding color hex
 */
declare function rgbToHex(rgbString: RGB): HEX | Error;
export { colorSet, closest, rgbToHex, distance, isLight, isDark, isLightOrDark, closestRGB };
