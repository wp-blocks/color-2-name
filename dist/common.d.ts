export declare const hexRegex: RegExp;
export declare const rgbRegex: RegExp;
export declare const hslRegex: RegExp;
export declare const isNumeric: RegExp;
/**
 * split the content of rgb and hsl colors depending on the parsed value of the css property
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb#syntax
 *
 * @param rawValues
 */
export declare function splitValues(rawValues: string): string[];
/**
 * takes a string with a css value that could be a number or percentage or an angle in degrees and returns the corresponding 8bit value
 *
 * @param value
 */
export declare function convertToInt8(value: string, multiplier?: number): number;
/**
 * This function takes a string representing a color (color) and uses regular expressions to check if it matches any of the following formats: hex, hex+alpha, RGB, RGBA, HSL, or HSLA.
 * If the color string matches one of these formats, the function returns an object with the type of color and the value of the color.
 * If the color string does not match any of the formats, the function throws an error.
 *
 * @param colorString
 */
export declare function parseColor(colorString: colorString | string): RGBVALUE | Error;
