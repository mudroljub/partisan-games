export const baseControls = {
  '← or A': 'left',
  '→ or D': 'right',
  '↑ or W': 'forward',
  '↓ or S': 'backward',
}

export const fpsControls = {
  ...baseControls,
  Q: 'strafe left',
  E: 'strafe right',
  CapsLock: 'run',
  Mouse: 'attack',
  Space: 'jump',
  P: 'pause',
}

export const thirdPersonControls = {
  ...baseControls,
  CapsLock: 'run',
  Enter: 'attack',
  Space: 'jump',
}

export default class Controls {
  constructor({
    controlKeys = baseControls,
    btnClass = '', // rpgui-button
    containerClass = 'white-window levo',
  } = {}) {
    this.controlsOpen = false
    this.init(controlKeys, btnClass, containerClass)
  }

  init(controlKeys, btnClass, containerClass) {
    this.div = document.createElement('div')
    this.div.className = 'bottom-left'

    const button = document.createElement('button')
    button.className = btnClass

    const content = document.createElement('div')
    content.className = containerClass
    content.innerHTML = Object.keys(controlKeys)
      .filter(key => controlKeys[key])
      .map(key => `<p>${key} - ${controlKeys[key]}</p>`)
      .join('')

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