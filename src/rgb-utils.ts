import {
	cleanDefinition,
	convertToInt8,
	limitValue,
	splitValues,
} from "./common.js";
import type { RGBVALUE } from "./types.js";

export function fallbackRGB(
	rgb: string[],
	err = "Invalid RGB color",
): string[] {
	console.warn(err);
	return [rgb[0] ?? 0, rgb[1] ?? 0, rgb[2] ?? 0];
}

/**
 * Get the values of the rgb string
 *
 * @param rgbAsString - the rgb color as string split into values
 *
 * @return {Array} the values of the rgb string as Array of strings that represent the rgb color
 */
export function parseRgb(rgbAsString: string): string[] {
	const rgbvalue = cleanDefinition(rgbAsString);

	const rgb: string[] = splitValues(rgbvalue);

	if (rgb.length !== 3 && rgb.length !== 4) {
		return fallbackRGB(
			rgb,
			`Too few values to define rgb: ${rgbAsString} -> ${rgbvalue}`,
		);
	}
	return [rgb[0], rgb[1], rgb[2]];
}

/**
 * This function takes an array of strings and returns and object with the rgb values converted into INT8 (0-255)
 *
 * @param {Array} rgb - rgb color as Array of strings
 *
 * @return {Object} an object that contains the r, g and b values as INT8
 */
export function getRgbValues(rgb: string[]): RGBVALUE {
	// use the channel key as the new array key
	return {
		r: limitValue(Math.round(convertToInt8(rgb[0])), 0, 255) || 0,
		g: limitValue(Math.round(convertToInt8(rgb[1])), 0, 255) || 0,
		b: limitValue(Math.round(convertToInt8(rgb[2])), 0, 255) || 0,
	};
}

/**
 * returns a string representation of the rgb values
 *
 * @param {Object} rgb the rgb color object
 *
 * @return {string} a string representation of the rgb values
 */
export function RGB(rgb: RGBVALUE): string {
	return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
}
