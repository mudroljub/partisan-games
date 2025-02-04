export default class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  set({ x, y, z }) {
    if (x !== undefined) this.x = x
    if (y !== undefined) this.y = y
    if (z !== undefined) this.z = z
  }

  razmakDo(polozaj) {
    const dx = this.x - polozaj.x
    const dy = this.y - polozaj.y
    const dz = this.z - polozaj.z
    return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2)
  }
}