import GameObject from '/core3d/objects/GameObject.js'
import { loadModel } from '/core3d/loaders.js'

const mesh = await loadModel({ file: 'nature/dead-tree/model.glb', size: 5 })

export default class DeadTree extends GameObject {
  constructor(params = {}) {
    super({ mesh, color: 0x362419, ...params })
  }
}