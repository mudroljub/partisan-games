import Pokretno from './Pokretno.js'

export default class Zdravlje extends Pokretno {
  constructor(potisak) {
    super('zdravlje.png', { potisak, skalar: .66, faktorY: 10 })
  }
}
