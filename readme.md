# color-2-name

<div>
  <a href="https://github.com/erikyo/color-2-name/actions">
    <img alt="build" src="https://img.shields.io/github/actions/workflow/status/erikyo/color-2-name/node.js.yml" />
  </a>
  <a href="https://github.com/erikyo/color-2-name/actions">
    <img alt="build" src="https://github.com/erikyo/color-2-name/actions/workflows/node.js.yml/badge.svg" />
  </a>
</div>

Find the name of the color given a hex, rgb and hsl string!

This package provides a function to find the closest color to a given one from an array of colors.
It uses the Euclidean distance formula to calculate the distance between colors in the RGB color space.

Demo [https://erikyo.github.io/color-2-name/](https://erikyo.github.io/color-2-name/)

### Features:

- 🚀 Fast - The distance between colors in the RGB color space is determined with the fastest algorithm and if the distance is 0 the function immediately returns the color name without further calculation
- 😎 Ally - So that your app is equally useful for everyone
- 🪶 Lightweight - The module WITH the 140 css colors definitions weights 4kb gzipped!
- ✅ Umd module - Works with browsers and with nodejs
- 📦 Bundled - Webpack optimized and minified build!
- 🪅 Easy to use - You don't need to convert the color before calling the function! the color format will be found automatically
- 🎨 Build your scheme - You can use the node script to build your scheme
- 🪄️ Typed: Written in typescript (with types included)
- 🎈 No dependencies: dependencies tend to have dependencies endlessly and this can lead to security issues. This is a small module, and it doesn't need anything else!

## Installation

### As a Node module

To install the package, run the following command:

```
npm install color-2-name
```

Import the `closest` function from the color-2-name package:

```js
// es6 import
import {closest} from 'color-2-name';
```

### As script (browser)

include script tag like below in your head/footer:

```js
// add the script tag to the head/footer
<script src="color-2-name.js"></script>
```

Then the color-2-name module will be available using the following command:

```js
// With browsers you can find the packed scripts into window.color2name
color2name.closest('#123456') // color name
color2name.rgbToHex('rgb(18 52 86)') // #123456
color2name.distance([0, 0, 0], [255, 255, 255]) // 431.12

// With node / es6 import
import {closest, distance, rgbToHex} from 'color-2-name';
closest('hsla(210deg 10% 96%)') // white

// With node / require
var color2Name = require("color-2-name")
color2Name.closest('#abcdef')
```

---

This Package includes the following functions:

- closest()
- distance()
- RgbToHex()
- isLight()
- isDark()
- isLightOrDark()
- closestRGB()

### 💡 closest()

Returns the closest color name

```js
// Here is an example of how to use the findClosestColor function:
const closestColor = closest('#ff8800');
console.log(closestColor); // { name: 'red', color: 'rgb(255,0,0)' }

// You can also use your custom set as comparation
const closestColor = closest('#ff8800');
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

#### 💡 RgbToHex()

Convert a rgb color into hexadecimal color

```js
// note: the rgb value is converted without take into account the alpha channel
const hex = RgbToHex('rgb(255,255,255)')
const hex2 = RgbToHex('rgb(255 255 255 / .5)')
// prints the hex result
console.log(hex); // #FFFFFF
console.log(hex2); // #FFFFFF
```

Arguments:

- `rgb`: a valid css rgb or rgba value (eg. rgb(1,2,3))

**RETURNS** the hex value of the color

---

#### 💡 getColor()

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

#### 💡 isLight()

Check if the color is light (optically closer to white)

#### 💡 isDark()

Check if the color is dark (optically closer to black)

#### 💡 isLightOrDark()

Returns light or dark whether the color is lighter or darker

#### 💡 closestRGB()

returns the closest RGB color

Arguments:

- `color`: a valid css color string

Examples:

```js
// note: the rgb value is converted without take into account the alpha channel
isLight('#fff') // true
isDark('#fff') // false
isLightOrDark('#abc') // light
isLightOrDark('#345') // dark
closestRGB('#FF1234') // red
```

---

#### 💡 Build your own color set

In order to build a color set you need a json object with the following properties::
- `name` - the name of the color (like "Orange")
- `color` - the hex color value (like #FFAA00)

then run:

```bash
node colorSetUtils.mjs myNewColorSet
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

This package is licensed under the MIT License. See the LICENSE file for details.

### Credits

The wiki about the euclidean distance formula https://en.wikipedia.org/wiki/Color_difference

Some useful ideas and codes has been taken from the article on the website css-tricks at https://css-tricks.com/converting-color-spaces-in-javascript/
