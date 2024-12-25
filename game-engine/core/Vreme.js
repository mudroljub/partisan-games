export default class Vreme {

  constructor() {
    this.lastDelta = Date.now()
    this.reset()
  }

  reset() {
    this.upamceno = Date.now()
  }

  get trenutno() {
    return Date.now()
  }

  get proteklo() {
    return this.trenutno - this.upamceno
  }

  get protekloSekundi() {
    return this.proteklo / 1000
  }

  get delta() {
    const prosloDelta = this.lastDelta
    this.lastDelta = this.trenutno
    return this.lastDelta - prosloDelta
  }

  get deltaSekundi() {
    return this.delta / 1000
  }
}
