import Predmet from './Predmet.js'
import { ctx } from '../io/platno.js'

class Animacija {
  constructor(ime, brojKadrova, pocetak, sirinaSlicice, visinaSlicice, loop = true) {
    this.ime = ime
    this.brojKadrova = brojKadrova
    this.pocetak = pocetak
    this.sirina = sirinaSlicice
    this.visina = visinaSlicice
    this.loop = loop
  }
}

export default class Sprite extends Predmet {
  constructor(src, params) { // broj ili niz brojeva ako su nejednake
    super(src, params)
    this.animacija = null
    this.imeAnimacije = ''
    this.vremeAnimacije = .5 // sekundi
    this.proteklo = 0
    this.onload = () => {
      this.animacije = this.praviAnimacije(params.imena, params.brojKadrova)
    }
  }

  praviAnimacije(imena, duzine) {
    const brojKolona = duzine.length ? Math.max(...duzine) : duzine
    const sirina = this.slika.naturalWidth / brojKolona
    const visina = this.slika.naturalHeight / imena.length
    return imena.map((ime, i) => {
      const brojKadrova = duzine[i] || duzine
      return new Animacija(ime, brojKadrova, i * brojKadrova, sirina, visina)
    })
  }

  reset() {
    this.proteklo = 0
  }

  pustiAnimaciju(ime, loop) {
    this.imeAnimacije = ime // ako još nije učitana čuva za kasnije
    if (!this.animacije) return
    this.reset()
    this.animacija = this.nadjiAnimaciju(ime)
    if (loop !== undefined) this.animacija.loop = loop
  }

  nadjiAnimaciju(ime) {
    return this.animacije.find(animacija => animacija.ime === ime)
  }

  /* RENDER */

  crtaKadar(dt) {
    if (!this.animacija) this.animacija = this.nadjiAnimaciju(this.imeAnimacije)
    if (!this.animacija) return

    const { pocetak, sirina, visina, brojKadrova } = this.animacija

    const nijeZavrsena = this.proteklo + dt < this.vremeAnimacije
    if (this.animacija.loop || nijeZavrsena) this.proteklo += dt

    const duzinaKadra = this.vremeAnimacije / brojKadrova
    const trenutniKadar = Math.floor((this.proteklo % this.vremeAnimacije) / duzinaKadra)
    const trenutniRed = Math.floor((pocetak + trenutniKadar) / brojKadrova)
    const trenutnaKolona = (pocetak + trenutniKadar) - (trenutniRed * Math.floor(brojKadrova))
    const slikaX = trenutnaKolona * sirina
    const slikaY = trenutniRed * visina

    ctx.drawImage(
      this.slika, slikaX, slikaY, sirina, visina, 0 - sirina / 2, 0 - visina / 2, sirina, visina
    )
  }

  render(dt) {
    if (!this.animacije) return
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this._ugaoSlike)
    this.crtaKadar(dt)
    ctx.restore()
  }
}
