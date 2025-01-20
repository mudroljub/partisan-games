import { platno, ctx } from '../io/platno.js'
import { pitagora, randomInRange } from '../utils.js'
import { sudar } from '../utils/sudari.js'
import {
  izasaoDole, izasaoGore, izasaoDesno, izasaoLevo, izasaoLevoSkroz, izasaoDesnoSkroz, izasaoIgde, vanEkrana
} from '/game-engine/utils/granice.js'

export default class Predmet {
  #ugao = 0

  constructor(src, {
    sirina, visina, x = 200, y = 200, skalar = 1, brzina = 0, zapaljiv = false, ishodiste = 'CENTAR',
    odrazY = 1, odrazX = 1, scaleX = 1, scaleY = 1, senka
  } = {}) {
    this.x = x
    this.y = y
    this.sirina = sirina || 10
    this.visina = visina || 10
    if (src) this.ucitajSliku(src, sirina, visina, skalar)
    this.brzina = brzina
    this.zapaljiv = zapaljiv
    this.ishodiste = ishodiste
    this.odrazY = odrazY
    this.odrazX = odrazX
    this.scaleX = scaleX
    this.scaleY = scaleY
    this.senka = senka
    this.vidljiv = true
    this.ziv = true
    this.oznake = new Set()
    this.debug = false
    this.predmeti = []
  }

  ucitajSliku(src, sirina, visina, skalar) {
    this.slika = new Image()
    this.slika.onload = () => {
      this.dodeliVelicinu(sirina, visina, skalar)
      this.onload()
      this.slika.onload = null
    }
    this.slika.src = '/assets/slike/' + src
  }

  onload() {} // za naslednike

  zameniSliku(src) {
    this.slika.src = src
  }

  /* VELICINA */

  dodeliVelicinu = (sirina, visina, skalar) => {
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

  get polozaj() {
    return { x: this.x, y: this.y }
  }

  set polozaj(poz) {
    this.x = poz.x
    this.y = poz.y
  }

  tlo(y) {
    this.y = y - this.visina / 2
  }

  randomX(marginaX) {
    this.x = randomInRange(marginaX, platno.width - marginaX)
  }

  randomY(marginaY) {
    this.y = randomInRange(marginaY, platno.height - marginaY)
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

  get prikazan() {
    return this.vidljiv && !this.vanEkrana
  }

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

  get vanEkrana() {
    return vanEkrana(this)
  }

  proveriGranice() {}

  kruzi(procenat = 1) {
    if (Math.random() > procenat) return
    if (izasaoLevoSkroz(this)) this.x = platno.width + this.sirina / 2
    if (izasaoDesnoSkroz(this)) this.x = 0
    if (izasaoDole(this)) this.y = 0
    if (izasaoGore(this)) this.y = platno.height
  }

  vracaVodoravno(procenat = 1, callback) {
    if (izasaoLevoSkroz(this) && Math.random() <= procenat) {
      this.x = platno.width + this.sirina / 2
      if (callback) callback()
    }
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
    if (this.vanEkrana) this.nestani()
  }

  ogranici() {
    this.ograniciVodoravno()
    this.ograniciUspravno()
  }

  ograniciVodoravno() {
    const marginaLevo = this.sirina / 4
    const marginaDesno = platno.width - marginaLevo
    if (this.x <= marginaLevo) this.x = marginaLevo
    if (this.x >= marginaDesno) this.x = marginaDesno
  }

  ograniciUspravno() {
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

  log(name) {
    if (name && this.constructor.name !== name) return

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

  /* LOOP */

  azurirajKretanje(dt) {
    if (!this.dx && !this.dy) return

    this.x += this.dx * dt
    this.y += this.dy * dt
  }

  azurirajPlamen(dt) {
    if (!this.plamen) return

    this.plamen.x = this.x
    this.plamen.y = this.y

    this.plamen.update(dt)
  }

  update(dt) {
    if (dt === undefined) console.error(this.constructor.name, 'ne prosleđuje delta time.', dt)

    this.azurirajKretanje(dt)
    this.proveriGranice()
    this.azurirajPlamen(dt)
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

  crtaSliku() {
    if (this.ishodiste === 'CENTAR')
      ctx.drawImage(this.slika, -this.sirina / 2, -this.visina / 2, this.sirina, this.visina)
    else if (this.ishodiste === 'GORE_LEVO')
      ctx.drawImage(this.slika, 0, 0, this.sirina, this.visina)
    else if (this.ishodiste === 'DOLE_DESNO')
      ctx.drawImage(this.slika, -this.sirina, -this.visina, this.sirina, this.visina)
  }

  crtaSenku() {
    if (this.senka) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      ctx.shadowOffsetX = 10
      ctx.shadowOffsetY = 10
    } else {
      ctx.shadowColor = 'rgba(0, 0, 0, 0)'
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
    }
  }

  render() {
    if (!this.prikazan) return
    this.crtaSenku()

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.ugao)
    ctx.scale(this.odrazY, this.odrazX)
    ctx.scale(this.scaleX, this.scaleY)
    if (!this.slika || this.debug)
      this.crtaOblik()
    else
      this.crtaSliku()
    ctx.restore()

    if (this.zapaljen) this.plamen.render()
  }
}
