import platno from '../io/platno.js'

export const izasaoDole = predmet => predmet.y > platno.height
export const izasaoDoleSkroz = predmet => predmet.y > platno.height + predmet.visina
export const izasaoGore = predmet => predmet.y < 0
export const izasaoDesno = predmet => predmet.x > platno.width
export const izasaoLevo = predmet => predmet.x < 0
export const izasaoLevoSkroz = predmet => predmet.x < -predmet.sirina / 2
export const izasaoDesnoSkroz = predmet => predmet.x > platno.width + predmet.sirina / 2
export const vanEkrana = predmet => izasaoLevo(predmet) || izasaoDesno(predmet) || izasaoGore(predmet) || izasaoDole(predmet)
