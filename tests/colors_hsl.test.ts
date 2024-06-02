/**
 * COMMON FUNCTIONS TESTING:
 */
import { describe, expect, it, vi } from "vitest";
import { convertToInt8 } from "../src/common.js";
import { hslToRgb, parseHsl } from "../src/hsl-utils.js";
import { parseColor } from "../src/index.js";
import { RGB } from "../src/rgb-utils.js";
import { normalizeRGB } from "./fixtures/functions.js";
import { hsl_invalid_tests, hsl_valid_tests } from "./fixtures/hsl_colors.js";

describe("HSL COMMON", () => {
	// HSL
	it("Returns the correct rgb representation of the given HSL color", () => {
		expect(parseColor("hsl(0,0%,100%)")).toMatchObject({
			r: 255,
			g: 255,
			b: 255,
		});
		expect(parseColor("hsl(255,100%,100%)")).toMatchObject({
			r: 255,
			g: 255,
			b: 255,
		});
		expect(parseColor("hsl(0,100%,100%)")).toMatchObject({
			r: 255,
			g: 255,
			b: 255,
		});
		expect(parseColor("hsl(127,100%,100%)")).toMatchObject({
			r: 255,
			g: 255,
			b: 255,
		});
	});

	it("Returns the INT8 value of the css value", () => {
		expect(convertToInt8("0")).toBe(0);
		expect(convertToInt8("100")).toBe(100);
		expect(convertToInt8("0%")).toBe(0);
		expect(convertToInt8("100%")).toBe(255);
		expect(convertToInt8("0deg")).toBe(0);
		expect(convertToInt8("180deg")).toBe(180);
		expect(convertToInt8("360deg")).toBe(0);
		expect(convertToInt8("720deg")).toBe(0);
		expect(convertToInt8("-360deg")).toBe(0);
	});
});

/**
 * HSL FUNCTIONS TESTING:
 */
describe("HSL", () => {
	describe("HSL Color Parsing and Conversion", () => {
		for (const [hslString, expectedRgbString, description] of hsl_valid_tests) {
			it(
				description || `Parses HSL: ${hslString} to RGB: ${expectedRgbString}`,
				() => {
					expect(RGB(hslToRgb(parseHsl(hslString)))).toBe(
						normalizeRGB(expectedRgbString),
					);
				},
			);
		}
	});

	describe("Invalid HSL Color Parsing", () => {
		console.warn = vi.fn();
		for (const [hslString, expectedErrorMessage] of hsl_invalid_tests) {
			it(`Fails to Parse Invalid HSL: ${hslString} ${expectedErrorMessage}`, () => {
				RGB(hslToRgb(parseHsl(hslString)));
				expect(console.warn).toBeCalled();
			});
		}
	});
});
