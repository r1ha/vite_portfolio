import { useFrame, useThree } from '@react-three/fiber'
import { Environment, useGLTF, Html } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const zoneRadius = 0.6
const confusionRadius = 0.3
const hoverDuration = 0.5 // seconds required to confirm selection

// Center 'confusion' zone
function isInCenterZone(x, y) {
    if (Math.sqrt(x*x + y*y) < confusionRadius) return true
    else return false
}

// Section 1: top left corner
function isInZone1(x, y) {
    if (Math.sqrt((x+1)*(x+1) + (y+1)*(y+1)) < zoneRadius) return true
    else return false
}

// Section 2: top right corner
function isInZone2(x, y) {
    if (Math.sqrt((x-1)*(x-1) + (y+1)*(y+1)) < zoneRadius) return true
    else return false
}

// Section 3: bottom center
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

export const Scene = ({ setLoading, mouse, sections, setSelection, setConfusion, setHoveredZone}) => {
  // use absolute paths so Vite serves files from public/
  const gltf = useGLTF('./models/scene.glb')
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

  useEffect(() => {

    if (!camera) return

    // Is there any confusion?

    if (isInCenterZone(mouse.x, mouse.y)){
      setConfusion(true)
    }
    else{
      setConfusion(false)
    }

    
  }, [mouse])

  // Hover detection + sustained-hover selection
  // zones: 1 -> index 0, 2 -> index 1, 3 -> index 2
  const hoverTimerRef = useRef(null)
  const currentHoverRef = useRef(null)

  function detectZone(x, y) {
    if (isInZone1(x, y)) return 0
    if (isInZone2(x, y)) return 1
    if (isInZone3(x, y)) return 2
    return null
  }

  // clear any pending selection timer
  function clearHoverTimer() {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }

  const [hoveredLocal, setHoveredLocal] = useState(null)

  // --- Icon proximity math -------------------------------------------------
  // Centers provided by user (normalized mouse coords):
  // Section 1: (1, 1)
  // Section 2: (-1, 1)
  // Section 3: (0, -1)
  const iconCenters = [ { x: -1, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 1 } ]

  // tuning parameters (feel free to tweak)
  const maxInfluence = 1 // distance (in normalized units) after which effect is fully faded
  const opacityPower = 3   // >1 => opacity rises quickly when approaching from far
  const blurPower = 2      // >1 => blur drops quickly when approaching
  const maxBlurPx = 6      // maximum blur in px when far

  function iconProximityStyle(index) {
    const mx = (mouse && typeof mouse.x === 'number') ? mouse.x : 0
    const my = (mouse && typeof mouse.y === 'number') ? mouse.y : 0
    const c = iconCenters[index]
    const dx = mx - c.x
    const dy = my - c.y
    const dist = Math.hypot(dx, dy)
    const dNorm = Math.min(1, dist / maxInfluence)

    // opacity: 1 at center, 0 when beyond maxInfluence
    // non-linear: use 1 - dNorm^opacityPower so it rises quickly when approaching from far
    const opacity = Math.max(0, Math.min(1, 1 - Math.pow(dNorm, opacityPower)))

    // blur: maxBlur when far (dNorm=1), 0 when center (dNorm=0)
    const blurPx = maxBlurPx * Math.pow(dNorm, blurPower)

    return {
      opacity,
      filter: `blur(${blurPx}px)`,
      WebkitFilter: `blur(${blurPx}px)`,
      transition: 'opacity 300ms cubic-bezier(.2,.9,.2,1), filter 300ms cubic-bezier(.2,.9,.2,1)'
    }
  }

  useEffect(() => {
    const zone = detectZone(mouse.x, mouse.y)

    // notify immediate hover change
    if (setHoveredZone) setHoveredZone(zone)
    setHoveredLocal(zone)

    // if zone changed, reset timer
    if (zone !== currentHoverRef.current) {
      clearHoverTimer()
      currentHoverRef.current = zone
    }

    // start timer if hovering a valid zone
    if (zone != null) {
      // start a timer to confirm selection after hoverDuration continuous
      hoverTimerRef.current = setTimeout(() => {
        // confirm selection: create selection array
        const sel = [false, false, false]
        sel[zone] = true
        if (setSelection) setSelection(sel)
      }, hoverDuration * 1000)
    } else {
      // left all zones: clear selection
      if (setSelection) setSelection([false, false, false])
    }

    return () => clearHoverTimer()
  }, [mouse.x, mouse.y, setSelection, setHoveredZone])

  return(
    <>
      {/* Correcting default rotation of the scene */}
      {scene && (
        <>
          <primitive object={scene} rotation={[0, -Math.PI / 2, 0]} />

          {/* Section 1 full text */}
          <Html position={[0.2, 1, 1.5]} rotation={[0, Math.PI / 2, 0]} center transform occlude>
            <div className={`text-lg transition duration-500 ease-out`}
              style={{
                fontFamily: '"Cormorant Garamond", serif, Georgia',
                fontWeight: 300,
                color: hoveredLocal === 0 ? '#ffffff' : '#111827',
                textShadow: hoveredLocal === 0 ? '0 0 10px rgba(255,255,255,0.85)' : 'none',
                transition: 'color 0.25s ease-out, text-shadow 0.5s ease-out'
              }}
            >
              {sections[0]}
            </div>
          </Html>

          {/* Section 1 icon */}
          <Html position={[-10, 5, 5]} rotation={[0, Math.PI / 2, 0]} center transform occlude>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="./icons/pen.svg"
                alt="pen"
                style={{
                  width: 64,
                  height: 64,
                  ...iconProximityStyle(0)
                }}
              />
            </div>
          </Html>

          {/* Section 2 full text */}
          <Html position={[1.5, 1, 0.2]} center transform occlude>
            <div className={`text-lg transition duration-500 ease-out`}
            style={{
              fontFamily: '"Cormorant Garamond", serif, Georgia',
              fontWeight: 300,
              color: hoveredLocal === 1 ? '#ffffff' : '#111827',
              textShadow: hoveredLocal === 1 ? '0 0 10px rgba(255,255,255,0.85)' : 'none',
              transition: 'color 0.25s ease-out, text-shadow 0.5s ease-out'
            }}
            >
              {sections[1]}
            </div>
          </Html>

          {/* Section 2 icon */}
          <Html position={[5, 5, -10]} center transform occlude>
            <div className='text-black text-5xl'
              style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, ...iconProximityStyle(1) }}
            >
              {sections[1][0]}
            </div>
          </Html>

          {/* Section 3 full text */}
          <Html position={[1.5, 0.2, 1.5]} rotation={[Math.PI/2, Math.PI, -3*Math.PI/4]} center transform occlude>
            <div className={`text-lg transition duration-500 ease-out`}
            style={{
              fontFamily: '"Cormorant Garamond", serif, Georgia',
              fontWeight: 300,
              color: hoveredLocal === 2 ? '#ffffff' : '#111827',
              textShadow: hoveredLocal === 2 ? '0 0 10px rgba(255,255,255,0.85)' : 'none',
              transition: 'color 0.25s ease-out, text-shadow 0.5s ease-out'
            }}
            >
              {sections[2]}
            </div>
          </Html>
          
          {/* Section 3 icon */}
          <Html position={[5, -10, 5]} rotation={[Math.PI/2, Math.PI, -3*Math.PI/4]} center transform occlude>
            <div className='text-black text-5xl'
              style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, ...iconProximityStyle(2) }}
            >
              me
            </div>
          </Html>
        </>

        
      )}

      <Environment files="./hdris/citrus_orchard_puresky_4k.hdr" />

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

