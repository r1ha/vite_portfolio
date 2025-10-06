import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import articlesData from '../data/articles.json'

export default function Blog(){
    const [articles] = useState(articlesData)
    const [category, setCategory] = useState('All')

    const filtered = category === 'All' ? articles : articles.filter(a => a.category === category)

    return (
        <div className="min-h-screen text-black bg-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Blog</h1>
                    <Link to="/" className="text-sm text-neutral-600">Retour</Link>
                </div>

                <div className="mb-4 flex gap-2">
                    <button className={`px-3 py-1 rounded ${category==='All' ? 'bg-neutral-800 text-white' : 'bg-gray-100'}`} onClick={() => setCategory('All')}>All</button>
                    <button className={`px-3 py-1 rounded ${category==='Statistics' ? 'bg-neutral-800 text-white' : 'bg-gray-100'}`} onClick={() => setCategory('Statistics')}>Statistics</button>
                    <button className={`px-3 py-1 rounded ${category==='Other' ? 'bg-neutral-800 text-white' : 'bg-gray-100'}`} onClick={() => setCategory('Other')}>Other</button>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6">
                    <div>
                        {filtered.length === 0 && <p className="text-sm text-neutral-500">No articles in this category.</p>}
                        {filtered.map(a => (
                            <article key={a.id} className="mb-4 p-6 bg-gray-50 shadow-sm border border-gray-100 rounded-lg">
                                <div className="text-xs text-neutral-500 mb-2">{a.category}</div>
                                <h4 className="font-semibold text-xl text-neutral-800">{a.title}</h4>
                                <p className="mt-3 text-sm text-neutral-700 whitespace-pre-line">{a.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
