import Predmet from './Predmet.js'
import { ctx } from '../io/platno.js'

class Animacija {
  constructor(ime, brojKadrova, pocetniKadar, sirinaSlicice, visinaSlicice, loop = true) {
    this.ime = ime
    this.brojKadrova = brojKadrova
    this.pocetniKadar = pocetniKadar
    this.sirina = sirinaSlicice
    this.visina = visinaSlicice
    this.loop = loop
  }
}

export default class Sprite extends Predmet {
  constructor(src, { imena, brojKadrova, vremeAnimacije = .5, ...rest }) { // broj ili niz brojeva ako su nejednake
    super(src, rest)
    this.animacija = null
    this.imeAnimacije = ''
    this.vremeAnimacije = vremeAnimacije // sekundi
    this.protekloAnimacije = 0
    this.onload = () => {
      this.animacije = this.praviAnimacije(imena, brojKadrova)
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
    this.protekloAnimacije = 0
  }

  dodeliAnimaciju(ime, loop) {
    if (!this.animacije) return
    if (this.animacija?.ime != ime) this.reset()

    this.animacija = this.animacije.find(anim => anim.ime === ime)
    if (loop !== undefined) this.animacija.loop = loop
  }

  animacijaZavrsena(dt) {
    return this.protekloAnimacije + dt >= this.vremeAnimacije
  }

  /* LOOP */

  update(dt) {
    super.update(dt)
    if (!this.animacija) return

    if (this.animacija.loop || !this.animacijaZavrsena(dt))
      this.protekloAnimacije += dt
  }

  crtaSliku() {
    const { pocetniKadar, sirina, visina, brojKadrova } = this.animacija

    const duzinaKadra = this.vremeAnimacije / brojKadrova
    const trenutniKadar = Math.floor((this.protekloAnimacije % this.vremeAnimacije) / duzinaKadra)
    const trenutniRed = Math.floor((pocetniKadar + trenutniKadar) / brojKadrova)
    const trenutnaKolona = (pocetniKadar + trenutniKadar) - (trenutniRed * Math.floor(brojKadrova))
    const slikaX = trenutnaKolona * sirina
    const slikaY = trenutniRed * visina

    ctx.drawImage(
      this.slika, slikaX, slikaY, sirina, visina, 0 - sirina / 2, 0 - visina / 2, sirina, visina
    )
  }

  render(dt) {
    if (!this.animacija) return
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this._ugaoSlike)
    this.crtaSliku(dt)
    ctx.restore()
  }
}
