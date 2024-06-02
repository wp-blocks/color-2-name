import colorSet from "./data/colorSet";
import { valuesToHex } from "./hex-utils.js";
import { valuesToHsl } from "./hsl-utils.js";
import { RGB } from "./rgb-utils.js";
import type { RGBCOLORDEF } from "./types.js";

/**
 * This function was the opposite of the name of the repo and returns the color of the colorSet given the name
 *
 * @param {string} searchedColor -the name of the color to search for
 * @param {Array} set - the colorSet to search in
 */
export function getColor(
	searchedColor: string,
	set: RGBCOLORDEF[] | undefined = colorSet as RGBCOLORDEF[],
) {
	const color: RGBCOLORDEF | undefined = set.find(
		(color: RGBCOLORDEF) => color[3] === searchedColor,
	);

	if (typeof color !== "undefined") {
		const [r, g, b] = color;
		return {
			hex: valuesToHex({ r, g, b }),
			rgb: RGB({ r, g, b }),
			hsl: valuesToHsl({ r, g, b }),
		};
	}

	throw new Error(`Error: invalid color ${searchedColor} or empty colorSet`);
}

/**
 * Get all the colors from the colorSet
 */
export function getColors() {
	return colorSet.map((colorData) => {
		return {
			name: colorData[3],
			...getColor(colorData[3] as string),
		};
	});
}
