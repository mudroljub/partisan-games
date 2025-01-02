export const platno = document.getElementById('platno')
export const ctx = platno.getContext('2d')

platno.width = window.innerWidth
platno.height = window.innerHeight
platno.focus()

export const dijagonalaPlatna = Math.sqrt(platno.height * platno.height + platno.width * platno.width)

export function crtaNebo(nivoTla, bojaNeba = 'blue', bojaNebaPreliv = 'lightblue', pocetakPreliva = 0) {
  ctx.fillStyle = bojaNeba
  if (bojaNebaPreliv) {
    const preliv = ctx.createLinearGradient(0, pocetakPreliva, 0, nivoTla)
    preliv.addColorStop(0, bojaNeba)
    preliv.addColorStop(1, bojaNebaPreliv)
    ctx.fillStyle = preliv
  }
  ctx.fillRect(0, 0, platno.width, nivoTla)
}

function crtaZemlju(nivoTla, bojaZemlje = '#00b011') {
  ctx.fillStyle = bojaZemlje
  ctx.fillRect(0, nivoTla, platno.width, platno.height)
}

function crtaLiniju(nivoTla) {
  ctx.beginPath()
  ctx.moveTo(0, nivoTla)
  ctx.lineTo(platno.width, nivoTla)
  ctx.stroke()
}

export function crtaNeboZemlju(nivoTla,
  { bojaNeba = '#3299CC', bojaZemlje = '#32cd32', bojaNebaPreliv = 'lightblue', linija = false } = {}
) {
  crtaNebo(nivoTla, bojaNeba, bojaNebaPreliv)
  if (linija) crtaLiniju(nivoTla)
  crtaZemlju(nivoTla, bojaZemlje)
}

export default platno
