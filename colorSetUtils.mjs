import fs from 'fs'

/**
 * It takes an array of Objects {name, color} and returns an object with a color set compatible with this repository
 * the color is expected to be a hexadecimal value with 6 characters (+ the sharp at the beginning of the string) e.g. "#000000"
 *
 * @param colorSet
 */
export function buildColorSet (colorSet) {
  const colors = []
  colorSet.forEach((o) => {
    // Extract the RGB values from the hex string
    const r = parseInt(o.color.substring(1, 3), 16)
    const g = parseInt(o.color.substring(3, 5), 16)
    const b = parseInt(o.color.substring(5, 7), 16)
    const color = [r, g, b, o.name]
    colors.push(color)
  })
  return colors
}

/**
 *
 * @param newSet
 * @param filename
 *
 * @return {boolean} true whenever the file is successfully written
 */
export function processSet (newSet, filename) {
  const generated = buildColorSet(newSet)
  const setName = `const ${filename}: RGBCOLORDEF[] = `
  const exportName = `

export default ${filename}`

  const generatedJson = setName + JSON.stringify(generated, null, 2) + exportName

  console.log('writing into ./src/data/' + filename + '.ts')

  fs.writeFile('./src/data/' + filename + '.ts', generatedJson, (err, data) => {
    if (err) {
      console.log(err)
      return false
    }
    console.log(data)
    return true
  })
}

/**
 * This function will read the data from a json file then output it into a ts file that contains the colorSet data into a compatible format with this module
 *
 * @param {*} filename
 * @param {string} fileUri
 */
export function generateColorSet(filename, fileUri) {
  console.log('Reading ' + fileUri)
  const set = fs.readFileSync(fileUri, 'utf8').replace(/\r\n/g, '\n').toString()

  /** the json with the colorSet */
  const jsonSet = JSON.parse(set)

  return processSet(jsonSet, filename)
}

const filename = process.argv[2].replace(/[^a-z0-9]/gi, '')
const fileUri = './src/data/' + filename + '.json'

/** Create the colorset then output the result */
if ( generateColorSet(filename, fileUri) ) {
  console.log('😎 Successfully created colors set ./src/data/' + filename + '.ts')
} else {
  console.log( '😓 Something went wrong! cannot create colors set ./src/data/' + filename + '.ts')
}
process.exit(0)
