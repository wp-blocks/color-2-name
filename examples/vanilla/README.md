# Vanilla JavaScript Examples

This directory contains vanilla JavaScript examples for the color-2-name library.

## closest-example-standalone.html

A complete standalone HTML page demonstrating the `closest` function with:

- **Basic Usage**: Finding the closest color name for `#ff8800`
- **Custom Color Set**: Using a custom set of colors for comparison
- **Additional Info**: Getting detailed information about the closest color
- **Interactive Demo**: Try any color value to see its closest name with a native color picker

### How to Run

Simply open `closest-example-standalone.html` in your web browser. No build step required and no CORS issues.

This version loads the actual color-2-name library from unpkg CDN using a UMD bundle, so it works when opening the file directly in the browser without any server.

## closest-example.html

The original version that uses ES6 modules. This requires:
- Either opening through a web server (not file:// protocol)
- Or using a local development environment

### Code Examples

```javascript
// Basic usage
const closestColor = closest('#ff8800');
console.log(closestColor); // { name: 'orange', color: 'rgb(255,165,0)' }

// Custom color set
const customResult = closest('#ff8800', [
  [255, 0, 0, 'red'],
  [0, 255, 0, 'green'],
  [0, 0, 255, 'blue']
]);
console.log(customResult); // { name: 'red', color: 'rgb(255,0,0)' }

// With additional info
const infoResult = closest('#ff8800', undefined, { info: true });
console.log(infoResult); // Includes hex, hsl, distance, etc.
```

### CDN Usage

If you want to use the CDN version, you need to serve the file through a web server:

```javascript
// For use with a web server (not file:// protocol)
import { closest } from 'https://www.unpkg.com/color-2-name@latest/dist/index.js';
```
