/* POMOCNE FUNKCIJE */

const levo = predmet => {
  return predmet.x - predmet.sirina / 2
}

const desno = predmet => {
  return predmet.x + predmet.sirina / 2
}

const gore = predmet => {
  return predmet.y - predmet.visina / 2
}

const dole = predmet => {
  return predmet.y + predmet.visina / 2
}

/* SUDARNE FUNKCIJE */

export function sudar(kvadrat1, kvadrat2) {
  return (
    dole(kvadrat1) > gore(kvadrat2) &&
    gore(kvadrat1) < dole(kvadrat2) &&
    desno(kvadrat1) > levo(kvadrat2) &&
    levo(kvadrat1) < desno(kvadrat2)
  )
}

export function unutar(tacka, kvadrat) {
  return (
    tacka.x > levo(kvadrat) &&
    tacka.x < desno(kvadrat) &&
    tacka.y > gore(kvadrat) &&
    tacka.y < dole(kvadrat)
  )
}
