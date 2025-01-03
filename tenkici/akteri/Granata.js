import Predmet from '/game-engine/core/Predmet.js'
import { gravitacija } from '../konstante.js'
import { platno } from '/game-engine/io/platno.js'
import { izasaoIgde } from '/game-engine/utils/granice.js'

const potisak = 500
const silaUdara = 15
const trajanjeEksplozije = 150

export default class Granata extends Predmet {
  constructor(vlasnik, src = '/assets/slike/granata.gif') {
    super(src, { skalar: .5 })
    this.vlasnik = vlasnik
    this.nivoTla = platno.height - Math.random() * platno.height * 0.2
    this.plamen = new Predmet('/assets/slike/plamen.gif', { skalar: 0.4 })
    this.reset()
  }

  reset() {
    this.nestani()
    this.plamen.sakrij()
    this.ispaljena = false
  }

  // TODO: prebaciti na Predmet
  azurirajUgao() {
    this.ugao = Math.atan2(this.dy, this.dx)
  }

  postavi() {
    this.x = Math.cos(this.vlasnik.ugao) * this.vlasnik.dijagonala + this.vlasnik.x
    this.y = Math.sin(this.vlasnik.ugao) * this.vlasnik.dijagonala + this.vlasnik.y
    this.ugao = this.vlasnik.ugao
  }

  pucaj() {
    this.pokazi()
    this.postavi()
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
    predmet.dodajSilu(silaUdara, predmet.nazad)
    predmet.skiniEnergiju(Math.ceil(Math.random() * 2))
  }

  eksplodiraj() {
    this.plamen.x = this.x
    this.plamen.y = this.y
    this.plamen.pokazi()
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
