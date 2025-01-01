export default class Kompozit {
  #x = 0
  #y = 0

  constructor(x, y) {
    this.x = x
    this.y = y
    this.parent = null
    this.predmeti = []
  }

  get x() {
    return this.parent ? this.parent.x + this.#x : this.#x
  }

  set x(val) {
    this.#x = this.parent ? val - this.parent.x : val
  }

  get y() {
    return this.parent ? this.parent.y + this.#y : this.#y
  }

  set y(val) {
    this.#y = this.parent ? val - this.parent.y : val
  }

  dodaj(...premeti) {
    for (const predmet of premeti) {
      predmet.parent = this
      this.predmeti.push(predmet)
    }
  }
}
