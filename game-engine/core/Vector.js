export default class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  add(other) {
    return new Vector(this.x + other.x, this.y + other.y, this.z + other.z)
  }
}