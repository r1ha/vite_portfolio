import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CurriculumVitae from './CurriculumVitae'

export default function MobileHome(){
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // close on click outside
  useEffect(() => {
    function onDoc(e){
      if (!ref.current) return
      if (!ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('touchstart', onDoc)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('touchstart', onDoc)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white p-6 gap-6">
      <div className="w-full max-w-sm text-center">

        <div className="flex justify-center">
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(v => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            >
              Menu
              <svg className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z" clipRule="evenodd" />
              </svg>
            </button>

            {/* dropdown list that appears under the toggle */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 mt-3 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden transition-all duration-200 ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95 pointer-events-none'}`}
              style={{ zIndex: 40 }}
              role="menu"
            >
              <Link to="/blog" className="block px-4 py-3 text-neutral-800 hover:bg-gray-50" role="menuitem" onClick={() => setOpen(false)}>Blog</Link>
              <Link to="/gallery" className="block px-4 py-3 text-neutral-800 hover:bg-gray-50" role="menuitem" onClick={() => setOpen(false)}>Gallery</Link>
            </div>
          </div>
        </div>
      </div>

      <CurriculumVitae />
    </div>
  )
}