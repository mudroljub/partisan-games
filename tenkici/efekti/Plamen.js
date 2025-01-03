import {ctx} from '/game-engine/io/platno.js'

const maxLife = 60
const speed = 3
const renewal = 10
const size = 20

class Iskra {
  constructor(x, y, dx, dy) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.life = 0
  }

  update() {
    this.x += this.dx
    this.y += this.dy
    this.life++
  }

  render() {
    const red = 260 - this.life * 2
    const green = this.life * 2 + 50
    const blue = this.life * 2
    const opacity = (maxLife - this.life) / maxLife * 0.4
    ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`
    ctx.beginPath()
    const radius = (maxLife - this.life) / maxLife * size / 2 + size / 2
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI)
    ctx.fill()
  }
}

export default class Plamen {
  constructor(x = 200, y = 200) {
    this.iskre = []
    this.x = x
    this.y = y
  }

  update() {
    this.praviNoveCestice()
    this.iskre.map((p, i) => {
      p.update()
      if (p.life >= maxLife) this.iskre.splice(i, 1)
    })
  }

  praviNoveCestice() {
    for (let i = 0; i < renewal; i++) {
      const dx = (Math.random() * 2 * speed - speed) / 2
      const dy = 0 - Math.random() * 2 * speed
      this.iskre.push(new Iskra(this.x, this.y, dx, dy))
    }
  }

  render() {
    ctx.globalCompositeOperation = 'lighter'
    this.iskre.map(p => p.render())
    ctx.globalCompositeOperation = 'source-over'
  }
}
