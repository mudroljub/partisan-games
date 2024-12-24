export default class Vreme {

  constructor() {
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

  get korak() {
    const prosloUpamceno = this.upamceno
    this.upamceno = this.trenutno
    return this.upamceno - prosloUpamceno
  }
}
