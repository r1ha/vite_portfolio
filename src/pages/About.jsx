import React from 'react'
import { Link } from 'react-router-dom'

export default function About(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-xl text-center">
        <h2 className="text-3xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}>About</h2>
        <p className="mt-4 text-sm text-neutral-600">A short bio or description goes here.</p>
        <div className="mt-6">
          <Link to="/" className="px-4 py-2 rounded bg-neutral-800 text-white">Back</Link>
        </div>
      </div>
    </div>
  )
}
