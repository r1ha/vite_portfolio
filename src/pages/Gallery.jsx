import React from 'react'
import { Link } from 'react-router-dom'

export default function Gallery(){
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 p-6">
            <div className="max-w-xl text-center">
                <h2 className="text-3xl font-bold">Gallery</h2>
                <p className="mt-4 text-sm text-muted-foreground">Work in progress...</p>
                <div className="mt-6">
                    <Link to="/" className="btn btn-secondary">Back</Link>
                </div>
            </div>
        </div>
    )
}
