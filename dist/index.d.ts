import cssColorSet from './data/cssColorSet';
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
declare function closest(color: colorString, colorSet?: RGBCOLORDEF[] | undefined, ...args: any[string | number]): COLORDEF | COLORDEFINFO;
/**
 * Calculate the distance between the two RGB values
 * it's possible to remove the square root but the result will be result^2
 * Since nowadays the difference of time to calc a square root or not is almost indifferent, I preferred to keep the result more accurate.
 *
 * @param rgb1
 * @param rgb2
 */
declare function distance(rgb1: RGBDEF, rgb2: RGBCOLORDEF): number;
export { cssColorSet, closest, distance };
