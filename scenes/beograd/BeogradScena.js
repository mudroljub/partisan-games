import Scena3D from '/core/Scena3D.js'
import { createGraffitiCity } from '/core3d/city.js'
import { createSun } from '/core3d/light.js'
import { getEmptyCoords } from '/core3d/helpers.js'
import { ResistanceFighterPlayer } from '/core3d/actor/derived/ww2/ResistanceFighter.js'
import { thirdPersonControls } from '/ui/Controls.js'

const mapSize = 200

export default class BeogradScena extends Scena3D {
  constructor(manager) {
    super(manager, { controlKeys: thirdPersonControls })
  }

  init() {
    const coords = getEmptyCoords({ mapSize })

    this.dodajMesh(createSun({ pos: [50, 100, 50], intensity: 2 * Math.PI }))

    const city = createGraffitiCity({ scene: this.scene, mapSize, coords })
    this.dodajMesh(city)

    this.player = new ResistanceFighterPlayer({ camera: this.camera, solids: city, pos: coords.pop(), showHealthBar: false })
    this.dodaj(this.player)
  }
}
