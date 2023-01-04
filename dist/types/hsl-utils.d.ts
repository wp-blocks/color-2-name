import { HSLVALUE, RGBVALUE } from './types';
/**
 * Get the values of the hsl string
 *
 * @param {string} hslAsString - the valid hsl color string
 * @return {string[]} the values of the hsl string
 */
export declare function parseHsl(hslAsString: string): string[];
/**
 * This function takes an array of strings and returns and object with the hsl values converted into INT8 (0-255)
 *
 * @param {string[]} hsl - the hsl values to parse from string to int8 values
 *
 */
export declare function getHslValues(hsl: string[]): HSLVALUE;
/**
 * Given the HSL color it convert the color into RGB
 *
 * @param {string[]} hsl the HSL value to parse
 * @return {Object} rgb value
 */
export declare function hslToRgb(hsl: string[]): RGBVALUE;
/**
 * Given the RGB color it convert the color into HSL
 *
 * @param {number} r - red
 * @param {number} g - green
 * @param {number} b - blue
 *
 * @return {Object} hsl value
 */
export declare function valuesToHsl({ r, g, b }: RGBVALUE): string;
//# sourceMappingURL=hsl-utils.d.ts.map