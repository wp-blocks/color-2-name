# color-2-name

[![](https://img.shields.io/npm/v/color-2-name.svg?label=npm%20version)](https://www.npmjs.com/package/color-2-name)
[![](https://badgen.net/npm/types/color-2-name)](https://github.com/wp-blocks/color-2-name/blob/main/LICENSE)
[![](https://badgen.net/bundlephobia/minzip/color-2-name)](https://badgen.net/bundlephobia/minzip/color-2-name)
[![](https://img.shields.io/npm/l/color-2-name)](https://github.com/wp-blocks/color-2-name/blob/main/LICENSE)
[![](https://github.com/wp-blocks/color-2-name/actions/workflows/node.js.yml/badge.svg)](https://github.com/wp-blocks/color-2-name/actions/workflows/node.js.yml)

Find the name of the color given a hex, rgb and hsl string!

This package provides a function to find the closest color within an array of colors.
It uses the Euclidean distance formula to calculate the distance between colors in the RGB color space.

### Features:

- 🚀 **Fast** - The distance between colors in the RGB color space is provided with the fastest algorithm available (check below)
- 😎 **Ally** - So that your app is equally useful for everyone
- 📒 **Well Documented** - Checkout the [documentation](https://wp-blocks.github.io/color-2-name/) with examples, demo and code references
- 🪶 **Lightweight** - The module WITH the 140 css colors definitions [weights 3.5kb gzipped](https://bundlephobia.com/package/color-2-name)!
- 📦 **Bundled** - Optimized and minified build, with ESM, CJS and iife browser versions available!
- 💪️ **Typed** - Written in typescript (with types included)
- 🛡️️ **Tested** - Over 4000 tests (most of all from [wpt](https://github.com/web-platform-tests/wpt/)) with 100% coverage to ensure the full adherence to the css standards
- 🎈 **No dependencies** - Dependencies tend to have dependencies endlessly, and this can lead to security issues. This is a small module, and it doesn't need anything else!

## 🚀 Benchmarks

Designed with the performance in mind, it is 10 times faster than the self-proclaimed fastest color conversion plugin!

| Library                                                            | <nobr>Operations/sec</nobr>                                | Size<br /> (minified)                                                                                                           | Size<br /> (gzipped)                                                                                                                                                                       |
|--------------------------------------------------------------------|------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr><b>[color-2-name](#color-2-name) v1.3.2 🚀</b></nobr>        | <nobr>🟢 <b>7 516 ops/s,</b> ±0.55%%</nobr>                | [![color-2-name](https://snyk.io/advisor/npm-package/color-2-name/badge.svg)](https://snyk.io/advisor/npm-package/color-2-name) | [![](https://badgen.net/bundlephobia/minzip/color-2-name?color=yellow&label=)](https://bundlephobia.com/result?p=color-2-name)                                                             |
| <nobr>[colord](https://www.npmjs.com/package/colord) v2.9.3</nobr> | <nobr>🔴 736 ops/s, ±0.29%        ( 90.21%% slower)</nobr> | [![colord](https://snyk.io/advisor/npm-package/colord/badge.svg)](https://snyk.io/advisor/npm-package/colord)                   | [![](https://badgen.net/bundlephobia/minzip/colord?color=6ead0a&label=)](https://bundlephobia.com/result?p=colord) + [plugins](https://github.com/omgovich/colord/tree/master/src/plugins) |

- The performance results were generated on a common Intel i5 by running `npm run benchmark` in the library folder. See [benchmarks](https://github.com/wp-blocks/color-2-name/blob/main/tests/bench/src/benchmark.ts).
- For the test we are generating 50 random colors to make sure that no internal mechanism is benefited
- The Size for the `colord` package is meant without the color definitions while `color-2-name` already has everything you need bundled inside

## Installation

### Module

To install the package, run the following command:

```
npm install color-2-name
```

Then you can import or require the color-2-name function e.g. `closest` function from the color-2-name package:

```js
// ESM (import) - tree shakable
import {closest, distance, rgbToHex} from 'color-2-name';
closest('hsla(210deg 10% 96%)') // white

// CJS (require)
var color2Name = require("color-2-name")
color2Name.closest('#abcdef')
```

### Browser

To run the script in the browser, add the `color-2-name` add it to the header or footer like below

```js
<script src="https://www.unpkg.com/color-2-name"></script>
<script>
    // Then the color-2-name module will be available using the following command:
    // You will find the packed script loaded into window.color2name
    color2name.closest('#123456') // returns "name" : "midnightblue" , "color" : "rgb(25,25,112)"
</script>
```

#### The script is available at:
- [unpkg](https://www.unpkg.com/color-2-name) - https://www.unpkg.com/color-2-name
- [jsdelivr](https://cdn.jsdelivr.net/npm/color-2-name@latest) - https://cdn.jsdelivr.net/npm/color-2-name@latest

---

This Package includes the following functions:

- [closest()](#closest)
- [distance()](#distance)
- [rgbToHex()](#rgbToHex)
- [isLight()](#isLight)
- [isDark()](#isDark)
- [closestRGB()](#closestRGB)
- [getColor()](#getColor)

### 💡closest()

Returns the closest color name

```js
// Here is an example of how to use the findClosestColor function:
const closestColor = closest('#ff8800');
console.log(closestColor); // { name: 'red', color: 'rgb(255,0,0)' }

// You can also use your custom set as comparation
return closest('#ff8800', [
  [255, 0, 0, 'red'],
  [0, 255, 0, 'green']
]); // -> { name: 'red', color: 'rgb(255,0,0)' }

// Alternatively you can also get the closest color in different color spaces in the following way:
return closest('#ff00ff', undefined, {info: true});
// {
//    name: 'magenta',
//    color: 'rgb(255,0,255),
//    hex: '#ff00ff',
//    hsl: 'hsl(300deg 100% 50%)',
//    distance: 0
// }
```

In this example, the hex color '#ff8800' (which is a shade of orange) is compared to the colors in the colors array. The function returns the object with the name and hex value of the color that is closest to it, which in this case is the
object for the color red.

Arguments:

- `color`: a string representing a color, accepts hexadecimal, rgb and hsl with and without alpha channel (e.g. `#ff0000` for hex red).
- `colors`: (optional) you can provide to this function a custom list of color names to be used (replaces the default)
- `args`: (optional) an Object that contains setup for this module
- `args.info`: (optional) set to true to display additional information the found color, like the hex value and the distance from the original

**RETURNS** an object with the name and nearest color that is closest to the given color. (eg. `{ name: 'red', color: 'rgb(255,0,0)' }`)

---

#### 💡distance()

Computes the distance between two colors using the euclidean distance formula.

```js
// Here is an example on how get the distance between two colors
const colorDivergence = distance([120, 255, 200], [255, 255, 255])
console.log(colorDivergence); // 123.465
```

Arguments:

- `rgb1`: an array of values representing rgb of the first color to be compared
- `rgb2`: an array of values representing rgb of the second color to be compared

**RETURNS** the distance between two colors, the maximum distance is >441 and the color is exactly the same when the value is 0

---

#### rgbToHex

Convert a rgb color into hexadecimal color

```js
// note: the rgb value is converted without take into account the alpha channel
const hex = rgbToHex('rgb(255,255,255)')
const hex2 = rgbToHex('rgb(255 255 255 / .5)')
// prints the hex result
console.log(hex); // #FFFFFF
console.log(hex2); // #FFFFFF
```

Arguments:

- `rgb`: a valid css rgb or rgba value (eg. rgb(1,2,3))

**RETURNS** the hex value of the color

---

#### 💡getColor()

search into ColorSet for the given color

```js
// note: the rgb value is converted without take into account the alpha channel
const white = getColor('white') // {"hex": "#ffffff", "hsl": "hsl(0,0%,100%)", "rgb": "rgb(255,255,255)"}
const alertColor = getColor('red') // {"hex": "#ff0000", "hsl": "hsl(0,100%,50%)", "rgb": "rgb(255,0,0)"}

// prints the hex result
console.log(alertColor.hsl); // #FFFFFF
console.log(alertColor.hex); // #FF0000
console.log("transparent red: " + alertColor.hex + "88"); // #FF000088
```

Arguments:

- `colorName`: the name of a color you need find in the colorset

**RETURNS** an Object with the color requested converted into hex, rgb and hsl

---

### Useful (additional) functions

#### 💡isLight()

Check if the color is light (optically closer to white)

#### 💡isDark()

Check if the color is dark (optically closer to black)

#### 💡closestRGB()

returns the closest RGB color

Arguments:

- `color`: a valid css color string

Examples:

```js
// note: the rgb value is converted without take into account the alpha channel
isLight('#fff') // true
isDark('#fff') // false
closestRGB('#FF1234') // red
```

---

#### 💡Build your own color set

First thing, clone the color-2-name package with `git clone https://github.com/wp-blocks/color-2-name.git` then cd into color-2-name folder.

In order to build a color set you need a json object with the following properties:
- `name` - the name of the color (like "Orange")
- `color` - the hex color value (like #FFAA00)

save it into ./src/data/ as "myNewColorSet.json". the file will contain something like this:

```json
[
    { "name": "white", "color": "#FFFFFF" },
    { "name": "black", "color": "#000000" },
    { "name": "red", "color": "#FF0000" },
    { "name": "green", "color": "#008000" },
    { "name": "blue", "color": "#0000FF" }
]
```

```bash
# then run the following command
$ node colorSetUtils.mjs myNewColorSet
```

**RETURNS** A new file called "myNewColorSet.ts" containing the data for this module will be written inside the ./src/data/ folder

---

### Examples

This module is meant to be used in conjunction with React's color picker, so that the color name is shown as you select it. It can also be used in other ways of course, such as to determine whether a color is light or dark (using a custom
color set with black and white) etc.

![picker](https://user-images.githubusercontent.com/8550908/209803600-81954bea-63a0-4951-ac4c-a965a9d93bca.gif)

### Limitations

This package uses the Euclidean distance formula to calculate the distance between colors in the RGB color space. While this is a simple and widely used method for comparing colors, it may not always give the most accurate results. In
particular, it does not take into account the perception of colors by the human eye, which can be affected by factors such as the surrounding colors and the luminance of the colors.

### Contributing

If you would like to contribute to this package, please follow the guidelines in the CONTRIBUTING.md file.

### License

This package is licensed under the ISC License. See the LICENSE file for details.

### Credits

The wiki about the Euclidean distance formula https://en.wikipedia.org/wiki/Color_difference

Some useful ideas and codes has been taken from the article on the website css-tricks at https://css-tricks.com/converting-color-spaces-in-javascript/
