import Scena2D from '/core/Scena2D.js'
import { platno } from '/core/io/platno.js'
import { scenes } from './scenes.js'
import { shuffle } from '/core3d/helpers.js'
import { slucajnePozicije } from '/core/utils.js'

// TODO: prave slike, prave veličine: sutjeska, padobranac...
const icons = [
  'buildings/crkva-01.png',
  'buildings/kuca-bunker.png',
  'buildings/kula-01.png',
  'armies/spitfire.png',
  'armies/cetnici/cetnik-03.png',
  'armies/figurica-brka.png',
  'armies/hummel.png',
  'armies/nemci/avioni/fieseler-fi-156-storch-03.png',
  'armies/nemci/avioni/focke-wulf-fw-190.png',
  'armies/nemci/avioni/fw-190f-8.png',
  'armies/nemci/avioni/junkers-ju-52.png',
  'armies/nemci/avioni/junkers-ju87b-stuka.png',
  'armies/nemci/avioni/junkers-ju87d-stuka-03.png',
  'armies/nemci/veza-02.png',
  'armies/nemci/vojnici/juris-01.png',
  'armies/nemci/vojnici/narednik-01.png',
  'armies/nemci/vojnici/oficir-05.png',
  'armies/panzer3.png',
  'armies/partizani/bolnicari/bolnicarka-02.png',
  'armies/partizani/lokomotiva-01.png',
  'armies/partizani/marshal-tito.png',
  'armies/partizani/tenkovi/tenk-04.png',
  'armies/partizani/vojnici/komesar-01.png',
  'armies/partizani/vojnici/komesar-02.png',
  'armies/partizani/vojnici/mp40-05.png',
  'armies/partizani/vojnici/partizan-01-sledja.png',
  'armies/partizani/vojnici/partizan-01.png',
  'armies/partizani/vojnici/partizan-02.png',
  'armies/partizani/vojnici/partizan-04.png',
  'armies/partizani/vojnici/partizan-05.png',
  'armies/partizani/vojnici/partizan-07.png',
  'armies/partizani/vojnici/partizan-08.png',
  'armies/partizani/vojnici/partizan-10.png',
  'armies/partizani/vojnici/partizan-11.png',
  'armies/partizani/vojnici/partizan-13.png',
  'armies/partizani/vojnici/partizan-14.png',
  'armies/partizani/vojnici/partizan-17.png',
  'armies/partizani/vojnici/partizan-18.png',
  'armies/partizani/vojnici/partizan-24.png',
  'armies/partizani/vojnici/partizan-25.png',
  'armies/partizani/vojnici/partizan-28.png',
  'armies/partizani/vojnici/partizan-30.png',
  'armies/partizani/vojnici/stoji-02.png',
  'armies/partizani/vozila/dzip-01.png',
  'armies/rusi/vojnici/bombas-01.png',
  'armies/rusi/vojnici/vojnik-08.png',
  'armies/rusi/vojnici/zastavnik-01.png',
  'armies/rusi/vojnici/zene/borkinja-02.png',
  'armies/rusi/vojnici/zene/borkinja-04.png',
]

shuffle(icons)
const pozicije = slucajnePozicije(Object.keys(scenes).length, 140)

const renderIcon = (key, data, i) => {
  const style = `"top: ${pozicije[i].y}px; left: ${pozicije[i].x}px;"`
  return /* html */`
    <button value='${key}' class='menu-btn js-start' style=${style}>
    <img src="/assets/images/${data.icon || icons[i]}" height="${data.height || 40}">
    <br>${data.name}
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
    const target = e.target.closest('button')
    if (target.classList.contains('js-start'))
      this.manager.start(target.value)
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