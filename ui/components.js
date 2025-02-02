export const progresBar = (energija, tekst) => {
  const label = tekst || Math.round(energija)
  return /* html*/`
  <div class="progress-wrapper">
    <progress value='${energija}' max='100'></progress>
    <div class="energija">${label}</div>
  </div>
`
}

export const adws = () => /* html*/`
  A - levo<br>
  D - desno<br>
  W - gore<br>
  S - dole<br>
`

export const komande = () => /* html*/`
  <div class="tipke">
    ${adws()}
    space - pucanje
  </div>
`

export const komande2 = () => /* html*/`
  <div class="tipke">
    ← levo<br> 
    → desno<br> 
    ↑ gore<br> 
    ↓ dole<br> 
    enter - pucanje 
  </div>
`

export const topKomande = () => /* html*/`
  <div class="tipke">
    W - gore<br>
    S - dole<br>
    space - pucanje
  </div>
`
