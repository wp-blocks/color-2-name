/**
 * Types definition for common colors formats
 * supported format are: rgb, rgba, hsl, hsla, hex, hex+alpha
 */
export type RGB = `rgb(${string},${string},${string})`;
export type HSL = `hsl(${string},${string},${string})`;
export type HEX = `#${string}` | string;

export type WithAlpha<O> = O & { a: number };
export type RGBA = WithAlpha<RGB>;
export type HSLA = WithAlpha<HSL>;

export type COLORSTRING = RGB | RGBA | HSL | HSLA | HEX;

/* HSL */
export interface HSLVALUE {
	h: number;
	s: number;
	l: number;
}

/* RGB */
export interface RGBVALUE {
	r: number;
	g: number;
	b: number;
}
export type RGBCOLORDEF = [number, number, number, string];
export type RGBDEF = [number, number, number];

/* HEX */
export type colorName = string;

export interface COLORDEF {
	name: colorName;
	color: COLORSTRING;
	hex?: string;
	hsl?: string;
	gap?: number;
}

export interface ColorParsers {
	regex: RegExp;
	parser: (color: string) => string[];
	converter: (colorSet: string[]) => RGBVALUE;
}

export type colorListHEX = Array<{ name: string; color: string }>;
