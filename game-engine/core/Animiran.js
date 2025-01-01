import Predmet from './Predmet.js'
import { ctx } from '../io/platno.js'

class Animacija {
  constructor(ime, duzina, pocetak, sirina, visina, loop = true) {
    this.ime = ime
    this.duzina = duzina
    this.pocetak = pocetak
    this.sirina = sirina
    this.visina = visina
    this.loop = loop
  }
}

export default class Animiran extends Predmet {
  constructor(src, imenaAnimacija, duzina) { // broj ili niz brojeva ako su nejednake
    super(src)
    this.tekucaAnimacija = 0
    this.duzinaAnimacije = 1000
    this.protekloAnimacije = 0
    this.onload = () => {
      this.animacije = this.praviAnimacije(imenaAnimacija, duzina)
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
    this.protekloAnimacije = 0
  }

  postaviAnimaciju(ime) {
    this.reset()
    this.tekucaAnimacija = this.animacije.findIndex(animacija => animacija.ime === ime)
  }

  nePonavljaAnimaciju(ime) {
    const animacija = this.animacije.find(animacija => animacija.ime === ime)
    if (animacija) animacija.loop = false
  }

  set duzinaAnimacije(milisekundi) {
    this._duzinaAnimacije = Math.max(milisekundi, 50)
  }

  get duzinaAnimacije() {
    return this._duzinaAnimacije
  }

  /* RENDER */

  crtaKadar(dt) {
    const tekuca = this.animacije[this.tekucaAnimacija]
    const duzinaFrejma = dt * 1000
    const nijeZavrsena = this.protekloAnimacije + duzinaFrejma < this.duzinaAnimacije
    if (tekuca.loop || nijeZavrsena) this.protekloAnimacije += duzinaFrejma

    const duzinaKadra = this.duzinaAnimacije / tekuca.duzina
    const trenutniKadar = Math.floor((this.protekloAnimacije % this.duzinaAnimacije) / duzinaKadra)
    const trenutniRed = Math.floor((tekuca.pocetak + trenutniKadar) / tekuca.duzina)
    const trenutnaKolona = (tekuca.pocetak + trenutniKadar) - (trenutniRed * Math.floor(tekuca.duzina))
    const slikaX = trenutnaKolona * tekuca.sirina
    const slikaY = trenutniRed * tekuca.visina

    ctx.drawImage(this.slika, slikaX, slikaY, tekuca.sirina, tekuca.visina, 0 - (tekuca.sirina / 2), 0 - (tekuca.visina / 2), tekuca.sirina, tekuca.visina)
  }

  render(dt) {
    if (!this.vidljiv) return
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
