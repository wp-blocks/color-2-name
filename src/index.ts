import { getColor, getColors } from "./color-utils";
import { BLACKANDWHITE, RGBSET, hexRegex, hslRegex, rgbRegex } from "./common";
import colorSet from "./data/colorSet";
import { hexToRgb, parseHex, valuesToHex } from "./hex-utils";
import { hslToRgb, parseHsl } from "./hsl-utils";
import { getRgbValues, parseRgb } from "./rgb-utils";
import type {
	COLORDEF,
	COLORSTRING,
	ColorParsers,
	HEX,
	RGBCOLORDEF,
	RGBDEF,
	RGBVALUE,
} from "./types";

export const colorParsers: ColorParsers[] = [
	{ regex: hexRegex, parser: parseHex, converter: hexToRgb },
	{ regex: rgbRegex, parser: parseRgb, converter: getRgbValues },
	{ regex: hslRegex, parser: parseHsl, converter: hslToRgb },
];

/**
 * Given a color string, it returns the closest corresponding name of the color.
 * Uses the Euclidean distance formula to calculate the distance between colors in the RGB color space.
 *
 * @param {string} color - the color string you want to find the closest color name
 * @param {Object} set - the color set that will be used to find the closest color
 * @param {Object} args - Set a non nullish value to return some additional information (like the distance between the colors, or the hex color value)
 * @param args.info - Set a non nullish value to return some additional information (like the distance between the colors, or the hex color value) about the closest color.
 *
 * @return {Object} the closest color name and rgb value
 *
 * @example // Returns the closest color name and rgb value given a css color string
 * closest('#f00'); // { name: 'red', color: 'rgb(255,0,0)' }
 *
 * closest('#f00', undefined, {info:true}); // { name: 'red', color: 'rgb(255,0,0)', hex: '#ff0000', hsl: 'hsl(0, 100%, 50%)', distance: 0 ) }
 */
function closest(
	color: string | COLORSTRING,
	set: RGBCOLORDEF[] | undefined = colorSet as RGBCOLORDEF[],
	args?: { info?: boolean },
): COLORDEF {
	let closestGap = Number.MAX_SAFE_INTEGER;
	const closestColor: COLORDEF = { name: "error", color: "#F00" };

	if (set.length < 1) {
		return closestColor;
	}

	const rgbColorValues = Object.values(parseColor(color));
	const colorSetLength = set.length;
	// Precompute RGB values if needed
	const precomputedRGBValues = set.map((item) => [item[0], item[1], item[2]]);

	// Find the closest color in the color set
	for (let i = 0; i < colorSetLength; i++) {
		const tested = precomputedRGBValues[i];
		const gap = distance(rgbColorValues as RGBDEF, tested, true);
		if (gap < closestGap) {
			closestGap = gap;
			closestColor.name = set[i][3];
			closestColor.color = `rgb(${set[i][0]},${set[i][1]},${set[i][2]})`;
		}

		// Break if exact match found
		if (gap === 0) {
			break;
		}
	}

	if (args?.info) {
		const colorValue = getColor(closestColor.name, set);
		return {
			...colorValue,
			...closestColor,
			gap: Math.sqrt(closestGap),
		};
	}

	return closestColor;
}

/**
 * This function takes a string representing a color (color) and uses regular expressions to check if it matches any of the following formats: hex, hex+alpha, RGB, RGBA, HSL, or HSLA.
 * If the color string matches one of these formats, the function returns an object with the type of color and the value of the color.
 * If the color string does not match any of the formats, the function throws an error.
 *
 * @param {string} colorString - the color string to test and convert to rgb values
 *
 * @return {Object|Error} the object with rgb values of that color
 */
export function parseColor(colorString: string): RGBVALUE {
	for (const { regex, parser, converter } of colorParsers) {
		if (regex.test(colorString)) {
			const result = parser(colorString as COLORSTRING);
			return converter(result);
		}
	}

	// If the color string does not match any of the regular expressions, return an error
	throw new Error(`Invalid color: ${colorString}`);
}

/**
 * Given a color returns if the color is light (by light is meant more mathematically closer to white)
 *
 * @param {string} color - The color to check
 *
 * @returns {boolean} true when the color is light, false otherwise
 *
 * @example isLight('#ddd'); // true
 */
function isLight(color: string): boolean {
	return closest(color, BLACKANDWHITE).name === "white";
}

/**
 * Given a color returns if the color is dark (by dark is meant more mathematically closer to black)
 *
 * @param {string} color - The color to check
 *
 * @returns {boolean} true when the color is dark, false otherwise
 *
 * @example isDark('#333'); // true
 */
function isDark(color: string): boolean {
	return closest(color, BLACKANDWHITE).name === "black";
}

/**
 * Given a color returns if the color is closer to "red", "green" or "blue".
 *
 * @param {string} color - The color to check
 *
 * @returns {string} light when the color is close to white, dark otherwise
 *
 * @example closestRGB('#f00'); // 'red'
 */
function closestRGB(color: string): string {
	return closest(color, RGBSET).name;
}

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
function distance(
	rgb1: [number, number, number],
	rgb2: [number, number, number, string] | number[],
	fast = false,
): number {
	const [rDiff, gDiff, bDiff] = [
		rgb2[0] - rgb1[0],
		rgb2[1] - rgb1[1],
		rgb2[2] - rgb1[2],
	];
	const dist = rDiff * rDiff + gDiff * gDiff + bDiff * bDiff;
	return fast ? dist : Math.sqrt(dist);
}

/**
 * Given a color string it returns the hex representation
 *
 * @param rgbString - the rgb color string to convert to hex
 *
 * @return {string} the corresponding color hex
 *
 * @example rgbToHex("rgba(100% 0 0 / .5)"); // #FF0000
 */
function rgbToHex(rgbString: string): HEX | Error {
	// if is a rgb string
	if (rgbRegex.test(rgbString)) {
		const rgb = parseRgb(rgbString);
		const RgbValues = getRgbValues(rgb);
		return valuesToHex(RgbValues);
	}
	throw new Error(`Invalid color: ${rgbString}`);
}

export {
	closest,
	rgbToHex,
	distance,
	isLight,
	isDark,
	closestRGB,
	getColor,
	getColors,
};
