import { platno } from '../io/platno.js'
import { kamera } from './Kamera.js'
import { ishodista, naciniPrikaza } from '../konstante.js'
import * as THREE from 'three'

const poravnajNiz = niz => niz.flatMap(predmet =>
  [predmet, ...(predmet.predmeti ? poravnajNiz(predmet.predmeti) : [])]
)

class Renderer2D {
  constructor() {
    if (Renderer2D.instance) return Renderer2D.instance
    Renderer2D.instance = this

    this.ctx = platno.getContext('2d')
    this.ctx.scale(devicePixelRatio, devicePixelRatio)
    this.kameraX = this.kameraY = 0 // TODO: integriši sa kamerom

    window.addEventListener('resize', () => {
      this.ctx.scale(devicePixelRatio, devicePixelRatio)
    })
  }

  cisti({ pozadina, bojaPozadine } = {}) {
    if (pozadina)
      pozadina.render()
    else if (bojaPozadine) {
      this.ctx.fillStyle = bojaPozadine
      this.ctx.fillRect(0, 0, platno.width, platno.height)
    } else
      this.ctx.clearRect(0, 0, platno.width, platno.height)
  }

  crtaOblik(predmet) {
    this.ctx.fillStyle = 'black'
    if (predmet.ishodiste === ishodista.centar)
      this.ctx.fillRect(-predmet.sirina / 2, -predmet.visina / 2, predmet.sirina, predmet.visina)
    else if (predmet.ishodiste === ishodista.goreLevo)
      this.ctx.fillRect(0, 0, predmet.sirina, predmet.visina)
    else if (predmet.ishodiste === ishodista.doleDesno)
      this.ctx.fillRect(-predmet.sirina, -predmet.visina, predmet.sirina, predmet.visina)
  }

  crtaSliku(predmet) {
    if (predmet.ishodiste === ishodista.centar)
      this.ctx.drawImage(predmet.slika, -predmet.sirina / 2, -predmet.visina / 2, predmet.sirina, predmet.visina)
    else if (predmet.ishodiste === ishodista.goreLevo)
      this.ctx.drawImage(predmet.slika, 0, 0, predmet.sirina, predmet.visina)
    else if (predmet.ishodiste === ishodista.doleDesno)
      this.ctx.drawImage(predmet.slika, -predmet.sirina, -predmet.visina, predmet.sirina, predmet.visina)
  }

  crtaProjekciju(predmet) {
    const { slika, sirina, visina, rotirano } = predmet
    const projekcija = kamera.projektuj(rotirano)
    const skaliranaSirina = sirina * projekcija.z
    const skaliranaVisina = visina * projekcija.z
    if (this.vanPrikaza(rotirano.z, projekcija.x, projekcija.y, skaliranaSirina, skaliranaVisina)) return

    this.ctx.drawImage(slika, projekcija.x, projekcija.y, skaliranaSirina, skaliranaVisina)
  }

  dodajSenku(predmet) {
    if (predmet.senka) {
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
      this.ctx.shadowOffsetX = 10
      this.ctx.shadowOffsetY = 10
    } else {
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0)'
      this.ctx.shadowOffsetX = 0
      this.ctx.shadowOffsetY = 0
    }
  }

  vanPrikaza(z, x, y, sirina, visina) {
    return z <= kamera.z || x < 0 || y < 0 || x >= platno.width - sirina || y >= platno.height - visina
  }

  crtaPredmet(predmet) {
    if (!predmet.prikazan) return
    this.dodajSenku(predmet)

    this.ctx.save()
    this.ctx.translate(predmet.x, predmet.y)
    this.ctx.rotate(predmet.ugao)
    this.ctx.scale(predmet.odrazY, predmet.odrazX)
    this.ctx.scale(predmet.scaleX, predmet.scaleY)

    if (!predmet.slika || predmet.nacinPrikaza === naciniPrikaza.oblik)
      this.crtaOblik(predmet)
    else if (predmet.nacinPrikaza === naciniPrikaza.projekcija)
      this.crtaProjekciju(predmet)
    else
      this.crtaSliku(predmet)

    this.ctx.restore()
    if (predmet.zapaljen) predmet.plamen.render()
  }

  crtaPredmete(predmeti) {
    this.ctx.save()
    this.ctx.translate(-this.kameraX, -this.kameraY)

    poravnajNiz(predmeti)
      .sort((a, b) => a.nacinPrikaza === naciniPrikaza.projekcija
        ? b.rotirano.z - a.rotirano.z
        : b.polozaj?.z - a.polozaj?.z
      )
      .forEach(predmet => predmet.render())

    this.ctx.fillStyle = 'rgba(112, 66, 20, 0.1)'
    this.ctx.fillRect(0, 0, platno.width, platno.height)

    this.ctx.restore()
  }
}

const noviRenderer3D = () => {
  const renderer = new THREE.WebGLRenderer({ canvas: platno })
  renderer.setSize(window.innerWidth, window.innerHeight)
  return renderer
}

export const praviRenderer = type => type === '3d'
  ? noviRenderer3D()
  : new Renderer2D()