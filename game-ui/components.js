export const progresBar = energija => /* html*/`
  <div class="progress-wrapper">
    <progress value='${energija}' max='100'></progress>
    <div class="energija">${Math.round(energija)}</div>
  </div>
`

export const komande = () => /* html*/`
  <div>
    A - levo<br>
    D - desno<br>
    W - gore<br>
    S - dole<br>
    space - puca
  </div>
`
