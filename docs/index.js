const getRandomColor = () => '#' + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, '0')

const colors = [...Array(100)]

// the button that fires when the main function
const reloadButton = document.getElementById('reloadButton')
// The swatches container
const grid = document.getElementById('grid')

function updateColor () {
  grid.innerHTML = ''

  const colorList = {}

  // get 100 random colors
  colors.forEach(function (__, index) {
    colorList[index] = {}
    colorList[index].hex = getRandomColor()
  })

  //
  const startTime = performance.now()
  colors.forEach(function (color, index) {
    colorList[index].similar = color2name.closest(colorList[index].hex, undefined, { info: true })
  })
  const result = Math.round(performance.now() - startTime)
  reloadButton.innerText = `executed in ${result} ms. Reload?`

  // add the webcomponents to the dom
  colors.forEach(function (__, index) {
    document.getElementById('grid').innerHTML += `<color-swatch color="${colorList[index].similar.color}" reference="${colorList[index].hex}" name="${colorList[index].similar.name}" gap="${colorList[index].similar.gap.toFixed(2)}" />`
  })
}

updateColor()
