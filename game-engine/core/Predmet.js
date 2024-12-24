import Slika from './Slika'
import {platno, podloga} from '../io/platno'
import mish from '../io/mish'
import {randomRange} from '../utils'
import {sudar} from '../akcije/sudari'

export default class Predmet extends Slika {

  constructor(src, sirina, visina, x = 200, y = 200) {
    super(src, sirina, visina)
    this.x = x
    this.y = y
    this.ziv = true
    this.vidljiv = true
    this.ugao = 0
    this.brzina = 0
    this.skalarX = 1
    this.skalarY = 1
    this.oznake = {}
  }

  update() {
    this.x += this.dx
    this.y += this.dy
    this.proveriGranice()
    this.crta()
  }

  /* POLOZAJ */

  tlo(y) {
    this.y = y - this.visina / 2
  }

  polozaj(x, y) {
    this.x = x
    this.y = y
  }

  /* POLOZAJ RANDOM */

  postaviRandom() {
    this.polozaj(Math.random() * platno.width, Math.random() * platno.height)
  }

  randomX(pocetnoX = this.sirina/2, zavrsnoX = platno.width - this.sirina/2) {
    this.x = randomRange(pocetnoX, zavrsnoX)
  }

  randomY(pocetnoY = this.visina/2, zavrsnoY = platno.height - this.visina/2) {
    this.y = randomRange(pocetnoY, zavrsnoY)
  }

  postaviRandomUredno() { // ne viri sa platna
    this.randomX()
    this.randomY()
  }

  /* KRETANJE */

  azurirajSilu(jacina = this.brzina, ugao = this.ugao) {
    this.dx = jacina * Math.cos(ugao)
    this.dy = jacina * Math.sin(ugao)
  }

  dodajSilu(jacina, ugao = this.ugao) {
    this.dx += jacina * Math.cos(ugao)
    this.dy += jacina * Math.sin(ugao)
  }

  get brzina() {
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy)
  }

  set brzina(novaBrzina) {
    this.azurirajSilu(novaBrzina, this.ugao)
  }

  pomeri(razmak) {
    this.x += razmak * Math.cos(this.ugao)
    this.y += razmak * Math.sin(this.ugao)
  }

  stani() {
    this.brzina = 0
  }

  /* UGLOVI */

  get ugao() {
    return this._ugao
  }

  set ugao(noviUgao) {
    this._ugao = noviUgao % (Math.PI * 2)
    this.azurirajSilu()
  }

  ugaoKa(predmet) {
    const mojX = this.x + this.sirina / 2
    const mojY = this.y + this.visina / 2
    const tudjX = predmet.x + predmet.sirina / 2
    const tudjY = predmet.y + predmet.visina / 2
    return Math.atan2(tudjY - mojY, tudjX - mojX)
  }

  /* VIDLJIVOST */

  pokazi() {
    this.vidljiv = true
  }

  sakrij() {
    this.vidljiv = false
  }

  nestani() {
    this.sakrij()
    this.stani()
  }

  /* STANJE */

  get mrtav() {
    return !this.ziv
  }

  umri() {
    this.stani()
    this.zameniSliku(this.slikaMrtav)
    this.ziv = false
  }

  /* GRANICE */

  proveriGranice() {
    if (this.granice) this.granice(this)
  }

  /* KOLIZIJA */

  sudara(predmet) {
    if (!this.vidljiv || !predmet.vidljiv) return false
    return sudar(this, predmet)
  }

  razmakDo(predmet) {
    const razlikaX = this.x - predmet.x
    const razlikaY = this.y - predmet.y
    return Math.sqrt((razlikaX * razlikaX) + (razlikaY * razlikaY))
  }

  /* MISH */

  pratiMisha() {
    this.x = mish.x - platno.offsetLeft
    this.y = mish.y - platno.offsetTop
  }

  /* RENDER */

  crta() {
    if (!this.vidljiv) return
    podloga.save()
    podloga.translate(this.x, this.y)
    podloga.rotate(this.ugao)
    podloga.scale(this.skalarX, this.skalarY)
    podloga.drawImage(this.slika, -this.sirina / 2, -this.visina / 2, this.sirina, this.visina)
    podloga.restore()
  }

  /* DEBUG */

  log() {
    const x = this.x.toFixed()
    const y = this.y.toFixed()
    const dx = this.dx.toFixed(2)
    const dy = this.dy.toFixed(2)
    const brzina = this.brzina.toFixed(2)
    const ugao = this.ugao.toFixed(2)
    console.log(`x: ${x}, y: ${y}, dx: ${dx}, dy: ${dy}, brzina: ${brzina}, ugao: ${ugao}, ziv: ${this.ziv}`)
  }
}
