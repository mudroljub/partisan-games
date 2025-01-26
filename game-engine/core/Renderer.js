import { platno, ctx } from '../io/platno.js'
import { kamera } from './Kamera.js'

const poravnaj = niz => niz.flatMap(predmet =>
  [predmet, ...(predmet.predmeti ? poravnaj(predmet.predmeti) : [])]
)

const racunajZ = polozaj => kamera.primeniRotaciju(polozaj).z

export default class Renderer {
  constructor() {
    if (Renderer.instance) return Renderer.instance
    Renderer.instance = this

    this.kameraX = this.kameraY = 0 // TODO: integriši sa kamerom
  }

  cisti({ pozadina, bojaPozadine } = {}) {
    if (pozadina)
      pozadina.render()
    else if (bojaPozadine) {
      ctx.fillStyle = bojaPozadine
      ctx.fillRect(0, 0, platno.width, platno.height)
    } else
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

  vanPrikaza(z, x, y, sirina, visina) {
    return z <= kamera.z || x < 0 || y < 0 || x >= platno.width - sirina || y >= platno.height - visina
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
    sviPredmeti
      .sort((a, b) => racunajZ(b.polozaj) - racunajZ(a.polozaj))
      .forEach(predmet => predmet.render())

    ctx.fillStyle = 'rgba(112, 66, 20, 0.1)'
    ctx.fillRect(0, 0, platno.width, platno.height)

    ctx.restore()
  }
}

export const renderer = new Renderer()