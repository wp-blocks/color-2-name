import b from 'benny'
import { colord, extend } from 'colord'
import namesPlugin from "colord/plugins/names"
import {closest} from "color-2-name"
import * as fs from "fs";

extend([namesPlugin])

const randomColor = () => '#' + [1,2,3].map(() => Math.floor(Math.random() * 255 ).toString(16).padStart(2, "0") ).join("")

const randoms = new Array(50).fill(0).map(() => randomColor())

console.log('colors used for tests', randoms)

b.suite(
  'Convert a random color to a name',

  b.add('color2name', () => {
    randoms.forEach((i) => closest(i))
  }),

  b.add('colord', () => {
    randoms.forEach((i) => colord(i).toName({ closest: true }))
  }),

  b.cycle(),
  b.complete()
).then( () => {
  // get the benchmark folder path
  const path = process.cwd() + '/bench'
  if (fs.existsSync(path)) {
    console.log('Removing bench folder at ' + path)
    fs.rmSync(path, {recursive: true})
  }
  process.exit()
} )
