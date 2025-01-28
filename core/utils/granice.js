import platno from '../io/platno.js'

export const izasaoDole = predmet => predmet.y > platno.height
export const izasaoDoleSkroz = predmet => predmet.y > platno.height + predmet.visina / 2

export const izasaoGore = predmet => predmet.y < 0
export const izasaoGoreSkroz = predmet => predmet.y < -predmet.visina / 2

export const izasaoDesno = predmet => predmet.x > platno.width
export const izasaoDesnoSkroz = predmet => predmet.x > platno.width + predmet.sirina / 2

export const izasaoLevo = predmet => predmet.x < 0
export const izasaoLevoSkroz = predmet => predmet.x < -predmet.sirina / 2

export const izasaoIgde = predmet => izasaoLevo(predmet) || izasaoDesno(predmet) || izasaoGore(predmet) || izasaoDole(predmet)
export const vanEkrana = predmet => izasaoLevoSkroz(predmet) || izasaoDesnoSkroz(predmet) || izasaoGoreSkroz(predmet) || izasaoDoleSkroz(predmet)