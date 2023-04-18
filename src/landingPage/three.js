import * as THREE from 'three'
import gsap from  'gsap'

import particleVertexShader from './shaders/particles/vertex.glsl'
import particleFragmentShader from './shaders/particles/fragment.glsl'

import overlayVertexShader from './shaders/overlay/vertex.glsl'
import overlayFragmentShader from './shaders/overlay/fragment.glsl'

import earthMapTexture from '../../public/earth/textures/8k_earth_nightmap.jpeg'


/**
 * Parameters
 */
const parameters = {
    particleSize: 16,
    particleCount: 950
}

/**
 * Base (part of the basic setup)
 */
// canvas
const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene()

/**
 * Overlay 
 */
//  Geometry
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)

// Material
const overlayMaterial = new THREE.ShaderMaterial({
    vertexShader: overlayVertexShader,
    fragmentShader: overlayFragmentShader,
    uniforms: {
        uAlpha:{ value: 1 }
    },
    transparent: true
})

// Mesh
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

/**
 * Loaders
 */
const loadingManger = new THREE.LoadingManager(
    // After it loaded
    () => {
        gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
    }
)

const textureLoader = new THREE.TextureLoader(loadingManger)
const EarthMapTexture = textureLoader.load(earthMapTexture)

/**
 * Earth
 */
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    new THREE.MeshBasicMaterial({
        map: EarthMapTexture
    })
)
earth.scale.set(10.5, 10.5, 10.5)
earth.position.set(0, -6, -1)
earth.rotation.x = 5.5
scene.add(earth)

/**
 * Particles
 */
// Geometry
const position = new Float32Array(parameters.particleCount * 3)

for (let i = 0; i < parameters.particleCount; i++) {
    position[i * 3 + 0] = (Math.random() - 0.5) * 50
    position[i * 3 + 1] = (Math.random() - 0.5) * 50
    position[i * 3 + 2] = (Math.random() - 0.5) * 50
}

const particleGeometry = new THREE.BufferGeometry()
particleGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3))

// Material
const particleMaterial = new THREE.ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    uniforms: {
        uSize:  { value: parameters.particleSize }
    },
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})

// Points
const points = new THREE.Points(particleGeometry, particleMaterial)
scene.add(points)

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4
scene.add(camera)

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */
let  scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', () => {
    scrollY = window.scrollY

    const newSection = Math.round(scrollY / sizes.height)
    
    if (newSection != currentSection) {
        currentSection = newSection
        if (currentSection === 1) {
            gsap.to(
            earth.rotation, {
                duration: 2,
                ease: 'power2.inOut',
                y: '+=2',
                z: '+=1'
                }
            )
            gsap.to(
                earth.position, {
                    duration: 2,
                    ease: 'power2.inOut',
                    x: '3',
                    y: '-1.5'
                }
            )
            gsap.to(
                earth.scale, {
                    duration: 2,
                    ease: 'power2.inOut',
                    x: '4',
                    y: '4',
                    z: '4'
                }
            )
        } else {
            gsap.to(
                earth.rotation, {
                    duration: 2,
                    ease: 'power2.inOut',
                    x: '+=2',
                    z: '+=1'
                }
            )
            gsap.to(
                earth.position, {
                    duration: 2,
                    ease: 'power2.inOut',
                    x: '0',
                    y: '-6'
                }
            )
            gsap.to(
                earth.scale, {
                    duration: 2,
                    ease: 'power2.inOut',
                    x: '10.5',
                    y: '10.5',
                    z: '10.5'
                }
            )
        }
    }
})

/**
 * Animate
 */

const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () => {

   const elapsedTime = clock.getElapsedTime()
   const deltaTime = elapsedTime - oldElapsedTime
   oldElapsedTime = elapsedTime

   // Rotate earth
   earth.rotation.x += deltaTime * 0.2
   earth.rotation.z += deltaTime * 0.2
   
   // Update camera
   camera.position.y = - scrollY / sizes.height
   
   // render
   renderer.render(scene, camera)

   // Call tick again on the next frame 
   window.requestAnimationFrame(tick)

}
tick()