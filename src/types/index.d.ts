/**
 * Types definition for common colors formats
 * supported format are: rgb, rgba, hsl, hsla, hex, hex+alpha
 */
type RGB = `rgb(${number},${number},${number})`
type HSL = `hsl(${number},${number},${number})`
type HEX = `#${string}`

type WithAlpha<O> = O & { a: number }
type RGBA = WithAlpha<RGB>
type HSLA = WithAlpha<HSL>

type colorString = RGB | RGBA | HSL | HSLA | HEX

/* HSL */
interface HSLVALUE { h: number, s: number, l: number }

/* RGB */
interface RGBVALUE { r: number, g: number, b: number }
type RGBCOLORDEF = [number, number, number, string]
type RGBDEF = [number, number, number]

/* HEX */
type colorName = string

interface COLORDEF { name: colorName, color: colorString }
interface COLORDEFINFO { name: colorName, color: colorString, hex: string, gap: number }
type colorListHEX = Array<{ name: string, color: string }>
