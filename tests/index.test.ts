import colorSet from '../src/data/colorSet'
// import buildColorSet from '../colorSetUtils.mjs'

import {closest, closestRGB, distance, isDark, isLight, isLightOrDark, rgbToHex} from '../src'
import {MAXDISTANCE} from '../src/common'
import getColor from "../src/color-utils";

describe('Main name-2-color functions', () => {

  it('Returns the correct numbers of color', () => {
    expect(colorSet.length).toBeGreaterThan(140)
  })

  // it('Can rebuild the original Color Set, disabled since doesn't work with ts test suite', () => {
  //  expect( buildColorSet() ).toMatchObject(colorSet)
  // })

})

describe('Color Conversions functions', () => {
  it('Returns the correct distance between colors', () => {
    // default args
    expect(distance([0, 0, 0], [255, 255, 255, 'White'])).toBeCloseTo(MAXDISTANCE, 10)
    expect(distance([255, 255, 255], [255, 255, 255, 'White'])).toBe(0)
    expect(distance([10, 20, 30], [120, 120, 120])).toBeCloseTo(173.78)

    // fast calculation
    expect(distance([255, 255, 255], [255, 255, 255, 'White'], true)).toBe(0)
    expect(distance([0, 0, 0], [255, 255, 255, 'White'], true)).toBe(195075)

    // this need to return the same distance as the first test, since the fast mode is exponential
    expect(
      Math.sqrt(
        distance([0, 0, 0], [255, 255, 255, 'White'], true)
      )
    ).toBeCloseTo(MAXDISTANCE, 10)
  })

  it('Returns the correct name of the color', () => {
    // HEX
    expect(closest('#000000')).toMatchObject({ name: 'black' })
    expect(closest('#ff0000')).toMatchObject({ name: 'red' })
    expect(closest('#ffffff')).toMatchObject({ name: 'white'})
    expect(closest('#fffffe')).toMatchObject({ name: 'white'})
    //RGB
    expect(closest('rgb(255,255,255)')).toMatchObject({ name: 'white'})
    expect(closest('rgba(255,255,255,0.1)')).toMatchObject({ name: 'white'})
    expect(closest('rgba(255,255,255,.1)')).toMatchObject({ name: 'white'})
    expect(closest('rgba(255 255 255 /.1)')).toMatchObject({ name: 'white'})
    // HSL
    expect(closest('hsl(255,0%,100%,.1)')).toMatchObject({ name: 'white'})
    // INFO
    expect(closest('rgb(255,0,255)', undefined, {info: true})).toMatchObject({ name: 'magenta', hex: '#ff00ff', gap: 0  })
    // INFO FUNKY CONFIGURATION
    expect(closest('#FFF', undefined, {info: "YES"})).toMatchObject({ name: 'white', hex: '#ffffff' })
    // INFO DISABLED
    expect(closest('hsl(255,0%,100%)', undefined, {info: false})).toMatchObject({ name: 'white' })
    // THROW ERR
    expect(closest('#111', [])).toMatchObject({ name: 'error' })
  })

  it('Returns convert rgb values to hex', () => {
    expect(rgbToHex('rgb(255,255,255)')).toBe("#ffffff")
    expect(rgbToHex('rgb(255, 255, 255,.5)')).toBe("#ffffff")
    expect(rgbToHex('rgb(255 255 255)')).toBe("#ffffff")
    expect(rgbToHex('rgb(255 255 255 / .5)')).toBe("#ffffff")
    expect(rgbToHex('rgba(255 255 255 / 0.1)')).toBe("#ffffff")
  })

  it('Returns if the color is bright or dark', () => {
    expect(isLight('rgb(255,255,255)')).toBe(true)
    expect(isLight('rgba(255,255,255,0.2)')).toBe(true)
    expect(isLight('#FFF')).toBe(true)
    expect(isLight('hsl(0,0%,100%)')).toBe(true)
    expect(isLight('hsla(0,0%,100%,10%)')).toBe(true)

    expect(isLight('#aaa')).toBe(true)
    expect(isDark('#666')).toBe(true)
    expect(isLight('#FF0000')).toBe(false)

    expect(isDark('rgb(0,0,0)')).toBe(true)
    expect(isDark('#000')).toBe(true)
    expect(isDark('#000000')).toBe(true)
    expect(isDark('hsl(0,0%,0%)')).toBe(true)
    expect(isDark('hsla(0,0%,0%,10%)')).toBe(true)

    expect(isLightOrDark('#111')).toBe('dark')
    expect(isLightOrDark('#aaa')).toBe('light')
    expect(isLightOrDark('#F00')).toBe('dark')
    expect(isLightOrDark('#FF0000')).toBe('dark')
    expect(isLightOrDark('#0F0')).toBe('dark')
    expect(isLightOrDark('#00F')).toBe('dark')
    expect(isLightOrDark('#0FF')).toBe('light')

    expect(closestRGB('#a22')).toBe('red')
    expect(closestRGB('#2a2')).toBe('green')
    expect(closestRGB('#22a')).toBe('blue')
    expect(closestRGB('#2EF')).toBe('blue')
  })

  it('Fails with error parsing wrong rgb values', () => {
    expect(() => rgbToHex('#AHAHAH')).toThrow("Invalid color: #AHAHAH")
    expect(() => rgbToHex(1)).toThrow("Invalid color: 1")
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
