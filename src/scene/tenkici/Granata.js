import Predmet from '/game-engine/core/Predmet.js'
import { gravitacija } from './konstante.js'
import { platno } from '/game-engine/io/platno.js'
import { izasaoIgde } from '/game-engine/utils/granice.js'

const silaUdara = 15
const trajanjeEksplozije = 150

export default class Granata extends Predmet {
  constructor(src = '/assets/slike/granata.gif') {
    super(src, { skalar: .5 })
    this.nivoTla = platno.height - Math.random() * platno.height * 0.2
    this.plamen = new Predmet('/assets/slike/plamen.gif', { skalar: 0.4 })
    this.reset()
  }

  reset() {
    this.nestani()
    this.plamen.sakrij()
    this.ispaljena = false
  }

  postavi(polozaj, ugao) {
    this.x = polozaj.x
    this.y = polozaj.y
    this.ugao = ugao
  }

  pucaj(polozaj, ugao, potisak = 500) {
    this.pokazi()
    this.postavi(polozaj, ugao)
    this.dodajSilu(potisak)
    this.ispaljena = true
  }

  proveriGranice() {
    if (izasaoIgde(this) || this.y > this.nivoTla) this.reset()
  }

  proveriPogodak(predmet) {
    if (!this.sudara(predmet)) return
    this.eksplodiraj()
    setTimeout(() => this.reset(), trajanjeEksplozije)
    predmet.dodajSilu(silaUdara, predmet.ugao + Math.PI)
    predmet.skiniEnergiju(Math.ceil(Math.random() * 2))
  }

  eksplodiraj() {
    this.plamen.x = this.x
    this.plamen.y = this.y
    this.plamen.pokazi()
  }

  azurirajUgao() {
    this.ugao = Math.atan2(this.dy, this.dx)
  }

  render() {
    super.render()
    this.plamen.render()
  }

  update(dt) {
    if (!this.ispaljena) return
    this.dodajSilu(gravitacija * dt, Math.PI / 2)
    this.azurirajUgao()
    super.update(dt)
  }
}
