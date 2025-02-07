import * as THREE from 'three'
import Scena3D from '/core/Scena3D.js'
import PhysicsWorld from '/core3d/physics/PhysicsWorld.js'
import { createGround } from '/core3d/ground.js'
import { createMoonSphere, createTremplin, createCrates, createCrate, createRustyBarrel, createMetalBarrel } from '/core3d/geometry/index.js'
import { createSun } from '/core3d/light.js'
import { sample } from '/core3d/helpers.js'
import { createFirTree } from '/core3d/geometry/trees.js'
import { createWarehouse, createWarehouse2, createWarRuin, createRuin, createAirport } from '/core3d/city.js'
import { leaveTracks } from '/core3d/physics/leaveTracks.js'

const { randFloat } = THREE.MathUtils

export default class TenkScena extends Scena3D {
  constructor(manager) {
    super(manager, { toon: true })
  }

  async init() {
    this.i = 0
    this.time = 0

    this.scene.add(createSun({ intensity: Math.PI * 2 }))

    this.world = new PhysicsWorld({ scene: this.scene })

    this.ground = createGround({ color: 0x509f53 })
    this.world.add(this.ground, 0)

    /* OBJECTS */

    const tremplin = createTremplin()
    this.world.add(tremplin, 0)

    const crates = createCrates({ z: 10 })
    crates.forEach(mesh => this.world.add(mesh, 20))
    this.countableCrates = crates.filter(mesh => mesh.position.y > .5)

    for (let i = 0; i < 20; i++) {
      const mesh = createFirTree()
      mesh.position.set(randFloat(10, 50), 0, randFloat(-50, 50))
      this.world.add(mesh, 0)
    }

    const createObject = [createCrate, createRustyBarrel, createMetalBarrel, createMoonSphere]
    for (let i = 0; i < 30; i++) {
      const mesh = sample(createObject)({ translateHeight: false })
      mesh.position.set(randFloat(-10, -50), 0, randFloat(-30, 30))
      this.world.add(mesh, 10)
    }

    const createBuilding = [createRuin, createWarehouse, createWarehouse2, createWarRuin, createAirport]
    for (let i = -1; i < 5; i++)
      for (let j = 0; j < 3; j++) {
        const warehouse = sample(createBuilding)()
        warehouse.position.set(-i * 30, 0, j * 30 + 60)
        this.world.add(warehouse, 0)
      }

    const tankFile = await import('/core3d/physics/Tank.js')
    this.tank = new tankFile.default({ physicsWorld: this.world.physicsWorld, camera: this.camera, pos: { x: 0, y: 0, z: -20 } })
    this.scene.add(this.tank.mesh)

    const GUI = await import('/core3d/io/GUI.js')
    this.gui = new GUI.default({ scoreTitle: 'Crates left', points: this.countableCrates.length, subtitle: 'Time', total: 0, useBlink: true, controls: { Space: 'break' } })
    this.gui.showMessage('Demolish all crates')
  }

  update(dt) {
    super.update(dt)
    if (!this.tank) return

    const newTime = Math.floor(this.time + dt)

    this.tank.update(dt)
    if ((this.tank.input.left || this.tank.input.right) && this.tank.speed >= 30)
      leaveTracks({ vehicle: this.tank, ground: this.ground, scene: this.scene })

    this.world.update(dt)

    if (Math.floor(this.time) != newTime)
      this.gui.addScore(0, newTime)

    if (this.i++ % 3 === 0)
      this.countableCrates.forEach(mesh => {
        if (mesh.position.y <= 0.5) {
          this.countableCrates.splice(this.countableCrates.findIndex(c => c === mesh), 1)
          this.gui.addScore(-1, newTime)
        }
      })

    if (this.countableCrates.length)
      this.time += dt
    else
      this.gui.renderText(`Bravo!<br>You demolished everything in ${newTime} seconds.`)
  }
}
