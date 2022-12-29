/**
 * This function was the opposite of the name of the repo and returns the color of the colorSet given the name
 *
 * @param searchedColor -the name of the color to search for
 * @param colorSet - the colorSet to search in
 */
declare function getColor(searchedColor: string, set?: RGBCOLORDEF[] | undefined): Object | Error;
export default getColor;
