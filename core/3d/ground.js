import * as THREE from 'three'

const createTexture = ({ file, repeat = 1 } = {}) => {
  const texture = new THREE.TextureLoader().load(`/assets/textures/${file}`)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.magFilter = THREE.NearestFilter
  texture.repeat.set(repeat, repeat)
  return texture
}

export function crateGroundGeometry({ size, width = size, height = size, circle = true, segments = circle ? 32 : 1 }) {
  const geometry = circle
    ? new THREE.CircleGeometry(size, segments)
    : new THREE.PlaneGeometry(width, height, segments, segments)

  geometry.rotateX(-Math.PI * 0.5)
  return geometry
}

export function createGround({ size = 1000, color = 0x006600, circle, file, repeat = size / 8 } = {}) {
  const material = new THREE.MeshBasicMaterial({ color })
  if (file) material.map = createTexture({ file, repeat })
  const geometry = crateGroundGeometry({ size, circle })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.receiveShadow = true
  return mesh
}

export function createFloor({ color = 0x808080, circle = false, ...rest } = {}) {
  return createGround({ color, circle, ...rest })
}
