import * as $ from '../konstante.js'

const tipke = {
  stisnute: new Array(256),

  ukupnoStisnutih: () => tipke.stisnute.filter(t => t).length,

  reset: () => {
    tipke.stisnute.forEach(tipka => tipke.stisnute[tipka] = false)
  }
}

/* FUNCTIONS */

const neTresi = e => {
  if (e.keyCode === $.RAZMAK || e.keyCode === $.GORE || e.keyCode === $.DOLE) e.preventDefault()
}

const odluciKomandu = dodir => {
  if (dodir.pageY < window.innerHeight / 2) tipke.stisnute[$.GORE] = true
  if (dodir.pageY >= window.innerHeight / 2) tipke.stisnute[$.DOLE] = true
  if (dodir.pageX < window.innerWidth / 2) tipke.stisnute[$.LEVO] = true
  if (dodir.pageX >= window.innerWidth / 2) tipke.stisnute[$.DESNO] = true
}

/* EVENTS */

document.addEventListener('keydown', e => {
  tipke.stisnute[e.keyCode] = true
  neTresi(e)
})

document.addEventListener('keyup', e => {
  tipke.stisnute[e.keyCode] = false
})

document.addEventListener('touchstart', e => odluciKomandu(e.touches[0]))
document.addEventListener('touchmove', e => odluciKomandu(e.touches[0]))
document.addEventListener('touchend', () => tipke.reset())

export default tipke
