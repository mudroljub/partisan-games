import Scena3D from '/core/Scena3D.js'
import { createGround } from '/core3d/ground.js'
import { sample } from '/core3d/helpers.js'
import { hemLight, lightningStrike } from '/core3d/light.js'
import FPSPlayer from '/core3d/actor/FPSPlayer.js'
import Maze from '/core3d/mazes/Maze.js'
import { truePrims } from '/core3d/mazes/algorithms.js'
import { GermanMachineGunnerAI } from '/core3d/actor/derived/ww2/GermanMachineGunner.js'
import { SSSoldierAI } from '/core3d/actor/derived/ww2/SSSoldier.js'
import { NaziOfficerAI } from '/core3d/actor/derived/ww2/NaziOfficer.js'
import { GermanFlameThrowerAI } from '/core3d/actor/derived/ww2/GermanFlameThrower.js'
import FirstAid from '/core3d/objects/FirstAid.js'
import { fpsControls } from '/ui/Controls.js'

export default class SavoScena extends Scena3D {
  constructor(manager) {
    super(manager, {
      toon: true,
      usePointerLock: true,
      controlKeys: fpsControls,
      intro: '<ul><li>Find the way out</li><li>Bonus: Kill all enemies</li></ul>',
      reportText: 'After a successful sabotage mission you stayed behind enemy lines.\n\nFind the way out of the enemy base.',
      blinkingMessage: 'Find a way out!',
    })
  }

  init() {
    this.light = hemLight({ intensity: Math.PI * 1.5, scene: this.scene })
    this.addMesh(createGround({ file: 'terrain/ground.jpg' }))

    this.maze = new Maze(8, 8, truePrims, 5)
    const walls = this.maze.toTiledMesh({ texture: 'terrain/concrete.jpg' })
    this.addMesh(walls)

    const player = this.player = new FPSPlayer({ camera: this.camera, solids: walls })
    player.putInMaze(this.maze)
    this.add(player)

    const coords = this.maze.getEmptyCoords(true)
    this.enemies = []
    const soldiers = [GermanMachineGunnerAI, SSSoldierAI, NaziOfficerAI, GermanFlameThrowerAI]
    for (let i = 0; i < 10; i++) {
      const EnemyClass = sample(soldiers)
      const enemy = new EnemyClass({ pos: coords.pop(), target: player.mesh, solids: walls })
      this.enemies.push(enemy)
      this.add(enemy)
    }

    for (let i = 0; i < 2; i++) {
      const firstAid = new FirstAid({ pos: coords.pop() })
      this.addMesh(firstAid.mesh)
    }
  }

  end() {
    super.end()
    this.player.end()
  }

  sceneUI() {
    const killed = this.enemies.filter(enemy => enemy.energy <= 0)
    const left = this.enemies.length - killed.length
    return /* html */`
      <div class="top-left ">
        <p>
          Score: ${killed.length}<br>
          <small>Enemy left: ${left}</small>
        </p>
      </div>
    `
  }

  update(dt, t) {
    super.update(dt, t)

    const killed = this.enemies.filter(enemy => enemy.energy <= 0)
    const won = this.player.position.distanceTo(this.maze.exitPosition) < 5

    if (won)
      this.finish(`Bravo!<br>You found a way out<br> and kill ${killed.length} of ${this.enemies.length} enemies`)

    if (this.player.dead)
      this.finish('You are dead.')

    if (Math.random() > .998) lightningStrike(this.light, this.scene)
  }
}
