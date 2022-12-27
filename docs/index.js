const getRandomColor = () => '#' + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, '0')

const colors = [...Array(100)]

colors.forEach(function () {
  const color = getRandomColor()

  const similar = color2name.closest(color, undefined, { info: true })

  document.getElementById('grid').innerHTML +=
    `<color-swatch color="${similar.color}" reference="${color}" name="${similar.name}" gap="${similar.gap.toFixed(2)}" />`
})
