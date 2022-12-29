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

function processSet (newSet, filename) {
  const generated = buildColorSet(newSet)
  const setName = `const colorSet: RGBCOLORDEF[] = `
  const exportName = `

export default ${filename}ColorSet`

  const generatedJson = setName + JSON.stringify(generated, null, 2) + exportName

  fs.writeFile('./src/data/' + filename + 'ColorSet.ts', generatedJson, (err, data) => {
    if (err) {
      return console.log(err)
    }
    console.log(data)
  })
}

const filename = process.argv[2].replace(/[^a-z0-9]/gi, '')
const fileUri = './src/data/' + filename + '.json'
console.log('Reading ' + fileUri)
const set = fs.readFileSync(fileUri, 'utf8').replace(/\r\n/g, '\n').toString()
const jsonSet = JSON.parse(set)
console.log(jsonSet)
processSet(jsonSet, filename)
