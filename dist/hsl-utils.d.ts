/**
 *
 * @param value
 */
export declare function parseHsl(hslAsString: string): string[];
export declare function getHslValues(hsl: string[]): HSLVALUE;
/**
 * Parses an array of HSL values and the related RGB value
 *
 * @param hsl the HSL value to parse
 * @return {Object} rgb value
 */
export declare function hslToRgb(hsl: string[]): RGBVALUE;
