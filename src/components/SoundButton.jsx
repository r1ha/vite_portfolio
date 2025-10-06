import React, { useEffect, useRef, useState } from 'react'

export default function SoundButton() {
  const [soundOn, setSoundOn] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = 0.75
    audioRef.current.loop = true
    audioRef.current.preload = 'auto'
    const p = audioRef.current.play()
    if (p && p.catch) {
      p.then(() => setSoundOn(true)).catch(() => setSoundOn(false))
    }
  }, [])

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

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setSoundOn(s => !s)}
        aria-label={soundOn ? 'Mute background sound' : 'Play background sound'}
        className="mt-2 p-2 rounded-full transition-colors duration-500 ease-out bg-neutral-700 hover:bg-neutral-800 text-white flex items-center justify-center"
        style={{ width: 40, height: 40 }}
      >
        {soundOn ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#fff" />
            <path d="M16.5 8.5a4.5 4.5 0 010 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#fff" />
            <path d="M23 9L15 17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 9l8 8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <audio ref={audioRef} src="./audio/birds.mp3" playsInline />
    </div>
  )
}
