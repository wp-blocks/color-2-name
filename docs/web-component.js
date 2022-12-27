class colorSwatch extends HTMLElement {
  constructor () {
    // Always call super first in constructor
    super()
    this.attachShadow({ mode: 'open' })

    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'swatch__wrapper')

    const colorCircle = document.createElement('div')
    colorCircle.setAttribute('class', 'swatch__color')
    colorCircle.style.backgroundColor = this.hasAttribute('color')
      ? this.getAttribute('color')
      : '#errorr'

    const oldColorRect = document.createElement('div')
    oldColorRect.setAttribute('class', 'swatch__color-split')
    oldColorRect.style.backgroundColor = this.hasAttribute('reference')
      ? this.getAttribute('reference')
      : '#errorr'

    const colorName = document.createElement('p')
    colorName.setAttribute('class', 'swatch__name')
    colorName.innerHTML = this.hasAttribute('name')
      ? this.getAttribute('name')
      : 'error'

    const colorGap = this.hasAttribute('gap')
      ? this.getAttribute('gap')
      : ''

    const colorDef = document.createElement('p')
    colorDef.setAttribute('class', 'swatch__def')
    colorDef.innerHTML = (this.hasAttribute('color')
      ? this.getAttribute('color')
      : 'error') + '<br/>diff: ' + colorGap

    wrapper.appendChild(colorCircle)
    colorCircle.appendChild(oldColorRect)
    wrapper.appendChild(colorName)
    wrapper.appendChild(colorDef)

    // Create some CSS to apply to the shadow DOM
    const style = document.createElement('style')
    style.textContent = `
    .swatch__color {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      border-radius: 100%;
      box-shadow: 0 0 0 5px white, 0 0 0 6px #ddd;
      overflow: hidden;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: var(--scale);
    }
    .swatch__name,
    .swatch__def {
      text-align: center;
      font-size: 1.5rem;
      line-height: 1.2;
      margin: 2.2rem 0 1.1rem;
      word-break: break-all;
    }
    .swatch__def{
      align-content: center;
      font-size: 80%;
      margin: 0;
      color: #aaa;
      font-family: monospace;
    }
    .swatch__color-split{
      width: 100%;
      height: 50%;
      padding-top: 50%;
      transform: rotate(135deg);
      transform-origin: bottom;
    }`

    // attach the created elements to the shadow DOM
    this.shadowRoot.append(style, wrapper)
  }
}

customElements.define('color-swatch', colorSwatch)
