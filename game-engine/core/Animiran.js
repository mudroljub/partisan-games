import Vreme from './Vreme'
import Predmet from './Predmet'
import {podloga} from '../io/platno'

export default class Animiran extends Predmet {

  constructor(src, imenaAnimacija, slikaPoAnimaciji) { // broj ili niz brojeva ako su nejednake
    super(src)
    this.animacije = []
    this.tekucaAnimacija = 0
    this.duzinaAnimacije = 1000
    this.protekloAnimacije = 0
    this.vreme = new Vreme()
    this.praviAnimacije(imenaAnimacija, slikaPoAnimaciji)
  }

  /* ANIMACIJA */

  praviAnimacije(imenaAnimacija, slikaPoAnimaciji) {
    const brojKolona = slikaPoAnimaciji.length ? Math.max(...slikaPoAnimaciji) : slikaPoAnimaciji
    const sirinaKadra = this.slika.naturalWidth / brojKolona
    const visinaKadra = this.slika.naturalHeight / imenaAnimacija.length
    for (let i = 0; i < imenaAnimacija.length; i++) {
      const brojKadrova = slikaPoAnimaciji[i] || slikaPoAnimaciji
      this.animacije.push({
        ime: imenaAnimacija[i],
        brojKadrova,
        pocetniKadar: i * brojKadrova,
        sirinaKadra,
        visinaKadra,
        ponavlja: true
      })
    }
  }

  reset() {
    this.protekloAnimacije = 0
    this.vreme.reset()
  }

  postaviAnimaciju(ime) {
    this.reset()
    this.animacije.map((animacija, i) => {
      if (animacija.ime === ime) this.tekucaAnimacija = i
    })
  }

  nePonavljaAnimaciju(ime) {
    this.animacije.map((animacija) => {
      if (animacija.ime === ime) animacija.ponavlja = false
    })
  }

  set duzinaAnimacije(milisekundi) {
    this._duzinaAnimacije = milisekundi > 50 ? milisekundi : 50
  }

  get duzinaAnimacije() {
    return this._duzinaAnimacije
  }

  /* RENDER */

  crtaKadar() {
    const tekuca = this.animacije[this.tekucaAnimacija]
    const duzinaFrejma = this.vreme.korak
    const nijeZavrsena = this.protekloAnimacije + duzinaFrejma < this.duzinaAnimacije
    if (tekuca.ponavlja || nijeZavrsena) this.protekloAnimacije += duzinaFrejma

    const duzinaKadra = this.duzinaAnimacije / tekuca.brojKadrova
    const trenutniKadar = Math.floor((this.protekloAnimacije % this.duzinaAnimacije) / duzinaKadra)
    const trenutniRed = Math.floor((tekuca.pocetniKadar + trenutniKadar) / tekuca.brojKadrova)
    const trenutnaKolona = (tekuca.pocetniKadar + trenutniKadar) - (trenutniRed * Math.floor(tekuca.brojKadrova))
    const slikaX = trenutnaKolona * tekuca.sirinaKadra
    const slikaY = trenutniRed * tekuca.visinaKadra

    podloga.drawImage(this.slika, slikaX, slikaY, tekuca.sirinaKadra, tekuca.visinaKadra, 0 - (tekuca.sirinaKadra / 2), 0 - (tekuca.visinaKadra / 2), tekuca.sirinaKadra, tekuca.visinaKadra)
  }

  crta() {
    if (!this.vidljiv) return
    podloga.save()
    podloga.translate(this.x, this.y)
    podloga.rotate(this._ugaoSlike)
    this.crtaKadar()
    podloga.restore()
  }

}
