import b from "benny";
import { closest } from "color-2-name";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";

extend([namesPlugin]);

const randomHex = () =>
	`#${[1, 2, 3]
		.map(() =>
			Math.floor(Math.random() * 255)
				.toString(16)
				.padStart(2, "0"),
		)
		.join("")}`;

/**
 * Generate a random RGB or RGBA color.
 * @param {boolean} includeAlpha - Whether to include alpha value (opacity).
 * @returns {string} A string representing the generated color.
 */
function getRandomColor(includeAlpha = false) {
	// Generate random values for red, green, and blue components
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);

	// If includeAlpha is true, generate a random alpha value between 0 and 1
	const alpha = includeAlpha ? Math.random().toFixed(2) : 1;

	// If includeAlpha is true, return RGBA format, otherwise return RGB format
	return includeAlpha
		? `rgba(${red}, ${green}, ${blue}, ${alpha})`
		: `rgb(${red}, ${green}, ${blue})`;
}

/**
 * Generate a random HSL color.
 * @param {boolean} includeAlpha - Whether to include alpha value (opacity).
 * @returns {string} A string representing the generated color.
 */
function getRandomHSLColor(includeAlpha = false) {
	// Generate random values for hue, saturation, and lightness components
	const hue = Math.floor(Math.random() * 360); // Hue ranges from 0 to 360
	const saturation = Math.floor(Math.random() * 101); // Saturation ranges from 0% to 100%
	const lightness = Math.floor(Math.random() * 101); // Lightness ranges from 0% to 100%

	// If includeAlpha is true, generate a random alpha value between 0 and 1
	const alpha = includeAlpha ? Math.random().toFixed(2) : 1;

	// If includeAlpha is true, return HSLA format, otherwise return HSL format
	return includeAlpha
		? `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
		: `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const randoms = new Array(50).fill(0).map(() => randomHex());

// copy the array to avoid mutation
const randomsCopy = [
	...randoms,
	...Array(50)
		.fill([...randoms].slice(0, 0))
		.reduce((a, b) => a.concat(b)),
];

console.log("colors used for tests", randomsCopy, randomsCopy.length);

b.suite(
	"Convert a random color to a name",

	b.add("color2name", () => {
		// biome-ignore lint/complexity/noForEach: <explanation>
		randomsCopy.forEach((i) => closest(i));
	}),

	b.add("colord", () => {
		// biome-ignore lint/complexity/noForEach: <explanation>
		randomsCopy.forEach((i) => colord(i).toName({ closest: true }));
	}),

	b.cycle(),
	b.complete(),
);
