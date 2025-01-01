import Predmet from './Predmet.js'
import { ctx } from '../io/platno.js'

class Animacija {
  constructor(ime, duzina, pocetak, sirina, visina, loop = true) {
    this.ime = ime
    this.duzina = duzina
    this.pocetak = pocetak
    this.sirina = sirina // slicice
    this.visina = visina
    this.loop = loop
  }
}

export default class Animiran extends Predmet {
  constructor(src, imena, duzine) { // broj ili niz brojeva ako su nejednake
    super(src)
    this.index = 0
    this.duzinaAnimacije = .5 // sekundi
    this.proteklo = 0
    this.onload = () => {
      this.animacije = this.praviAnimacije(imena, duzine)
    }
  }

  praviAnimacije(imena, duzine) {
    const brojKolona = duzine.length ? Math.max(...duzine) : duzine
    const sirina = this.slika.naturalWidth / brojKolona
    const visina = this.slika.naturalHeight / imena.length
    return imena.map((ime, i) => {
      const duzina = duzine[i] || duzine
      return new Animacija(ime, duzina, i * duzina, sirina, visina)
    })
  }

  reset() {
    this.proteklo = 0
  }

  postaviAnimaciju(ime) {
    this.reset()
    this.index = this.animacije.findIndex(animacija => animacija.ime === ime)
  }

  nePonavljaAnimaciju(ime) {
    const animacija = this.animacije.find(animacija => animacija.ime === ime)
    if (animacija) animacija.loop = false
  }

  set duzinaAnimacije(sekundi) {
    this._duzinaAnimacije = Math.max(sekundi, 0.05)
  }

  get duzinaAnimacije() {
    return this._duzinaAnimacije
  }

  /* RENDER */

  crtaKadar(dt) {
    const animacija = this.animacije[this.index]
    const { pocetak, sirina, visina, duzina } = animacija

    const nijeZavrsena = this.proteklo + dt < this.duzinaAnimacije
    if (animacija.loop || nijeZavrsena) this.proteklo += dt

    const duzinaKadra = this.duzinaAnimacije / duzina
    const trenutniKadar = Math.floor((this.proteklo % this.duzinaAnimacije) / duzinaKadra)
    const trenutniRed = Math.floor((pocetak + trenutniKadar) / duzina)
    const trenutnaKolona = (pocetak + trenutniKadar) - (trenutniRed * Math.floor(duzina))
    const slikaX = trenutnaKolona * sirina
    const slikaY = trenutniRed * visina

    ctx.drawImage(
      this.slika, slikaX, slikaY, sirina, visina, 0 - sirina / 2, 0 - visina / 2, sirina, visina
    )
  }

  render(dt) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this._ugaoSlike)
    this.crtaKadar(dt)
    ctx.restore()
  }

  update(dt) {
    if (!this.animacije) return
    super.update(dt)
  }
}
