import Scena2D from '/core/Scena2D.js'
import { platno } from '/core/io/platno.js'
import { scenes } from './scenes.js'
import { shuffle } from '/core3d/helpers.js'
import { slucajnePozicije } from '/core/utils.js'

// TODO: prave slike, prave veličine: ranjenik, padobranac...
const icons = [
  'buildings/crkva-01.png',
  'buildings/kuca-bunker.png',
  'buildings/kula-01.png',
  'buildings/ruina-03.png',
  'items/bodljikava-zica.gif',
  'slicice/avionce.gif',
  'slicice/camac.png',
  'slicice/cetnici/cetnik-03.png',
  'slicice/figurica-brka.png',
  'slicice/hummel.png',
  'slicice/nemci/artiljerija/top-01.png',
  'slicice/nemci/avioni/avion-03.png',
  'slicice/nemci/avioni/fieseler-fi-156-storch-03.png',
  'slicice/nemci/avioni/focke-wulf-fw-190.png',
  'slicice/nemci/avioni/fw-190f-8.png',
  'slicice/nemci/avioni/junkers-ju-52.png',
  'slicice/nemci/avioni/junkers-ju87b-stuka.png',
  'slicice/nemci/avioni/junkers-ju87d-stuka-03.png',
  'slicice/nemci/padobranci/padobranac-01.png',
  'slicice/nemci/veza-02.png',
  'slicice/nemci/vojnici/juris-01.png',
  'slicice/nemci/vojnici/narednik-01.png',
  'slicice/nemci/vojnici/oficir-05.png',
  'slicice/panzer3.png',
  'slicice/partizani/bolnicari/bolnicarka-02.png',
  'slicice/partizani/lokomotiva-01.png',
  'slicice/partizani/marshal-tito.png',
  'slicice/partizani/potez-25.png',
  'slicice/partizani/tenkovi/tenk-04.png',
  'slicice/partizani/vojnici/bombasi/partizan-bombas.gif',
  'slicice/partizani/vojnici/komesar-01.png',
  'slicice/partizani/vojnici/komesar-02.png',
  'slicice/partizani/vojnici/mp40-05.png',
  'slicice/partizani/vojnici/partizan-01-sledja.png',
  'slicice/partizani/vojnici/partizan-01.png',
  'slicice/partizani/vojnici/partizan-02.png',
  'slicice/partizani/vojnici/partizan-04.png',
  'slicice/partizani/vojnici/partizan-05.png',
  'slicice/partizani/vojnici/partizan-07.png',
  'slicice/partizani/vojnici/partizan-08.png',
  'slicice/partizani/vojnici/partizan-10.png',
  'slicice/partizani/vojnici/partizan-11.png',
  'slicice/partizani/vojnici/partizan-13.png',
  'slicice/partizani/vojnici/partizan-14.png',
  'slicice/partizani/vojnici/partizan-17.png',
  'slicice/partizani/vojnici/partizan-18.png',
  'slicice/partizani/vojnici/partizan-21.png',
  'slicice/partizani/vojnici/partizan-24.png',
  'slicice/partizani/vojnici/partizan-25.png',
  'slicice/partizani/vojnici/partizan-28.png',
  'slicice/partizani/vojnici/partizan-30.png',
  'slicice/partizani/vojnici/stoji-02.png',
  'slicice/partizani/vozila/dzip-01.png',
  'slicice/rusi/vojnici/bombas-01.png',
  'slicice/rusi/vojnici/bombas-04.png',
  'slicice/rusi/vojnici/vojnik-08.png',
  'slicice/rusi/vojnici/zastavnik-01.png',
  'slicice/rusi/vojnici/zene/borkinja-02.png',
  'slicice/rusi/vojnici/zene/borkinja-04.png',
  'slicice/spitfire.png',
]

shuffle(icons)
const pozicije = slucajnePozicije(Object.keys(scenes).length, 140)

const renderIcon = (key, value, i) => {
  const style = `"top: ${pozicije[i].y}px; left: ${pozicije[i].x}px;"`
  return /* html */`
    <button value='${key}' class='menu-btn js-start' style=${style}>
    ${value.name}<br>
      <img src="/assets/images/${icons[i]}" height="40">
    </button>
  `
}

const renderIcons = dict => Object.entries(dict)
  .filter(([key]) => key != 'MainMenu')
  .map(([key, value], i) => renderIcon(key, value, i))
  .join('')

export default class MainMenu extends Scena2D {
  constructor(manager) {
    super(manager, { showControls: false })
    this.manuIcons = renderIcons(scenes)
  }

  start() {
    super.start()
    platno.style.display = 'none'
  }

  handleClick(e) {
    if (e.target.classList.contains('js-start'))
      this.manager.start(e.target.value)
  }

  handleInput() {}

  handleVisibilityChange() {}

  sceneUI() {
    return `
      <h1>Partisan Games ★</h1>
      ${this.manuIcons}
    `
  }
}