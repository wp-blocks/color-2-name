// Regular expressions to match different color formats
import type { RGBCOLORDEF } from "./types";

/** The maximum distance possible between colors */
export const MAXDISTANCE = 441.6729559300637;

/** A regex to match hex colors */
export const hexRegex: RegExp = /^#([\da-f]{3,8})/i;
/** A regex to match rgb colors */
export const rgbRegex: RegExp = /^rgba?\(([^)]+)\)/i;
/** A regex to match hsl colors */
export const hslRegex: RegExp = /^hsla?\(([^)]+)\)/i;
/** A regex to match strings that are only valid numbers with and without decimals and the number can be negative and without the 0 in the beginning  */
export const isNumeric: RegExp = /^-?\d*\.?\d+$/i;
/** Remove comments from string */
export const stripComments: RegExp = /(\/\*[^*]*\*\/)|(\/\/[^*]*)/g;

/**
 * This set is used to detect if the color is bright or dark
 *
 * @note the set has been corrected to get pure RGB values (eg. pure red, pure green) in the "bright" area
 */
export const BLACKANDWHITE: RGBCOLORDEF[] = [
	[255, 255, 255, "white"],
	[1, 1, 1, "black"],
];

/**
 * This set is used to detect the nearest rgb color
 */
export const RGBSET: RGBCOLORDEF[] = [
	[255, 0, 0, "red"],
	[0, 255, 0, "green"],
	[0, 0, 255, "blue"],
];

/**
 * split the content of rgb and hsl colors depending on the parsed value of the css property
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb#syntax
 *
 * @param {string} rawValues - the value inside the rgb(.*) css color definition
 *
 * @return {Array} the array of rgb values found inside the passed string
 */
export function splitValues(rawValues: string): string[] {
	return rawValues
		.split(rawValues.includes(",") ? "," : " ")
		.map((s) => s.trim());
}

/**
 * If the value is an angle in degrees, convert it to the 0-360 range
 *
 * @param {string} angle - the degrees to convert into a number
 *
 * @return {number} the converted value
 */
export function normalizeDegrees(angle: string): number {
	// Strip label and convert to degrees (if necessary)
	let degAngle = Number.parseFloat(angle) || 0;
	if (angle.indexOf("deg") > -1) {
		degAngle = Number.parseFloat(angle.substring(0, angle.length - 3));
	} else if (angle.indexOf("rad") > -1) {
		degAngle = Math.round(
			Number.parseFloat(angle.substring(0, angle.length - 3)) * (180 / Math.PI),
		);
	} else if (angle.indexOf("turn") > -1) {
		degAngle = Math.round(
			Number.parseFloat(angle.substring(0, angle.length - 4)) * 360,
		);
	}

	while (degAngle < 0) {
		degAngle += 360;
	}

	// Make sure it's a number between 0 and 360
	if (degAngle >= 360) degAngle %= 360;

	return degAngle;
}

/**
 * Returns a value that is limited between a minimum and maximum value.
 *
 * @param {number} value - The value to be limited.
 * @param {number} min - The minimum allowed value (default is 0).
 * @param {number} max - The maximum allowed value (default is 0).
 * @return {number} The limited value.
 */
export function limitValue(value: number, min = 0, max = 0): number {
	return Math.min(Math.max(Math.round(value), min), max);
}

/**
 * Calculates the value based on a given string and multiplier.
 *
 * @param {string} valueString - The string representing the value to be calculated.
 * @param {number} multiplier - The multiplier to be applied to the calculated value.
 * @return {number} The calculated value.
 */
export function calculateValue(
	valueString: string,
	multiplier: number,
): number {
	// Regular expression to match the calc() function and extract the numerical value
	const regex = /calc\(([^)]+)\)/;

	// Match the calc() function in the CSS string
	const match = valueString.match(regex);

	return convertToInt8(match ? match[1] : valueString, multiplier);
}

/**
 * Removes comments from the input string and extracts the content between the first opening parenthesis
 * and the last closing parenthesis.
 *
 * @param {string} string - The input string.
 * @return {string} The content between the first opening parenthesis and the last closing parenthesis.
 */
export function cleanDefinition(string: string): string {
	// Remove comments from the string
	const cleanString = string.replace(stripComments, "");

	// Find the positions of the first opening and the last closing parentheses
	const firstParenthesisIndex = cleanString.indexOf("(");
	const lastParenthesisIndex = cleanString.lastIndexOf(")");

	// Extract the content between the parentheses
	return cleanString
		.slice(firstParenthesisIndex + 1, lastParenthesisIndex)
		.trim();
}

/**
 * Normalizes a percentage value by dividing it by 100 and multiplying it by a given multiplier.
 *
 * @param {string} value - The percentage value to be normalized.
 * @param {number} multiplier - The number to multiply the normalized percentage by.
 * @return {number} The normalized percentage value.
 */
export function normalizePercentage(value: string, multiplier: number): number {
	return (Number.parseFloat(value) / 100) * multiplier;
}

/**
 * Calculates the color value fallbacks for a given value.
 *
 * @param {string} value - The color value to calculate fallbacks for.
 * @param {string} [err] - An optional error message to display.
 * @return {number} - The calculated color value fallbacks.
 */
export function colorValueFallbacks(value: string, err?: string): number {
	if (value === "infinity") {
		console.warn(
			err || `Positive infinity value has been set to 255: ${value}`,
		);
		return 255;
	}

	if (value === "currentColor")
		console.warn(err || `The "currentColor" value has been set to 0: ${value}`);
	if (value === "transparent")
		console.warn(err || `The "transparent" value has been set to 0: ${value}`);
	if (value === "NaN")
		console.warn(err || `"NaN" value has been set to 0: ${value}`);
	if (value === "-infinity")
		console.warn(
			err || `"Negative" infinity value has been set to 0: ${value}`,
		);
	if (value === "none")
		console.warn(
			err || `The none keyword is invalid in legacy color syntax: ${value}`,
		);
	return 0;
}

/**
 * Takes a string with a css value that could be a number or percentage or an angle in degrees and returns the corresponding 8bit value
 *
 * @param value - a valid value for the css color definition (like 255, "100%", "324deg", etc.) *
 * @param multiplier - the number that represent the maximum - default is 255 decimal - 100 hex
 *
 * @example convertToInt8('100%'); // 255
 *
 * @return {string} the corresponding value in 8-bit format
 */
export function convertToInt8(
	value: string | unknown,
	multiplier = 255,
): number {
	const newValue = typeof value === "string" ? value?.trim() : "0";
	if (isNumeric.test(newValue)) {
		// limit the min and the max newValue
		return limitValue(Number.parseFloat(newValue) || 0, 0, multiplier);
	}
	if (newValue.endsWith("%")) {
		// If the newValue is a percentage, divide it by 100 to get a newValue from 0 to 1
		// and then multiply it by 255 to get a newValue from 0 to 255
		return normalizePercentage(newValue, multiplier) || 0;
	}
	if (
		newValue.endsWith("deg") ||
		newValue.endsWith("rad") ||
		newValue.endsWith("turn")
	) {
		return normalizeDegrees(newValue);
	}
	if (newValue.startsWith("calc")) {
		// get the newValue from the calc function
		return limitValue(calculateValue(newValue, multiplier), 0, multiplier);
	}

	// If the value is not a percentage or an angle in degrees, it is invalid
	return colorValueFallbacks(newValue, `Invalid value: ${value}`);
}
