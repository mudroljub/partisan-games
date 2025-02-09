const baseControls = {
  '← or A': 'left',
  '→ or D': 'right',
  '↑ or W': 'forward',
  '↓ or S': 'backward',
}

const fpsControls = {
  ...baseControls,
  'PgUp or Q': 'strafe left',
  'PgDn or E': 'strafe right',
  CapsLock: 'run',
  Mouse: 'attack',
  Space: 'jump',
  P: 'pause',
}

export default class Controls {
  constructor({
    controls = fpsControls,
    btnClass = '', // rpgui-button
    containerClass = 'rpgui-container',
  } = {}) {
    this.controlsOpen = false
    this.init(controls, btnClass, containerClass)
  }

  init(controls, btnClass, containerClass) {
    this.div = document.createElement('div')
    this.div.className = 'controls'

    const button = document.createElement('button')
    button.className = btnClass

    const content = document.createElement('div')
    content.className = containerClass
    content.innerHTML = Object.keys(controls)
      .filter(key => controls[key])
      .map(key =>
        `<p><b>${key}</b> - ${controls[key]}</p>`
      ).join('')

    const open = () => {
      content.style.display = 'block'
      button.innerHTML = 'CONTROLS &#9654;'
    }

    const close = () => {
      content.style.display = 'none'
      button.innerHTML = 'CONTROLS &#9660;'
    }

    if (this.controlsOpen) open()
    else close()

    button.addEventListener('pointerup', e => {
      e.stopPropagation()
      if (content.style.display == 'none') open()
      else close()
    })

    this.div.appendChild(button)
    this.div.appendChild(content)
    document.body.appendChild(this.div)
  }

  end() {
    this.div.remove()
  }
}