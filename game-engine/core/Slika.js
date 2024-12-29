export default class Slika {

  constructor(src, sirina, visina, x = 200, y = 200) {
    this.slika = new Image()
    this.sirina = sirina
    this.visina = visina
    this.x = x
    this.y = y

    this.slika.onload = () => {
      if (!sirina && !visina) {
        this.sirina = this.slika.naturalWidth
        this.visina = this.slika.naturalHeight
      }
      this.onload() // implementiraju naslednici kad im trebaju širina i visina
      this.slika.onload = null
    }
    this.slika.src = src
  }

  onload() {}

  polozaj(x, y) {
    this.x = x
    this.y = y
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
