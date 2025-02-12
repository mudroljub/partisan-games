import * as THREE from 'three'
import Scena3D from '/core/Scena3D.js'
import { createSun } from '/core3d/light.js'
import { createTerrain } from '/core3d/ground.js'
import { createFirTree } from '/core3d/geometry/trees.js'
import { createWarehouse, createWarehouse2, createWarRuin, createRuin, createAirport } from '/core3d/city.js'
import { loadModel } from '/core3d/loaders.js'
import GUI from '/core3d/io/GUI.js'
import Building from '/core3d/objects/Building.js'
import Tower from '/core3d/objects/Tower.js'

const { randInt, randFloatSpread } = THREE.MathUtils

const totalTime = 150
const mapSize = 800
const buildingInterval = 2000
const buildingDistance = mapSize * .4
const groundDistance = mapSize * .99

const controls = {
  '← or A': 'left',
  '→ or D': 'right',
  '↑ or W': 'up',
  '↓ or S': 'down',
  'Enter': 'attack',
}

const createBuilding = async time => {
  const minutes = Math.floor(time / 60)
  switch (randInt(1, 7 + minutes)) {
    case 1:
      const factory = await loadModel({ file: 'building/factory/model.fbx', size: 25 })
      return new Building({ mesh: factory, name: 'factory' })
    case 2: return new Building({ mesh: createAirport() })
    case 3: return new Building({ mesh: createWarRuin(), name: 'civil' })
    case 4: return new Building({ mesh: createRuin(), name: 'civil' })
    case 5: return new Building({ mesh: createWarehouse() })
    case 6: return new Building({ mesh: createWarehouse2() })
    default: return new Tower()
  }
}

export default class RatweekScena extends Scena3D {
  constructor(manager) {
    super(manager, {
      uvodniTekst: /* html */`
      <h2>Choose your aircraft</h2>
      <div class="game-screen-select">
        <input type="image" id="Biplane" src="/assets/images/airplanes/Biplane.png">
        <input type="image" id="Triplane" src="/assets/images/airplanes/Triplane.png">
        <input type="image" id="Messerschmitt" src="/assets/images/airplanes/Messerschmitt.png">
        <input type="image" id="Bomber" src="/assets/images/airplanes/Bomber.png">
      </div>
      `,
    })
  }

  init() {
    this.i = 0
    this.last = Date.now()
    this.warplane
    this.entities = []
    this.objects = []

    this.camera.position.set(0, 29, 0)
    this.scene.fog = new THREE.FogExp2(0xFFFFFF, 0.003)
    this.dodajMesh(createSun({ pos: [50, 200, 50], intensity: Math.PI * 2 }))

    const groundParams = { size: mapSize, color: 0x91A566, colorRange: .1, segments: 50, min: 0, max: 15 }
    this.ground = createTerrain(groundParams)
    this.ground2 = createTerrain(groundParams)
    this.ground2.position.z = -groundDistance
    this.dodajMesh(this.ground, this.ground2)

    this.gui = new GUI({ subtitle: 'Time left', total: totalTime, endText: 'Bravo! <br>You have completed the mission.', controls, useBlink: true, scoreClass: '' })
    this.startGame = this.startGame.bind(this)
    this.render()
  }

  addMesh(mesh, spread = .33) {
    mesh.position.copy({ x: randFloatSpread(mapSize * spread), y: 0, z: -buildingDistance })
    this.dodajMesh(mesh)
    this.objects.push(mesh)
  }

  async addBuilding(time) {
    const building = await createBuilding(time)
    this.entities.push(building)
    this.addMesh(building.mesh)
  }

  addTree = () => this.addMesh(createFirTree(), .4)

  spawnObjects(time) {
    if (this.i++ % 5 === 0) this.addTree()

    if (Date.now() - this.last >= buildingInterval) {
      this.addBuilding(time)
      this.last = Date.now()
    }
  }

  async startGame(e) {
    if (e.target.tagName != 'INPUT') return

    const obj = await import(`/core3d/aircraft/derived/${e.target.id}.js`)
    this.warplane = new obj.default({ camera: this.camera, limit: mapSize * .25 })
    this.scene.add(this.warplane.mesh)
    this.entities.push(this.warplane)

    this.gui.showMessage('Destroy enemy factories,<br><br>do not target civilian buildings')
    super.start()
  }

  handleClick(e) {
    super.handleClick(e)
    this.startGame(e)
  }

  /* UPDATES */

  moveGround = deltaSpeed => [this.ground, this.ground2].forEach(g => {
    g.translateZ(deltaSpeed)
    if (g.position.z >= mapSize * .75) g.position.z = -groundDistance
  })

  moveObjects = deltaSpeed => this.objects.forEach(mesh => {
    mesh.translateZ(deltaSpeed)
    if (mesh.position.z > this.camera.position.z + 200) {
      this.objects.splice(this.objects.indexOf(mesh), 1)
      this.scene.remove(mesh)
    }
  })

  updateEntities = delta => this.entities.forEach(object => {
    if (!object.scene) this.entities.splice(this.entities.indexOf(object), 1)
    if (object.hitAmount) {
      if (object.name == 'factory') this.gui.addScore(1)
      if (object.name == 'civil') {
        this.gui.showMessage('No! Destruction of civilian buildings is a war crime.')
        this.gui.addScore(-1)
      }
    }
    object.update(delta)
  })

  update(delta, time) {
    super.update(delta, time)
    if (!this.warplane) return

    const deltaSpeed = this.warplane.speed * delta

    this.moveGround(deltaSpeed)
    this.moveObjects(deltaSpeed)
    this.updateEntities(delta)

    if (this.warplane.dead)
      return setTimeout(() => this.zavrsi('You have failed.'), 2500)

    let timeLeft = totalTime - Math.floor(time)
    if (timeLeft <= 0) timeLeft = 0

    this.gui.addScore(0, timeLeft)

    if (time < totalTime - 10) this.spawnObjects(time)
    if (time >= totalTime) this.warplane.land(delta)
  }
}
