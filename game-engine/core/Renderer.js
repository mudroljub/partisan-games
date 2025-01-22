import { platno, ctx } from '../io/platno.js'

const poravnaj = niz => niz.flatMap(predmet =>
  [predmet, ...(predmet.predmeti ? poravnaj(predmet.predmeti) : [])]
)

export default class Renderer {
  constructor() {
    if (Renderer.instance) return Renderer.instance
    Renderer.instance = this

    this.kameraX = this.kameraY = 0
  }

  cisti(pozadina) {
    if (pozadina)
      pozadina.render()
    else
      ctx.clearRect(0, 0, platno.width, platno.height)
  }

  render(predmeti) {
    ctx.save()
    ctx.translate(-this.kameraX, -this.kameraY)

    const sviPredmeti = poravnaj(predmeti)
    sviPredmeti.forEach(predmet => predmet.render())

    ctx.restore()
  }
}