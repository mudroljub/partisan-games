import * as THREE from 'three'

export function pointLight({ scene, color = 0xffffff, intensity = Math.PI, mapSize = 512, pos = [0, 30, 30] } = {}) {
  const light = new THREE.PointLight(color, intensity)
  light.position.set(...pos)
  light.castShadow = true
  light.shadow.mapSize.width = light.shadow.mapSize.height = mapSize
  if (scene) scene.add(light)
  return light
}

export function createSun({ scene, color = 0xffffff, intensity = Math.PI * 1.5, target, pos = [15, 50, 50], mapSize = 1024, r = 1, transparent = false, planetColor = 0xFCE570, addLight = true, file } = {}) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(r),
    new THREE.MeshToonMaterial({
      color: planetColor,
      transparent,
      opacity: transparent ? 0 : 1,
      map: file ? new THREE.TextureLoader().load(`/assets/textures/${file}`) : null
    })
  )
  if (addLight) {
    const light = pointLight({ scene, color, intensity, target, mapSize })
    const ambientLight = new THREE.AmbientLight(0xfffee1, intensity * .75)
    mesh.add(light, ambientLight)
  }
  mesh.position.set(...pos)
  return mesh
}

export const createMoon = ({
  pos = [50, 100, 50], color = 0xFFF8DE, planetColor = 0xF6F1D5, r = 4, ...rest
} = {}) => createSun({ pos, color, planetColor, r, ...rest })
