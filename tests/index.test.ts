import colorSet from '../src/data/colorSet'
import getColor from "../src/color-utils";

describe('Main name-2-color functions', () => {

  it('Returns the correct numbers of color', () => {
    expect(colorSet.length).toBeGreaterThan(140)
  })
})

describe('Name to color, basically the exact opposite of the repo name. Useful in case we need to revert the process', () => {
  it('Returns an Object with the hex, rgb and hsl value of the color (by name)', () => {
    expect( getColor('white') ).toMatchObject({"hex": "#ffffff", "hsl": "hsl(0,0%,100%)", "rgb": "rgb(255,255,255)"})
    expect( getColor('red') ).toMatchObject({"hex": "#ff0000", "hsl": "hsl(0,100%,50%)", "rgb": "rgb(255,0,0)"})
    expect( getColor('tomato') ).toMatchObject({"hex": "#ff6347", "hsl": "hsl(9,100%,63.9%)", "rgb": "rgb(255,99,71)"})
    expect( getColor('yellowgreen') ).toMatchObject({"hex": "#9acd32", "hsl": "hsl(80,60.8%,50%)", "rgb": "rgb(154,205,50)"})
    expect( getColor('greenyellow') ).toMatchObject({"hex": "#adff2f", "hsl": "hsl(84,100%,59.2%)", "rgb": "rgb(173,255,47)"})
    expect( getColor('darkblue') ).toMatchObject({"hex": "#00008b", "hsl": "hsl(240,100%,27.3%)", "rgb": "rgb(0,0,139)"})
    expect( () => getColor('asdasdasd') ).toThrowError()
    expect( () => getColor('white', []) ).toThrowError()
  } )
} )
