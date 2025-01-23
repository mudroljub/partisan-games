import { platno, ctx } from '../io/platno.js'

const poravnaj = niz => niz.flatMap(predmet =>
  [predmet, ...(predmet.predmeti ? poravnaj(predmet.predmeti) : [])]
)

/**
 * probati uklanjanje render sa nekih predmeta
 * cisti: dodati boju pozadine
 */
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

  crtaOblik(predmet) {
    ctx.fillStyle = 'black'
    if (predmet.ishodiste === 'CENTAR')
      ctx.fillRect(-predmet.sirina / 2, -predmet.visina / 2, predmet.sirina, predmet.visina)
    else if (predmet.ishodiste === 'GORE_LEVO')
      ctx.fillRect(0, 0, predmet.sirina, predmet.visina)
    else if (predmet.ishodiste === 'DOLE_DESNO')
      ctx.fillRect(-predmet.sirina, -predmet.visina, predmet.sirina, predmet.visina)
  }

  crtaSliku(predmet) {
    if (predmet.ishodiste === 'CENTAR')
      ctx.drawImage(predmet.slika, -predmet.sirina / 2, -predmet.visina / 2, predmet.sirina, predmet.visina)
    else if (predmet.ishodiste === 'GORE_LEVO')
      ctx.drawImage(predmet.slika, 0, 0, predmet.sirina, predmet.visina)
    else if (predmet.ishodiste === 'DOLE_DESNO')
      ctx.drawImage(predmet.slika, -predmet.sirina, -predmet.visina, predmet.sirina, predmet.visina)
  }

  dodajSenku(predmet) {
    if (predmet.senka) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      ctx.shadowOffsetX = 10
      ctx.shadowOffsetY = 10
    } else {
      ctx.shadowColor = 'rgba(0, 0, 0, 0)'
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
    }
  }

  crtaPredmet(predmet) {
    if (!predmet.prikazan) return
    this.dodajSenku(predmet)

    ctx.save()
    ctx.translate(predmet.x, predmet.y)
    ctx.rotate(predmet.ugao)
    ctx.scale(predmet.odrazY, predmet.odrazX)
    ctx.scale(predmet.scaleX, predmet.scaleY)

    if (!predmet.slika || predmet.debug)
      this.crtaOblik(predmet)
    else
      this.crtaSliku(predmet)

    ctx.restore()
    if (predmet.zapaljen) predmet.plamen.render()
  }

  crtaPredmete(predmeti) {
    ctx.save()
    ctx.translate(-this.kameraX, -this.kameraY)

    const sviPredmeti = poravnaj(predmeti)
    sviPredmeti.forEach(predmet => predmet.render())

    ctx.restore()
  }
}