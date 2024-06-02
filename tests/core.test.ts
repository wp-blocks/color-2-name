import { describe, expect, it, vi } from "vitest";
import { getColors } from "../src/color-utils.js";
import { MAXDISTANCE } from "../src/common.js";
import ColorSet from "../src/data/colorSet.js";
import { valuesToHex } from "../src/hex-utils.js";
import {
	closest,
	closestRGB,
	distance,
	getColor,
	isDark,
	isLight,
	rgbToHex,
} from "../src/index.js";

describe("Color Conversions functions", () => {
	it("Returns the correct distance between colors", () => {
		// default args
		expect(distance([0, 0, 0], [255, 255, 255, "White"])).toBeCloseTo(
			MAXDISTANCE,
			10,
		);
		expect(distance([255, 255, 255], [255, 255, 255, "White"])).toBe(0);
		expect(distance([10, 20, 30], [120, 120, 120])).toBeCloseTo(173.78);

		// fast calculation
		expect(distance([255, 255, 255], [255, 255, 255, "White"], true)).toBe(0);
		expect(distance([0, 0, 0], [255, 255, 255, "White"], true)).toBe(195075);

		// this need to return the same distance as the first test, since the fast mode is exponential
		expect(
			Math.sqrt(distance([0, 0, 0], [255, 255, 255, "White"], true)),
		).toBeCloseTo(MAXDISTANCE, 10);
	});

	it("Returns the correct name of the color", () => {
		// HEX
		console.warn = vi.fn();

		expect(() => closest("blue")).toThrow();
		expect(closest("#3fdaf4")).toMatchObject({ name: "turquoise" });
		expect(closest("#000000")).toMatchObject({ name: "black" });
		expect(closest("#ff0000")).toMatchObject({ name: "red" });
		expect(closest("#ffffff")).toMatchObject({ name: "white" });
		expect(closest("#fffffe")).toMatchObject({ name: "white" });
		//RGB
		expect(closest("rgb(300,255,255)")).toMatchObject({ name: "white" });
		expect(closest("rgb(255,255,255)")).toMatchObject({ name: "white" });
		expect(closest("rgba(255,255,255,0.1)")).toMatchObject({ name: "white" });
		expect(closest("rgba(255,255,255,.1)")).toMatchObject({ name: "white" });
		expect(closest("rgba(255 255 255 /.1)")).toMatchObject({ name: "white" });
		// HSL
		expect(closest("hsl(255,0%,100%,.1)")).toMatchObject({ name: "white" });
		// INFO
		expect(closest("rgb(255,0,255)", undefined, { info: true })).toMatchObject({
			name: "magenta",
			hex: "#ff00ff",
			gap: 0,
		});
		// INFO FUNKY CONFIGURATION
		expect(
			closest("#FFF", undefined, { info: "YES" as unknown as boolean }),
		).toMatchObject({ name: "white", hex: "#ffffff" });
		// INFO DISABLED
		expect(
			closest("hsl(255,0%,100%)", undefined, { info: false }),
		).toMatchObject({ name: "white" });
		// THROW ERR
		expect(closest("#111", [])).toMatchObject({ name: "error" });
	});

	it("Returns convert rgb values to hex", () => {
		expect(rgbToHex("rgb(255,255,255)")).toBe("#ffffff");
		expect(rgbToHex("rgb(255, 255, 255,.5)")).toBe("#ffffff");
		expect(rgbToHex("rgb(255 255 255)")).toBe("#ffffff");
		expect(rgbToHex("rgb(255 255 255 / .5)")).toBe("#ffffff");
		expect(rgbToHex("rgba(255 255 255 / 0.1)")).toBe("#ffffff");
	});

	it("Returns if the color is bright or dark", () => {
		expect(isLight("rgb(255,255,255)")).toBe(true);
		expect(isLight("rgba(255,255,255,0.2)")).toBe(true);
		expect(isLight("#FFF")).toBe(true);
		expect(isLight("hsl(0,0%,100%)")).toBe(true);
		expect(isLight("hsla(0,0%,100%,10%)")).toBe(true);

		expect(isLight("#aaa")).toBe(true);
		expect(isDark("#666")).toBe(true);
		expect(isLight("#FF0000")).toBe(false);

		expect(isDark("rgb(0,0,0)")).toBe(true);
		expect(isDark("#000")).toBe(true);
		expect(isDark("#000000")).toBe(true);
		expect(isDark("hsl(0,0%,0%)")).toBe(true);
		expect(isDark("hsla(0,0%,0%,10%)")).toBe(true);

		expect(closestRGB("#a22")).toBe("red");
		expect(closestRGB("#2a2")).toBe("green");
		expect(closestRGB("#22a")).toBe("blue");
		expect(closestRGB("#2EF")).toBe("blue");
	});

	it("Fails with error parsing wrong rgb values", () => {
		expect(() => rgbToHex("#AHAHAH")).toThrow("Invalid color: #AHAHAH");
		expect(() => rgbToHex(1 as unknown as string)).toThrow("Invalid color: 1");
	});

	it("Fails with error parsing wrong rgb values", () => {
		expect(valuesToHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff");
	});

	it("Get color function", () => {
		expect(getColor("red")).toMatchObject({
			hex: "#ff0000",
		});
		expect(getColor("green")).toMatchObject({
			hex: "#008000",
		});
		expect(getColor("blue")).toMatchObject({
			hex: "#0000ff",
		});
		expect(() => getColor(null as unknown as string)).toThrow(
			"Error: invalid color null or empty colorSet",
		);
	});

	it("Get colors function", () => {
		const expected = [
			{
				name: "white",
				hex: "#ffffff",
				rgb: "rgb(255,255,255)",
				hsl: "hsl(0,0%,100%)",
			},
			{
				name: "black",
				hex: "#000000",
				rgb: "rgb(0,0,0)",
				hsl: "hsl(0,0%,0%)",
			},
		];
		const colors = getColors();
		// check if the length of the colors is the same as the length of the colorSet
		expect(colors).toHaveLength(ColorSet.length);

		// check if the colors expected are included in the colors
		expect(colors).toEqual(expect.arrayContaining(expected));
	});
});
