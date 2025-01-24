export default class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  postavi({ x, y, z }) {
    if (x !== undefined) this.x = x
    if (y !== undefined) this.y = y
    if (z !== undefined) this.z = z
  }

  get duzina() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
  }

  saberi(polozaj) {
    return new Vector(this.x + polozaj.x, this.y + polozaj.y, this.z + polozaj.z)
  }

  oduzmi(polozaj) {
    return new Vector(this.x - polozaj.x, this.y - polozaj.y, this.z - polozaj.z)
  }

  razmakDo(polozaj) {
    return this.oduzmi(polozaj).duzina
  }
}