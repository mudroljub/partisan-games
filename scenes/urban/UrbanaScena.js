import Scena3D from '/core/Scena3D.js'
import { createGraffitiCity } from '/core3d/city.js'
import { createSun } from '/core3d/light.js'
import { getEmptyCoords } from '/core3d/helpers.js'

export default class UrbanaScena extends Scena3D {
  async init() {
    const mapSize = 200
    const coords = getEmptyCoords({ mapSize })

    this.camera.position.set(0, mapSize * .33, mapSize * .9)
    this.camera.lookAt(this.scene.position)

    this.scene.add(createSun({ pos: [50, 100, 50], intensity: 2 * Math.PI }))

    const city = createGraffitiCity({ scene: this.scene, mapSize, coords })
    this.scene.add(city)

    const { ResistanceFighterPlayer } = await import('/core3d/actor/derived/ww2/ResistanceFighter.js')
    this.player = new ResistanceFighterPlayer({ camera: this.camera, solids: city, pos: coords.pop(), showHealthBar: false })
    this.scene.add(this.player.mesh)
  }

  update(delta, time) {
    super.update(delta, time)
    this.player?.update(delta)
  }
}
