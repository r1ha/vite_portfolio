import React from 'react'
import { Link } from 'react-router-dom'

export default function MobileHome(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl mb-6" style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}>Erwan Achat</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/blog" className="w-full inline-block px-6 py-4 rounded bg-neutral-800 text-white text-lg font-medium">Blog</Link>
          <Link to="/gallery" className="w-full inline-block px-6 py-4 rounded bg-neutral-800 text-white text-lg font-medium">Gallery</Link>
          <Link to="/about" className="w-full inline-block px-6 py-4 rounded bg-neutral-800 text-white text-lg font-medium">About</Link>
        </nav>

      </div>
    </div>
  )
}