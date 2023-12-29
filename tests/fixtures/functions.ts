export function normalizeRGB(rgba: string): string {
  // Extract the individual components (red, green, blue, alpha) from the RGBA string
  const match = rgba.match(/(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)/);

  if (!match) {
    return rgba.replace(/ /g, '');
  }

  const [, red, green, blue] = match;

  // Construct the RGB color string
  return `rgb(${red},${green},${blue})`;
}
