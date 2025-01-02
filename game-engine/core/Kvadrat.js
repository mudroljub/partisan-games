import { ctx } from '../io/platno.js'

export default class Kvadrat {

  constructor(x, y, sirina, visina, boja) {
    this.x = x
    this.y = y
    this.sirina = sirina
    this.visina = visina
    this.fillstyle = boja
    this.ugao = 0
  }

  render() {
    ctx.fillStyle = this.fillstyle
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(-this.ugao)
    ctx.translate(-this.x, -this.y)
    ctx.fillRect(this.x, this.y, this.sirina, this.visina)
    ctx.restore()
  }

  update() {
    this.render()
  }
}
