export const progresBar = energija => /* html*/`
  <div class="progress-wrapper">
    <progress value='${energija}' max='100'></progress>
    <div class="energija">${Math.round(energija)}</div>
  </div>
`

export const komande = () => /* html*/`
  <div class="tipke">
    A - levo<br>
    D - desno<br>
    W - gore<br>
    S - dole<br>
    space - puca
  </div>
`

export const komande2 = () => /* html*/`
  <div class="tipke">
    ← levo<br> 
    → desno<br> 
    ↑ gore<br> 
    ↓ dole<br> 
    enter - puca 
  </div>
`

export const topKomande = () => /* html*/`
  <div class="tipke">
    W - gore<br>
    S - dole<br>
    space - puca
  </div>
`
