import GameObject from '/core3d/objects/GameObject.js'
import { loadModel } from '/core3d/loaders.js'

const mesh = await loadModel({ file: 'building/monument/knight/knight.fbx', size: 15, shouldAdjustHeight: true, shouldCenter: true })

export default class Monument extends GameObject {
  constructor(params = {}) {
    super({ mesh, ...params })
  }
}