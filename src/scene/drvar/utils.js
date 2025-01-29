import * as THREE from 'three'

export function praviPanoramu() {
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load('/assets/slike/planine.png')
  texture.wrapS = THREE.RepeatWrapping
  texture.repeat.x = -1
  const geometry = new THREE.CylinderGeometry(500, 500, 300, 32, 1, true) // Cilindar bez gornje/donje strane
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
    alphaTest: .5,
    color: 0x000000,
  })
  const valjak = new THREE.Mesh(geometry, material)
  return valjak
}
