import React from 'react'
import { Link } from 'react-router-dom'

export default function Gallery(){
    return (
        <div className="min-h-screen text-neutral-800 flex items-center justify-center p-6">
            <div className="max-w-xl text-center">
                <h2
                    className="text-5xl font-bold"
                    style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}
                >Gallery
                </h2>
                <p className="mt-4 text-sm text-muted-foreground">Work in progress...</p>
                <div className="mt-6">
                    <Link to="/" className="text-sm transition text-neutral-600 hover:text-black sm:ml-4">Back</Link>
                </div>
            </div>
        </div>
    )
}
