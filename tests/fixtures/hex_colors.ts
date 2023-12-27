// https://github.com/web-platform-tests/wpt/blob/master/css/css-color/parsing/color-computed-hex-color.html
export const hex_valid_tests = [
  ["#fff", "rgb(255, 255, 255)", "Valid 3-digit hex"],
  ["#ffff", "rgb(255, 255, 255)", "Valid 4-digit hex"],
  ["#ffffff", "rgb(255, 255, 255)", "Valid 6-digit hex"],
  ["#ffffffff", "rgb(255, 255, 255)", "Valid 8-digit hex"],
  ["#FFCc99", "rgb(255, 204, 153)", "Valid 6-digit hex"],
  ["#369", "rgb(51, 102, 153)", "Valid 3-digit hex"],
];

// https://github.com/web-platform-tests/wpt/blob/master/css/css-color/parsing/color-invalid-hex-color.html
export const hex_invalid_tests = [
  ["#", "Should not parse invalid hex"],
  ["#f", "Should not parse invalid hex"],
  ["#ff", "Should not parse invalid hex"],
  // ["#ffg", "Should not parse invalid hex"],
  // ["#fffg", "Should not parse invalid hex"],
  // ["#fffff", "Should not parse invalid hex"],
  // ["#fffffg", "Should not parse invalid hex"],
  // ["#fffffff", "Should not parse invalid hex"],
  // ["#fffffffg", "Should not parse invalid hex"],
  // ["#fffffffff", "Should not parse invalid hex"],
];
