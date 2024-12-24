import * as $ from '../konstante'

const tipke = {
  stisnute: new Array(256),
  ukupnoStisnutih: 0,

  reset: () => {
    tipke.stisnute.map(tipka => tipke.stisnute[tipka] = false)
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
  if (!tipke.stisnute[e.keyCode]) tipke.ukupnoStisnutih++
  tipke.stisnute[e.keyCode] = true
  neTresi(e)
})

document.addEventListener('keyup', e => {
  tipke.stisnute[e.keyCode] = false
  tipke.ukupnoStisnutih--
})

document.addEventListener('touchstart', e => odluciKomandu(e.touches[0]))
document.addEventListener('touchmove', e => odluciKomandu(e.touches[0]))
document.addEventListener('touchend', () => tipke.reset())

export default tipke
