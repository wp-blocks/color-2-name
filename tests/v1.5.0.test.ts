import { describe, expect, it, vi } from "vitest";
import { closest, getColors } from "../src";
import { BLACKANDWHITE } from "../src/common";
import { hslToRgb } from "../src/hsl-utils";
import { parseHex } from "../src/hex-utils";
import type { RGBCOLORDEF } from "../lib/types";

describe("Verification Tests", () => {
	describe("Critical Bugs", () => {
		it("should have correct black definition", () => {
			const black = BLACKANDWHITE.find((c) => c[3] === "black") as RGBCOLORDEF;
			expect(black).toBeDefined();
			expect(black[0]).toBe(0);
			expect(black[1]).toBe(0);
			expect(black[2]).toBe(0);
		});

		it("should convert HSL to RGB correctly (0-6 hue range fix)", () => {
			// Test case that would fail with 0-360 range passed to getHue
			// Hue 0 (Red)
			expect(hslToRgb(["0", "100", "50"])).toEqual({ r: 255, g: 0, b: 0 });
			// Hue 120 (Green)
			expect(hslToRgb(["120", "100", "50"])).toEqual({ r: 0, g: 255, b: 0 });
			// Hue 240 (Blue)
			expect(hslToRgb(["240", "100", "50"])).toEqual({ r: 0, g: 0, b: 255 });
			// Hue 60 (Yellow)
			expect(hslToRgb(["60", "100", "50"])).toEqual({ r: 255, g: 255, b: 0 });
		});
	});

	describe("Performance Optimizations", () => {
		it("getColors should return all colors with correct structure", () => {
			const colors = getColors();
			expect(colors.length).toBeGreaterThan(0);
			const first = colors[0];
			expect(first).toHaveProperty("name");
			expect(first).toHaveProperty("hex");
			expect(first).toHaveProperty("rgb");
			expect(first).toHaveProperty("hsl");
		});

		it("closest should return correct color", () => {
			const result = closest("#ff0000");
			expect(result.name).toBe("red");
		});

		it("closest should work with caching (repeated calls)", () => {
			const result1 = closest("#00ff00");
			const result2 = closest("#00ff00");
			expect(result1).toEqual(result2);
			expect(result1.name).toBe("lime");
		});
	});
});
