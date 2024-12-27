export const platno = document.getElementById('platno')
export const podloga = platno.getContext('2d')

platno.height = window.innerHeight || 600 // mora prvo visina
platno.width = document.body.clientWidth || 800
platno.style.backgroundColor = 'lightgray'
platno.focus()

export const dijagonalaPlatna = Math.sqrt(platno.height * platno.height + platno.width * platno.width)

export function crtaNebo(nivoTla, bojaNeba = 'blue', bojaNebaPreliv = 'lightblue', pocetakPreliva = 0) {
    podloga.fillStyle = bojaNeba
    if (bojaNebaPreliv) {
        const preliv = podloga.createLinearGradient(0, pocetakPreliva, 0, nivoTla)
        preliv.addColorStop(0, bojaNeba)
        preliv.addColorStop(1, bojaNebaPreliv)
        podloga.fillStyle = preliv
    }
    podloga.fillRect(0, 0, platno.width, nivoTla)
}

function crtaZemlju(nivoTla, bojaZemlje = '#00b011') {
    podloga.fillStyle = bojaZemlje
    podloga.fillRect(0, nivoTla, platno.width, platno.height)
}

export function crtaNeboZemlju(nivoTla, bojaNeba = 'lightblue', bojaZemlje = 'green', bojaNebaPreliv = 'blue') {
    crtaNebo(nivoTla, bojaNeba, bojaNebaPreliv)
    crtaZemlju(nivoTla, bojaZemlje)
}

export default platno
