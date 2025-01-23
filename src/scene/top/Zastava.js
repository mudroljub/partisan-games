import Sprite from '/game-engine/core/Sprite.js'

export default class Zastava extends Sprite {
  constructor({ x, y }) {
    super('sprajtovi/zastava.png', { imena: ['vijori'], brojKadrova: 4, x, y, defaultAnimacija: 'vijori' })
  }
}