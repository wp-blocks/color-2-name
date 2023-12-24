/* eslint-disable @typescript-eslint/ban-ts-comment */
import b from 'benny'
import { colord, extend } from 'colord'
import namesPlugin from 'colord/plugins/names'
import {closest} from "../src";
import * as fs from "fs";

extend([namesPlugin])

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)

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
)

// get the benchmark folder path
const path = process.cwd() + '/bench'
if (fs.existsSync(path)) {
  console.log('Removing bench folder at ' + path)
  fs.rmSync(path, {recursive: true})
}
