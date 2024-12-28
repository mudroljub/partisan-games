export default class Slika {

  constructor(src, sirina, visina) {
    this.slika = new Image()
    this.sirina = sirina
    this.visina = visina

    this.slika.onload = () => {
      if (!sirina && !visina) {
        this.sirina = this.slika.naturalWidth
        this.visina = this.slika.naturalHeight
      }
      this.onload()
      this.slika.onload = null
    }

    this.slika.src = src
    this.slikaMrtav = src
  }

  /* ovde postaje dostupna visina i širina slike */
  onload() {}

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
