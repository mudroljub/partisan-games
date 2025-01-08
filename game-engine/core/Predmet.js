import { platno, ctx } from '../io/platno.js'
import { pitagora, randomRange } from '../utils.js'
import { sudar } from '../utils/sudari.js'
import {
  izasaoDole, izasaoGore, izasaoDesno, izasaoLevo, izasaoLevoSkroz, izasaoDesnoSkroz, izasaoIgde
} from '/game-engine/utils/granice.js'

export default class Predmet {
  #ugao = 0

  constructor(src, { sirina, visina, x = 200, y = 200, skalar = 1, zapaljiv = false, ishodiste = 'CENTAR' } = {}) {
    this.x = x
    this.y = y
    this.slika = new Image()
    this.slika.onload = () => {
      this.dodeliVelicinu(sirina, visina, skalar)
      this.onload()
      this.slika.onload = null
    }
    this.slika.src = src
    this.zapaljiv = zapaljiv
    this.ishodiste = ishodiste
    this.vidljiv = true
    this.ziv = true
    this.brzina = 0
    this.odrazY = 1
    this.odrazX = 1
    this.oznake = new Set()
    this.debug = false
    this.predmeti = []
  }

  onload() {} // callback

  zameniSliku(src) {
    this.slika.src = src
  }

  /* VELICINA */

  dodeliVelicinu = (sirina, visina, skalar) => {
    this.sirina = sirina
    this.visina = visina

    if (!sirina && !visina) {
      this.sirina = this.slika.naturalWidth * skalar
      this.visina = this.slika.naturalHeight * skalar
    } else if (sirina && !visina)
      this.visina = (sirina / this.slika.naturalWidth) * this.slika.naturalHeight
    else if (!sirina && visina)
      this.sirina = (visina / this.slika.naturalHeight) * this.slika.naturalWidth
  }

  get dijagonala() {
    return pitagora(0, this.sirina, 0, this.visina)
  }

  /* POLOZAJ */

  polozaj(x, y) {
    this.x = x
    this.y = y
  }

  tlo(y) {
    this.y = y - this.visina / 2
  }

  randomX(marginaX) {
    this.x = randomRange(marginaX, platno.width - marginaX)
  }

  randomY(marginaY) {
    this.y = randomRange(marginaY, platno.height - marginaY)
  }

  postaviRandom(marginaX = 10, marginaY = 10) {
    this.randomX(marginaX)
    this.randomY(marginaY)
  }

  /* UGAO */

  get ugao() {
    return this.#ugao
  }

  set ugao(noviUgao) {
    this.#ugao = (noviUgao + Math.PI * 2) % (Math.PI * 2)
  }

  get ugaoStepeni() {
    return this.ugao * 180 / Math.PI
  }

  set ugaoStepeni(ugaoRadijani) {
    this.ugao = ugaoRadijani * Math.PI / 180
  }

  skreni(noviUgao) {
    this.ugao = noviUgao
    this.brzina = this.brzina // ažurira pravac kretanja
  }

  ugaoKa(cilj) {
    return Math.atan2(cilj.y - this.y, cilj.x - this.x)
  }

  /* KRETANJE */

