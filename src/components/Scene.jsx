import { useFrame, useThree } from '@react-three/fiber'
import { Environment, useGLTF, Html } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const zoneRadius = 0.3

function isInZone1(x, y) {
    if (Math.sqrt((x-1)*(x-1) + (y+1)*(y+1)) < zoneRadius) return true
    else return false
}

function isInZone2(x, y) {
    if (Math.sqrt((x+1)*(x+1) + (y+1)*(y+1)) < zoneRadius) return true
    else return false
}

function isInZone3(x, y) {
    if (Math.sqrt(x*x + (y-1)*(y-1)) < zoneRadius) return true
    else return false
}

function useSmoothCamera(camera, mouse) {
  const sphericalRef = useRef({
    theta: Math.PI / 4,
    phi: Math.PI / 4
  })

  useFrame((state, delta) => {
    if (!camera) return

    // Rayon constant
    const radius = camera.position.length()

    // Cibles angulaires à partir de la souris
    const targetTheta = -mouse.x * Math.PI / 4 + Math.PI / 4
    const targetPhi = mouse.y * Math.PI / 4 + Math.PI / 4

    // Interpolation des angles (au lieu des positions)
    const lerpSpeed = 6
    const t = 1 - Math.exp(-lerpSpeed * delta)
    sphericalRef.current.theta += (targetTheta - sphericalRef.current.theta) * t
    sphericalRef.current.phi += (targetPhi - sphericalRef.current.phi) * t

    // Conversion sphérique → cartésien
    const { theta, phi } = sphericalRef.current
    const x = radius * Math.sin(theta) * Math.cos(phi)
    const y = radius * Math.sin(phi)
    const z = radius * Math.cos(theta) * Math.cos(phi)

    camera.position.set(x, y, z)
    camera.lookAt(0, 0, 0)
  })
}



export const Scene = ({ setLoading, mouse, sections, setSelection }) => {
  // use absolute paths so Vite serves files from public/
  const gltf = useGLTF('/models/scene.glb')
  const scene = gltf?.scene

  // Prepare GLTF meshes (shadows etc.)
  useEffect(() => {
    if (!scene) return
    setLoading(false)

    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene, setLoading])

  // Log camera coordinates when OrbitControls change the camera
  const { camera } = useThree()

  useSmoothCamera(camera, mouse)

  return(
    <>
      {/* Correcting default rotation of the scene */}
      {scene && (
        <>
          <primitive object={scene} rotation={[0, -Math.PI / 2, 0]} />

          <Html position={[0.2, 1, 1.5]} rotation={[0, Math.PI / 2, 0]} center transform occlude>
            <div className='text-black text-lg'
            style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}
            >
              {sections[0]}
            </div>
          </Html>

          <Html position={[-10, 5, 5]} rotation={[0, Math.PI / 2, 0]} center transform occlude>
            <div className='text-black text-5xl'
            style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}
            >
              {sections[0]}
            </div>
          </Html>

          <Html position={[1.5, 1, 0.2]} center transform occlude>
            <div className='text-black text-lg'
            style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}
            >
              {sections[1]}
            </div>
          </Html>

          <Html position={[5, 5, -10]} center transform occlude>
            <div className='text-black text-5xl'
            style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}
            >
              {sections[1]}
            </div>
          </Html>

          <Html position={[1.5, 0.2, 1.5]} rotation={[Math.PI/2, Math.PI, -3*Math.PI/4]} center transform occlude>
            <div className='text-black text-lg'
            style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}
            >
              {sections[2]}
            </div>
          </Html>

          <Html position={[5, -10, 5]} rotation={[Math.PI/2, Math.PI, -3*Math.PI/4]} center transform occlude>
            <div className='text-black text-5xl'
            style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}
            >
              {sections[2]}
            </div>
          </Html>
        </>

        
      )}

      <Environment files="/hdris/citrus_orchard_puresky_4k.hdr" />

      {/* Directional light & environment for basic realism */}
      <directionalLight
        castShadow
        intensity={3.5}
        color={0xfffcf2}
        position={[-5, 8, 10]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.000025}
      />

    </>
  )
}

