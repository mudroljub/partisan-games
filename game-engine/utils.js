import { platno, dijagonalaPlatna } from './io/platno.js'

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

export function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

export function nasumicnoOkruglo(min, max) {
  return Math.floor(randomInRange(min, max + 1))
}

// vraca od 0 do 1 zavisno od razmaka dva predmeta, u odnosu na scenu
export function skaliranRazmak(predmet, predmet2) {
  const razmak = predmet.razmakDo(predmet2)
  return 1 - razmak / dijagonalaPlatna
}

export function slucajnePozicije(n, velicinaPolja) {
  const rows = Math.floor(platno.height / velicinaPolja)
  const cols = Math.floor(platno.width / velicinaPolja)
  const allPositions = []

  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      allPositions.push([i, j])

  // Fisher-Yates shuffle for better randomness
  for (let i = allPositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]]
  }

  return allPositions
    .slice(0, n)
    .map(([i, j]) => ({
      y: velicinaPolja * i + velicinaPolja / 2,
      x: velicinaPolja * j + velicinaPolja / 2
    }))
}

const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

export function nadjiNajdaljeTacke(pozicije) {
  let maxDistance = 0
  let najdaljeTacke = []

  for (let i = 0; i < pozicije.length; i++)
    for (let j = i + 1; j < pozicije.length; j++) {
      const dist = distance(pozicije[i], pozicije[j])
      if (dist > maxDistance) {
        maxDistance = dist
        najdaljeTacke = [pozicije[i], pozicije[j]]
      }
    }

  return najdaljeTacke.sort((a, b) => a.x - b.x)
}
