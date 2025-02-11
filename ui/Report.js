import config from '/config.js'

function createHtml(id) {
  const div = document.createElement('div')
  div.className = 'report'

  setTimeout(() => {
    const container = document.getElementById(id)
    container.prepend(div)
  }, 1)

  const p = document.createElement('p')
  div.appendChild(p)
  return p
}

export default class Report {
  constructor({ text = 'Destroy all enemy aircraft.', containerId } = {}) {
    this.i = 0
    this.intervalId
    this.text = text
    this.containerId = containerId
    this.p = createHtml(containerId)
    this.audio = new Audio('/assets/sounds/typing.mp3')
    this.audio.volume = config.volume
    this.init()
  }

  init() {
    if (this.intervalId) return
    this.intervalId = setInterval(this.kucaj, 80)
    this.audio.play()
  }

  kucaj = () => {
    this.p.innerHTML += this.text.charAt(this.i)
    this.p.innerHTML = this.p.innerHTML.replace(/\n/g, '<br>')
    if (this.i >= this.text.length)
      this.stop()
    this.i++
  }

  stop() {
    this.audio.pause()
    clearInterval(this.intervalId)
  }
}
