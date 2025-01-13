import Pokretno from './Pokretno.js'
import platno from '/game-engine/io/platno.js'

export default class Zdravlje extends Pokretno {
  constructor(potisak) {
    super('zdravlje.png', { potisak, skalar: .66 })
  }

  postaviPolozaj() {
    const x = Math.random() * platno.width
    this.polozaj = { x, y: -platno.height * 10 }
  }
}
