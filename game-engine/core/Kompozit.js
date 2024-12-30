export default class Kompozit {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.predmeti = []
  }

  dodaj(...premeti) {
    for (const predmet of premeti) {
      predmet.parent = this
      this.predmeti.push(predmet)
    }
  }
}
