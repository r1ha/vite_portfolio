import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Scene } from '../components/Scene'
import * as THREE from 'three'
import SoundButton from '../components/SoundButton'

function Home(){

    const [loading, setLoading] = useState(true)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const [visible, setVisible] = useState(false)
    const [langIndex, setLangIndex] = useState(0)
    const langs = ['Welcome', 'Bienvenue', 'Benvenuto', '你好']
    const transitionDuration = 3 // s
    const [soundOn, setSoundOn] = useState(true)
    const audioRef = useRef(null)

    const sections = ["Blog", "Gallery", "About"]
    const [selection, setSelection] = useState([false, false, false])


    useEffect(() => {
        function onMove(e){
            const w = window.innerWidth
            const h = window.innerHeight
            const nx = (e.clientX / w) * 2 - 1 // -1..1
            const ny = (e.clientY / h) * 2 - 1 // invert Y so up is positive
            setMouse({ x: nx, y: ny })
        }

        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
        
    }, [mouse])

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

        <div className="relative flex flex-col items-center w-full h-screen gap-4 p-4 m-4 overflow-hidden">

            <div className="flex flex-col items-center gap-4 z-10">

                <h1
                    className={`text-5xl text-neutral-800 transition-opacity duration-[${transitionDuration}s] ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}
                >
                    {langs[langIndex]}
                </h1>
                <SoundButton />

                <span className={`loading bg-neutral-800 loading-ring loading-xl ${loading ? 'block' : 'hidden'}`} aria-hidden="true"></span>
            </div>

            <div className={`absolute inset-0 z-0 transition-opacity duration-[${transitionDuration}s] ease-in-out ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

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
                    >

                    </Scene>

                </Canvas>
            </div>

        </div>
    )
}

export default Home