import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import * as THREE from 'three'
import SoundButton from './SoundButton'
import CurriculumVitae from './CurriculumVitae'

function DesktopHome(){

    const [loading, setLoading] = useState(true)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const [visible, setVisible] = useState(false)
    const [langIndex, setLangIndex] = useState(0)
    const langs = ['Welcome', 'Bienvenue', 'Benvenuto', '你好']
    const transitionDuration = 3 // s
    const [soundOn, setSoundOn] = useState(true)
    const audioRef = useRef(null)
    const sceneRef = useRef(null)

    const sections = ["Blog", "Gallery", "About"]
    const [selection, setSelection] = useState([false, false, false])
    const [confusion, setConfusion] = useState(false)
    const [hoveredZone, setHoveredZone] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!selection || !Array.isArray(selection)) return
        const idx = selection.findIndex(Boolean)
        if (idx === -1) return
        // map index -> path
        const path = idx === 0 ? '/blog' : idx === 1 ? '/gallery' : '/'
        navigate(path)
        // reset selection after navigation
        setSelection([false, false, false])
    }, [selection, navigate])

    useEffect(() => {
        function onMove(e){
            const w = window.innerWidth
            const h = window.innerHeight
            const nx = (e.clientX / w) * 2 - 1 // -1..1
            const ny = (e.clientY / h) * 2 - 1 // invert Y so up is positive
            setMouse({ x: nx, y: ny })
        }

        function onTouch(e){
            if (!e.touches || e.touches.length === 0) return
            const t = e.touches[0]
            const w = window.innerWidth
            const h = window.innerHeight
            const nx = (t.clientX / w) * 2 - 1
            const ny = (t.clientY / h) * 2 - 1
            setMouse({ x: nx, y: ny })
        }

        function onTouchEnd(){
            // move pointer outside so hover leaves zones
            setMouse({ x: 10, y: 10 })
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('touchstart', onTouch)
        window.addEventListener('touchmove', onTouch)
        window.addEventListener('touchend', onTouchEnd)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('touchstart', onTouch)
            window.removeEventListener('touchmove', onTouch)
            window.removeEventListener('touchend', onTouchEnd)
        }
    }, [])

    // trigger welcome fade-in on mount
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 50)
        return () => clearTimeout(t)
    }, [])

    // alternate languages every 4s
    useEffect(() => {
        const interval = setInterval(() => {

            setVisible(false)

            setTimeout(() => {
            setLangIndex(i => (i + 1) % langs.length)
            setVisible(true)
            setTimeout(() => {}, 1000)
            }, transitionDuration * 1000) // switch text just before fade-in ends (slightly before to avoid blank time)

        }, 2*transitionDuration * 1000 + 1000)

        return () => clearInterval(interval)
    }, [])

    // try autoplay on mount; browsers may block, so we catch rejections
    useEffect(() => {
        if (!audioRef.current) return
        audioRef.current.volume = 0.25
        audioRef.current.loop = true
        audioRef.current.preload = 'auto'
        const p = audioRef.current.play()
        if (p && p.catch) {
            p.then(() => setSoundOn(true)).catch(() => setSoundOn(false))
        }
    }, [])

    // toggle play/pause while preserving currentTime and volume
    useEffect(() => {
        if (!audioRef.current) return
        audioRef.current.volume = audioRef.current.volume || 0.25
        if (soundOn) {
            const p = audioRef.current.play()
            if (p && p.catch) p.catch(() => {})
        } else {
            audioRef.current.pause()
        }
    }, [soundOn])

    
    return(

        <div className="relative z-10 flex flex-col items-center gap-200 p-4 m-4 overflow-hidden">

            <div className="flex flex-col items-center gap-5 z-10">

                <h1
                    className={`text-5xl text-neutral-800 transition-opacity ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300, transition: `opacity ${transitionDuration}s ease-in-out` }}
                >
                    {langs[langIndex]}
                </h1>
                <SoundButton />
                {/* navigation is automatic on confirmed selection; no visible button */}
                <h2 className={`text-sm text-neutral-800 transition-opacity duration-[3s] ease-in-out ${confusion ? 'opacity-100' : 'opacity-0'} italic`}>Move your mouse around to navigate and face one side to select</h2>

                <span className={`loading bg-neutral-800 loading-ring loading-xl ${loading ? 'block' : 'hidden'}`} aria-hidden="true"></span>

            </div>

            <div className={`fixed inset-0 -z-10 transition-opacity duration-[${transitionDuration}s] ease-in-out ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

                {/* Three.js Canvas as background */}
                <Canvas
                    className="w-full h-full"
                    shadows
                    dpr={window.devicePixelRatio}
                    gl={{
                    antialias: true,
                    outputColorSpace: THREE.SRGBColorSpace,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 0.5,
                    }}
                    camera={{ position: [20, 20, 20], fov: 25 }}
                >

                    <Scene
                        setLoading={setLoading}
                        mouse={mouse}
                        sections={sections} // example prop to show how to pass data to Scene component
                        setSelection={setSelection}
                        setConfusion={setConfusion}
                        setHoveredZone={setHoveredZone}
                        sceneRef={sceneRef}
                    />

                </Canvas>
            </div>

            <CurriculumVitae />


        </div>
    )
}

export default DesktopHome