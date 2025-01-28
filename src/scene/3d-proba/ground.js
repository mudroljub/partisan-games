import * as THREE from 'three'

const createTexture = ({ file, repeat = 1 } = {}) => {
  const texture = new THREE.TextureLoader().load(`/assets/textures/${file}`)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.magFilter = THREE.NearestFilter
  texture.repeat.set(repeat, repeat)
  return texture
}

/* GROUND */

export function createGroundMaterial({ color = 0x509f53, file, repeat } = {}) {
  const params = { side: THREE.FrontSide }
  const material = file
    ? new THREE.MeshBasicMaterial({
      ...params,
      map: createTexture({ file, repeat }),
    })
    : new THREE.MeshToonMaterial({ ...params, color })
  return material
}

export function crateGroundGeometry({ size, width = size, height = size, circle = true, segments = circle ? 32 : 1 }) {
  const geometry = circle
    ? new THREE.CircleGeometry(size, segments)
    : new THREE.PlaneGeometry(width, height, segments, segments)

  geometry.rotateX(-Math.PI * 0.5)
  return geometry
}

export function createGround({ size = 1000, color, circle, file, repeat = size / 8 } = {}) {
  const material = createGroundMaterial({ file, color, repeat })
  const geometry = crateGroundGeometry({ size, circle })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.receiveShadow = true
  return mesh
}

export function createFloor({ color = 0x808080, circle = false, ...rest } = {}) {
  return createGround({ color, circle, ...rest })
}
