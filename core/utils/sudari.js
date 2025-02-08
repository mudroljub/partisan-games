/* POMOCNE FUNKCIJE */

const levo = predmet => predmet.x - predmet.sirina / 2

const desno = predmet => predmet.x + predmet.sirina / 2

const gore = predmet => predmet.y - predmet.visina / 2

const dole = predmet => predmet.y + predmet.visina / 2

/* SUDARNE FUNKCIJE */

export function sudar(kvadrat1, kvadrat2) {
  return (
    dole(kvadrat1) > gore(kvadrat2) &&
    gore(kvadrat1) < dole(kvadrat2) &&
    desno(kvadrat1) > levo(kvadrat2) &&
    levo(kvadrat1) < desno(kvadrat2)
  )
}

export function unutar(tacka, predmet) {
  return (
    tacka.x > levo(predmet) &&
    tacka.x < desno(predmet) &&
    tacka.y > gore(predmet) &&
    tacka.y < dole(predmet)
  )
}
