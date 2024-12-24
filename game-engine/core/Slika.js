export default class Slika {

  constructor(src, sirina, visina) {
    this.slika = new Image()
    this.slika.src = src
    this.slikaMrtav = src
    this.sirina = sirina || this.slika.naturalWidth
    this.visina = visina || this.slika.naturalHeight
  }

  set slikaMrtav(src) {
    this._slikaMrtav = src
  }

  get slikaMrtav() {
    return this._slikaMrtav
  }

  zameniSliku(src) {
    this.slika.src = src
  }

  /* VELICINA */

  velicina(sirina, visina) {
    this.sirina = sirina
    this.visina = visina
  }

  prevelicaj(procenat) {
    this.sirina *= procenat
    this.visina *= procenat
  }

}
