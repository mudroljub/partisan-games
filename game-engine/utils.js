import { dijagonalaPlatna } from './io/platno.js'

export function uRadijane(ugao) {
  return ugao * Math.PI / 180
}

export function uStepene(uRadijane) {
  return uRadijane * 180 / Math.PI
}

export function pitagora(x1, x2, y1, y2) {
  const duzinaX = x1 - x2
  const duzinaY = y1 - y2
  return Math.sqrt((duzinaX * duzinaX) + (duzinaY * duzinaY))
}

export function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

export function nasumicnoOkruglo(min, max) {
  return Math.floor(randomRange(min, max + 1))
}

// vraca od 0 do 1 zavisno od razmaka dva predmeta, u odnosu na scenu
export function skaliranRazmak(predmet, predmet2) {
  const razmak = predmet.razmakDo(predmet2)
  return 1 - razmak / dijagonalaPlatna
}
