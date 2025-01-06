export const progresBar = energija => /* html*/`
  <div class="progress-wrapper">
    <progress value='${energija}' max='100'></progress>
    <div class="energija">${energija}</div>
  </div>
`

