import colorSet from "./data/colorSet";
import { RGBCOLORDEF } from "./types";
import { valuesToRgb } from "./rgb-utils";
import { valuesToHex } from "./hex-utils";
import { valuesToHsl } from "./hsl-utils";

/**
 * This function was the opposite of the name of the repo and returns the color of the colorSet given the name
 *
 * @param {string} searchedColor -the name of the color to search for
 * @param {Array} set - the colorSet to search in
 */
function getColor(searchedColor: string, set: RGBCOLORDEF[] | undefined = colorSet as RGBCOLORDEF[]) {
  const found: RGBCOLORDEF | undefined = set.find((color: RGBCOLORDEF) => color[3] === searchedColor);

  if (typeof found !== "undefined") {
    const [r, g, b] = found;
    return {
      hex: valuesToHex({ r, g, b }),
      rgb: valuesToRgb({ r, g, b }),
      hsl: valuesToHsl({ r, g, b }),
    };
  }
  throw new Error(`Error: invalid color ${searchedColor} or empty colorSet`);
}

export default getColor;
