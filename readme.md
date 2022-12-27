# color2name

Find the name of the color given a hex, rgb and hsl string!

This package provides a function to find the closest color to a given one from an array of colors.
It uses the Euclidean distance formula to calculate the distance between colors in the RGB color space.

### Features:
- 🚀 Fast - The distance between colors in the RGB color space is determined with the fastest algorithm and if the distance is 0 the function immediately returns the color name without further calculation
- 😎 Ally - So that your app is equally useful for everyone
- 🪶 Lightweight - The script with all the 140 css colors definitions weights 10.3Kb (uncompressed)!
- ✅ Umd module - Works with browsers and with nodejs
- 🪅 Easy tu use - You don't need to convert the color before calling the function! the color format will be found automatically
- 🎨 Build your scheme - You can use the node script to build your scheme
- 🪄️ Typed: Written in typescript (with types included)
- 🎈 No dependencies: dependencies tend to have dependencies endlessly and this can lead to security issues. This is a small module, and it doesn't need anything else!

## Installation

### As a Node module
To install the package, run the following command:

```
npm install color2name
```
Import the findClosestColor function from the color2name package:

```js
import { closest } from 'color2name';
```

### As script (browser)

include script tag like below in your head/footer:

```js
<script src="color2name.js"></script>
```

then the script will be available using the following command:

```js
// with browsers
color2name.closest('#123456')

// with node
import { closest, distance } from 'color2name';
closest('rgb(1,2,3)')
```

---

This Package includes the following functions:

#### 💡 closest()
Returns the closest color name

```js
// Here is an example of how to use the findClosestColor function:
const closestColor = color2name.closest('#ff8800');
console.log(closestColor); // { name: 'red', color: 'rgb(255,0,0)' }
```
In this example, the hex color '#ff8800' (which is a shade of orange) is compared to the colors in the colors array. The function returns the object with the name and hex value of the color that is closest to it, which in this case is the object for the color red.
Arguments:

- `color`: a string representing a color, accepts hexadecimal, rgb and hsl with and without alpha channel (e.g. `#ff0000` for hex red).
- `colors`: (optional) you can provide to this function a custom list of color names to be used (replaces the default)
- `args`: (optional) an Object that contains setup for this module
- `args.info`: (optional) set to true to display additional information the found color, like the hex value and the distance from the original

**RETURNS** an object with the name and nearest color that is closest to the given color. (eg. `{ name: 'red', color: 'rgb(255,0,0)' }`)



#### 💡distance()
Computes the distance between two colors using the euclidean distance formula.

```js
const colorDivergence = distance([120, 255, 200], [255, 255, 255])
console.log(colorDivergence); // 123.465
```

Arguments:

- `rgb1`: an array of values representing rgb of the first color to be compared
- `rgb2`: an array of values representing rgb of the second color to be compared

**RETURNS** the distance between two colors, the maximum distance is >441 and the color is exactly the same when the value is 0

#### 💡 RgbToHex()
Convert a rgb color into hexadecimal color

```js
// note: the rgb value is converted without take into account the alpha channel
const hex = RgbToHex('rgb(255,255,255)')
const hex2 = RgbToHex('rgb(255 255 255 / .5)')
console.log(hex); // #FFFFFF
console.log(hex2); // #FFFFFF
```
Arguments:

- `rgb`: a valid css rgb or rgba value (eg. rgb(1,2,3))

**RETURNS** the hex value of the color

---

#### 💡 Build your own color set

In order to build a color set you need a json object with the following properties::
`name` - the name of the color (like "Orange")
`color` - the hex color value (like #FFAA00)

then run:

```bash
node colorSetUtils.mjs myNewColorSet
```
A new file called "myNewColorSet.ts" containing the data for this module will be written inside the ./src/data/ folder

---

### Limitations
This package uses the Euclidean distance formula to calculate the distance between colors in the RGB color space. While this is a simple and widely used method for comparing colors, it may not always give the most accurate results. In particular, it does not take into account the perception of colors by the human eye, which can be affected by factors such as the surrounding colors and the luminance of the colors.

### Contributing
If you would like to contribute to this package, please follow the guidelines in the CONTRIBUTING.md file.

### License
This package is licensed under the MIT License. See the LICENSE file for details.

### Credits
The wiki about the euclidean distance formula https://en.wikipedia.org/wiki/Color_difference

Some useful ideas and codes has been taken from the article on the website css-tricks at https://css-tricks.com/converting-color-spaces-in-javascript/