  get brzina() {
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy)
  }

  set brzina(velicina) {
    this.dx = velicina * Math.cos(this.ugao)
    this.dy = velicina * Math.sin(this.ugao)
  }

  dodajSilu(velicina, ugao = this.ugao) {
    this.dx += velicina * Math.cos(ugao)
    this.dy += velicina * Math.sin(ugao)
  }

  trenje(faktorTrenja = 0.1) {
    const modifikator = 1 - faktorTrenja
    this.dx *= modifikator
    this.dy *= modifikator
  }

  pomeri(razmak) {
    this.x += razmak * Math.cos(this.ugao)
    this.y += razmak * Math.sin(this.ugao)
  }

  stani() {
    this.brzina = 0
  }

  /* STANJE */

  get mrtav() {
    return !this.ziv
  }

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

  umri() {
    this.stani()
    if (this.slikaMrtav) this.zameniSliku(this.slikaMrtav)
    this.ziv = false
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

  /* GRANICE */

  proveriGranice() {}

  kruzi(procenat = 1) {
    if (Math.random() > procenat) return
    if (izasaoLevoSkroz(this)) this.x = platno.width + this.sirina / 2
    if (izasaoDesnoSkroz(this)) this.x = 0
    if (izasaoDole(this)) this.y = 0
    if (izasaoGore(this)) this.y = platno.height
  }

  vracaVodoravno(procenat = 1) {
    if (izasaoLevoSkroz(this) && Math.random() < procenat) this.x = platno.width + this.sirina / 2
  }

  odbija() {
    if (izasaoGore(this) || izasaoDole(this))
      this.skreni(2 * Math.PI - this.ugao)
    if (izasaoLevo(this) || izasaoDesno(this))
      this.skreni(Math.PI - this.ugao)
    if (izasaoIgde(this))
      this.pomeri(5)
  }

  nestaje() {
    if (izasaoIgde(this)) this.nestani()
  }

  ogranici() {
    const marginaLevo = this.sirina / 4
    const marginaDesno = platno.width - marginaLevo
    if (this.x <= marginaLevo) this.x = marginaLevo
    if (this.x >= marginaDesno) this.x = marginaDesno
    this.ograniciVodoravno()
  }

  ograniciVodoravno() {
    const marginaGore = this.visina / 2
    const marginaDole = platno.height - marginaGore
    if (this.y <= marginaGore) this.y = marginaGore
    if (this.y >= marginaDole) this.y = marginaDole
  }

  /* PLAMEN */

  set zapaljiv(bul) {
    if (bul) import('./Plamen.js')
      .then(module => {
        this.plamen = new module.default()
      })
  }

  get zapaljiv() {
    return Boolean(this.plamen)
  }

  get zapaljen() {
    return this.zapaljiv && this.mrtav
  }

  /* DEBUG */

  log() {
    const x = this.x.toFixed()
    const y = this.y.toFixed()
    const sirina = this.sirina?.toFixed()
    const visina = this.visina?.toFixed()
    const dx = this.dx.toFixed()
    const dy = this.dy.toFixed()
    const brzina = this.brzina.toFixed()
    const ugao = this.ugao.toFixed(2)
    console.log(`${this.constructor.name} x: ${x}, y: ${y}, sirina: ${sirina}, visina: ${visina}, dx: ${dx}, dy: ${dy}, brzina: ${brzina}, ugao: ${ugao}, vidljiv: ${this.vidljiv}, ziv: ${this.ziv}`)
  }

  crtaOblik() {
    ctx.fillStyle = 'black'
    if (this.ishodiste === 'CENTAR')
      ctx.fillRect(-this.sirina / 2, -this.visina / 2, this.sirina, this.visina)
    else if (this.ishodiste === 'GORE_LEVO')
      ctx.fillRect(0, 0, this.sirina, this.visina)
    else if (this.ishodiste === 'DOLE_DESNO')
      ctx.fillRect(-this.sirina, -this.visina, this.sirina, this.visina)
  }

  /* LOOP */

  azurirajKretanje(dt) {
    if (!this.dx && !this.dy) return

    this.x += this.dx * dt
    this.y += this.dy * dt
  }

  azurirajPlamen() {
    if (!this.zapaljen) return

    this.plamen.x = this.x
    this.plamen.y = this.y
    this.plamen.update()
  }

  update(dt) {
    if (dt === undefined) console.error(this.constructor.name, 'ne prosleđuje delta time.', dt)

    this.azurirajKretanje(dt)
    this.proveriGranice()
    this.azurirajPlamen()
  }

  crtaSliku() {
    if (this.ishodiste === 'CENTAR')
      ctx.drawImage(this.slika, -this.sirina / 2, -this.visina / 2, this.sirina, this.visina)
    else if (this.ishodiste === 'GORE_LEVO')
      ctx.drawImage(this.slika, 0, 0, this.sirina, this.visina)
    else if (this.ishodiste === 'DOLE_DESNO')
      ctx.drawImage(this.slika, -this.sirina, -this.visina, this.sirina, this.visina)
  }

  render() {
    if (!this.vidljiv) return

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.ugao)
    ctx.scale(this.odrazY, this.odrazX)
    if (this.debug)
      this.crtaOblik()
    else
      this.crtaSliku()
    ctx.restore()

    if (this.zapaljen) this.plamen.render()
  }
}
